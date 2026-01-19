// Google Apps Script Code.gs
// This script handles form submissions from the Phixels website
// Updated to fix folder duplication and organize files professionally

function doPost(e) {
  try {
    const params = e.parameter;
    const formType = params.formType || 'master';

    Logger.log('Received form submission: ' + formType);

    switch (formType) {
      case 'master':
        return handleMasterForm(params);
      case 'contact':
      case 'contactMessages':
        return handleContactForm(params);
      case 'newsletter':
        return handleNewsletterForm(params);
      case 'job':
      case 'JobApplications':
        return handleJobForm(params);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Unknown form type' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Server error: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleMasterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 

    const {
      fullName,
      email,
      phone,
      country,
      budget,
      description,
      filesData, // JSON string from frontend
      file, // Single file fallback
      requestId,
      isFinal,
      meetingDate,
      meetingTime
    } = params;

    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; 
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('ProjectsRequest') || spreadsheet.insertSheet('ProjectsRequest');

    // Headers Setup
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp', 'Request ID', 'Full Name', 'Email', 'Phone', 'Country', 'Budget',
        'Description', 'Folder URL', 'Is Final', 'Meeting Date', 'Meeting Time'
      ]]);
    }

    const timestamp = new Date();
    
    // --- STEP 1: Check if Row Exists (Update Logic) ---
    let rowIndex = -1;
    let existingFolderUrl = '';
    
    // Search for existing Request ID
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) { 
      if (data[i][1] === requestId) { 
        rowIndex = i + 1; 
        existingFolderUrl = data[i][8]; // Get existing folder URL from Column I (Index 8)
        break;
      }
    }

    // --- STEP 2: Folder & File Logic ---
    let finalFolderUrl = '';
    const parentFolderId = '1PTm46lpYDgbZTFMKaFc94XMtqFwKJFAM'; // Main Projects Folder

    if (rowIndex > 0) {
      // *** CASE: UPDATE (Step 4) ***
      // Do NOT create a new folder. Use the existing one.
      // Usually, we don't need to upload files again in Step 4 as they are sent in Step 1.
      finalFolderUrl = existingFolderUrl;
      
    } else {
      // *** CASE: NEW ENTRY (Step 1) ***
      // Create Unique Folder Name: "Name - Email - Date - (RequestID)"
      // This prevents overwriting if the same client comes back months later.
      const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd");
      const folderName = `${fullName} - ${email} - ${formattedDate} (${requestId})`;
      
      const parentFolder = DriveApp.getFolderById(parentFolderId);
      const newFolder = parentFolder.createFolder(folderName);
      newFolder.setDescription(`Project Request ID: ${requestId}`);
      
      finalFolderUrl = newFolder.getUrl();
      
      // Upload Files (Multiple or Single) INTO this new folder
      try {
        // Priority 1: Multiple Files via JSON
        if (filesData && filesData !== '[]') {
          const parsedFiles = JSON.parse(filesData);
          if (parsedFiles.length > 0) {
            parsedFiles.forEach(fileData => {
              uploadBase64ToFolder(newFolder, fileData.data, fileData.name, fileData.type);
            });
          }
        } 
        // Priority 2: Single File Fallback
        else if (file && file !== '') {
          // Determine generic name or use logic to get extension
          // Since single 'file' param often lacks name metadata in simple posts, 
          // we use a timestamped name.
          uploadBase64ToFolder(newFolder, file, `${fullName}_File`, 'auto');
        }
      } catch (e) {
        Logger.log('File upload error: ' + e.toString());
      }
    }

    // --- STEP 3: Save to Sheet ---
    if (rowIndex > 0) {
      // Update Existing Row (Step 4)
      // We keep the original Folder URL (finalFolderUrl), don't overwrite with empty
      sheet.getRange(rowIndex, 1, 1, 12).setValues([[
        timestamp,
        requestId,
        fullName,
        email,
        phone,
        country,
        budget,
        description,
        finalFolderUrl, // Keep existing URL
        isFinal,
        meetingDate || '',
        meetingTime || ''
      ]]);
    } else {
      // Append New Row (Step 1)
      sheet.appendRow([
        timestamp,
        requestId,
        fullName,
        email,
        phone,
        country,
        budget,
        description,
        finalFolderUrl, // New Folder URL
        isFinal,
        meetingDate || '',
        meetingTime || ''
      ]);
    }

    // --- STEP 4: Emails & Notifications ---
    if (isFinal === 'true') {
      sendFinalConfirmationEmail(email, fullName, meetingDate, meetingTime);
      sendAdminNotification(email, fullName, phone, country, budget, description, finalFolderUrl, meetingDate, meetingTime);
    } else {
      sendInitialConfirmationEmail(email, fullName);
      sendInitialAdminNotification(email, fullName, phone, country, budget, description, finalFolderUrl);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Master form processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// --- HELPER: Uploads file directly to a specific folder object ---
function uploadBase64ToFolder(folder, base64Data, fileName, mimeTypeParam) {
  try {
    const base64 = base64Data.replace(/^data:[^;]+;base64,/, '');
    const decodedData = Utilities.base64Decode(base64);
    
    let mimeType = mimeTypeParam;
    if (mimeType === 'auto' || !mimeType) {
       const match = base64Data.match(/^data:([^;]+)/);
       mimeType = match ? match[1] : 'application/octet-stream';
    }

    // Determine extension if filename doesn't have it
    let finalFileName = fileName;
    if (finalFileName.indexOf('.') === -1) {
       let ext = 'bin';
       if (mimeType.includes('pdf')) ext = 'pdf';
       else if (mimeType.includes('image/jpeg')) ext = 'jpg';
       else if (mimeType.includes('image/png')) ext = 'png';
       else if (mimeType.includes('word')) ext = 'docx';
       finalFileName = `${fileName}.${ext}`;
    }

    folder.createFile(Utilities.newBlob(decodedData, mimeType, finalFileName));
  } catch (e) {
    Logger.log("Error in uploadBase64ToFolder: " + e.toString());
  }
}

// ----------------------------------------------------------------
//  UNCHANGED FUNCTIONS (Contact, Newsletter, Job, Emails)
// ----------------------------------------------------------------

function handleContactForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 

    const { name, email, phone, message, country } = params;

    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; 
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('ContactMessages') || spreadsheet.insertSheet('ContactMessages');

    const expectedHeaders = ['Timestamp', 'Name', 'Email', 'Phone', 'Country', 'Message'];
    const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
    if (!expectedHeaders.every((h, i) => currentHeaders[i] === h)) {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    }

    sheet.appendRow([new Date(), name, email, phone, country, message]);

    sendContactConfirmationEmail(email, name);
    sendContactAdminNotification(name, email, phone, country, message);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleNewsletterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 

    const { email } = params;

    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; 
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('Newsletter') || spreadsheet.insertSheet('Newsletter');

    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, 2).setValues([['Timestamp', 'Email']]);

    const data = sheet.getDataRange().getValues();
    if (data.some(row => row[1] === email)) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Email already subscribed' })).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([new Date(), email]);
    sendNewsletterConfirmationEmail(email);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleJobForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 

    const { name, email, portfolio, jobTitle, file } = params;

    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; 
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('JobApplications') || spreadsheet.insertSheet('JobApplications');

    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, 6).setValues([['Timestamp', 'Name', 'Email', 'Portfolio', 'Job Title', 'Resume URL']]);

    let resumeUrl = '';
    if (file && file !== '') {
      try {
        const jobResumesFolderId = '14biiXgOQeppz4JNdTn4bt7BOx_pNe95Q'; 
        // Using old upload helper logic here just for Job form to keep it simple as requested
        const folder = DriveApp.getFolderById(jobResumesFolderId);
        const base64 = file.replace(/^data:[^;]+;base64,/, '');
        const decoded = Utilities.base64Decode(base64);
        const fileName = `${name}_${jobTitle}_${new Date().getTime()}.pdf`; // Defaulting to pdf/auto for jobs
        const fileObj = folder.createFile(Utilities.newBlob(decoded, 'application/pdf', fileName));
        resumeUrl = fileObj.getUrl();
      } catch (e) {
        Logger.log('Job file upload error: ' + e);
      }
    }

    sheet.appendRow([new Date(), name, email, portfolio, jobTitle, resumeUrl]);
    sendJobConfirmationEmail(email, name, jobTitle);
    sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// --- EMAILS (Kept exactly as requested) ---

function sendInitialConfirmationEmail(email, fullName) {
  MailApp.sendEmail({
    to: email,
    subject: 'Thank you for your interest in Phixels!',
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Welcome to Phixels!</h1>
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out to us. We've received your initial information and are excited to learn more about your project.</p>
      <p>Our team will review your details and get back to you within 24 hours to discuss your requirements and schedule a consultation.</p>
      <p>In the meantime, feel free to explore our portfolio and case studies on our website.</p>
      <p>Best regards,<br>The Phixels Team</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
        <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
        <p style="margin: 5px 0;">WhatsApp: +880 1723 289090</p>
        <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
      </div>
    </div>`
  });
}

function sendFinalConfirmationEmail(email, fullName, meetingDate, meetingTime) {
  MailApp.sendEmail({
    to: email,
    subject: 'Your Phixels Consultation is Confirmed!',
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Consultation Confirmed!</h1>
      <p>Dear ${fullName},</p>
      <p>Great news! Your consultation with our team has been scheduled.</p>
      <div style="background-color: #ED1F24; color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">Meeting Details:</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${meetingDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${meetingTime}</p>
        <p style="margin: 5px 0;"><strong>Platform:</strong> Google Meet (link will be sent 15 minutes before)</p>
      </div>
      <p>Please prepare any additional details about your project that you'd like to discuss. We're looking forward to speaking with you!</p>
      <p>Best regards,<br>The Phixels Team</p>
    </div>`
  });
}

function sendAdminNotification(email, fullName, phone, country, budget, description, fileUrl, meetingDate, meetingTime) {
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com',
    subject: `New Project Inquiry: ${fullName}`,
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">New Project Inquiry</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Client Details:</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${fileUrl ? `<p><strong>Files:</strong> <a href="${fileUrl}">Open Client Folder</a></p>` : ''}
      </div>
      <div style="background-color: #ED1F24; color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">Scheduled Meeting:</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${meetingDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${meetingTime}</p>
      </div>
      <p>Please prepare for the consultation and review the client's requirements.</p>
    </div>`
  });
}

function sendInitialAdminNotification(email, fullName, phone, country, budget, description, fileUrl) {
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com',
    subject: `New Project Inquiry Started: ${fullName}`,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">New Project Inquiry - Step 1 Completed</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Client Details:</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Description:</strong> ${description}</p>
          ${fileUrl ? `<p><strong>Files:</strong> <a href="${fileUrl}">Open Client Folder</a></p>` : ''}
        </div>
        <div style="background-color: #FFF3CD; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #FFEAA7;">
          <p style="margin: 0;"><strong>Status:</strong> Client has completed initial form. Waiting for meeting booking (Step 2).</p>
        </div>
      </div>`
  });
}

function sendContactConfirmationEmail(email, name) {
  MailApp.sendEmail({
    to: email,
    subject: 'Thank you for contacting Phixels!',
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">Thank You for Reaching Out!</h1>
        <p>Dear ${name},</p>
        <p>We've received your message and appreciate you taking the time to contact us.</p>
        <p>Our team will review your inquiry and get back to you within 24 hours.</p>
        <p>Best regards,<br>The Phixels Team</p>
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
          <p style="margin: 5px 0;">WhatsApp: +880 1723 289090</p>
          <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
        </div>
      </div>`
  });
}

function sendContactAdminNotification(name, email, phone, country, message) {
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com',
    subject: `New Contact Form Submission: ${name}`,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">New Contact Form Submission</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      </div>`
  });
}

function sendNewsletterConfirmationEmail(email) {
  MailApp.sendEmail({
    to: email,
    subject: 'Welcome to Phixels Newsletter!',
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Welcome to Our Newsletter!</h1>
      <p>Thank you for subscribing to Phixels newsletter.</p>
      <p>Best regards,<br>The Phixels Team</p>
    </div>`
  });
}

function sendJobConfirmationEmail(email, name, jobTitle) {
  MailApp.sendEmail({
    to: email,
    subject: `Thank you for applying to ${jobTitle} at Phixels!`,
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Application Received!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the ${jobTitle} position at Phixels.</p>
      <p>We have received your application and resume.</p>
      <p>Best regards,<br>The Phixels Recruitment Team</p>
    </div>`
  });
}

function sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl) {
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com',
    subject: `New Job Application: ${jobTitle} - ${name}`,
    htmlBody: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">New Job Application</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Applicant Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Position:</strong> ${jobTitle}</p>
        ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>` : ''}
      </div>
    </div>`
  });
}