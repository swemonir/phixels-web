// Google Apps Script Code.gs
// Updated: Logo Link Added & Header Background set to BLACK

// =================================================================
// 🚨 YOUR LOGO LINK
// =================================================================
const LOGO_URL = "https://i.postimg.cc/MHvpxP6z/phixels-logo.png"; 


function doPost(e) {
  try {
    const params = e.parameter;
    const formType = params.formType || 'master';

    // Logger.log('Received form submission: ' + formType); // Uncomment for debugging

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
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unknown form type' })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Server error: ' + error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// -------------------------------------------------------------------------
// EMAIL TEMPLATE ENGINE (Black Header + Logo)
// -------------------------------------------------------------------------
function getEmailTemplate(title, content) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
      
      /* BLACK HEADER STYLE */
      .header { 
        background-color: #000000; /* Black Background */
        padding: 35px 20px; 
        text-align: center; 
        border-bottom: 3px solid #ED1F24; 
      }
      .logo-img { 
        max-width: 180px; 
        height: auto; 
        display: block; 
        margin: 0 auto; 
        border: 0; 
        outline: none; 
        text-decoration: none;
      }
      
      .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
      .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
      .btn { display: inline-block; padding: 12px 28px; background-color: #ED1F24; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 15px; }
      .info-box { background-color: #f8f9fa; border-left: 4px solid #ED1F24; padding: 15px; margin: 20px 0; border-radius: 4px; }
      
      .table-data { width: 100%; border-collapse: collapse; margin-top: 15px; }
      .table-data td { padding: 12px 10px; border-bottom: 1px solid #eeeeee; vertical-align: top; font-size: 14px; }
      .table-data td.label { font-weight: bold; width: 30%; color: #555; background-color: #fafafa; }
    </style>
  </head>
  <body>
    <div class="container">
      
      <!-- LOGO SECTION (Black BG) -->
      <div class="header">
        <img src="${LOGO_URL}" alt="PHIXELS" class="logo-img">
      </div>
      
      <div class="content">
        <h2 style="color: #000; margin-top: 0; text-align: center; font-size: 22px;">${title}</h2>
        ${content}
      </div>

      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Phixels. All rights reserved.</p>
        <p style="margin:5px 0;">Questions? Contact us at phixels.io@gmail.com</p>
        <p style="margin:5px 0;">WhatsApp: +880 1723 289090</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// -------------------------------------------------------------------------
// FORM HANDLING LOGIC
// -------------------------------------------------------------------------

function handleMasterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 

    const { fullName, email, phone, country, budget, description, filesData, file, requestId, isFinal, meetingDate, meetingTime } = params;
    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; 
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('ProjectsRequest') || spreadsheet.insertSheet('ProjectsRequest');

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([['Timestamp', 'Request ID', 'Full Name', 'Email', 'Phone', 'Country', 'Budget', 'Description', 'Folder URL', 'Is Final', 'Meeting Date', 'Meeting Time']]);
    }

    const timestamp = new Date();
    
    // Check if Request ID exists
    let rowIndex = -1;
    let existingFolderUrl = '';
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) { 
      if (data[i][1] === requestId) { 
        rowIndex = i + 1; 
        existingFolderUrl = data[i][8];
        break;
      }
    }

    // Folder Logic
    let finalFolderUrl = '';
    const parentFolderId = '1PTm46lpYDgbZTFMKaFc94XMtqFwKJFAM'; 

    if (rowIndex > 0) {
      // Step 4: Use existing folder
      finalFolderUrl = existingFolderUrl;
    } else {
      // Step 1: Create New Folder
      const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd");
      const folderName = `${fullName} - ${email} - ${formattedDate} (${requestId})`;
      const parentFolder = DriveApp.getFolderById(parentFolderId);
      const newFolder = parentFolder.createFolder(folderName);
      newFolder.setDescription(`Project Request ID: ${requestId}`);
      finalFolderUrl = newFolder.getUrl();
      
      try {
        if (filesData && filesData !== '[]') {
          const parsedFiles = JSON.parse(filesData);
          if (parsedFiles.length > 0) {
            parsedFiles.forEach(f => uploadBase64ToFolder(newFolder, f.data, f.name, f.type));
          }
        } else if (file && file !== '') {
          uploadBase64ToFolder(newFolder, file, `${fullName}_File`, 'auto');
        }
      } catch (e) { Logger.log('File upload error: ' + e.toString()); }
    }

    // Save/Update Sheet
    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, 12).setValues([[timestamp, requestId, fullName, email, phone, country, budget, description, finalFolderUrl, isFinal, meetingDate || '', meetingTime || '']]);
    } else {
      sheet.appendRow([timestamp, requestId, fullName, email, phone, country, budget, description, finalFolderUrl, isFinal, meetingDate || '', meetingTime || '']);
    }

    // Trigger Emails
    if (isFinal === 'true') {
      sendFinalConfirmationEmail(email, fullName, meetingDate, meetingTime);
      sendAdminNotification(email, fullName, phone, country, budget, description, finalFolderUrl, meetingDate, meetingTime, true);
    } else {
      sendInitialConfirmationEmail(email, fullName);
      sendAdminNotification(email, fullName, phone, country, budget, description, finalFolderUrl, null, null, false);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Processed' })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function uploadBase64ToFolder(folder, base64Data, fileName, mimeTypeParam) {
  try {
    const base64 = base64Data.replace(/^data:[^;]+;base64,/, '');
    const decodedData = Utilities.base64Decode(base64);
    let mimeType = mimeTypeParam;
    if (mimeType === 'auto' || !mimeType) {
       const match = base64Data.match(/^data:([^;]+)/);
       mimeType = match ? match[1] : 'application/octet-stream';
    }
    let finalFileName = fileName;
    if (finalFileName.indexOf('.') === -1) {
       let ext = 'bin';
       if (mimeType.includes('pdf')) ext = 'pdf';
       else if (mimeType.includes('image')) ext = 'png';
       else if (mimeType.includes('word')) ext = 'docx';
       finalFileName = `${fileName}.${ext}`;
    }
    folder.createFile(Utilities.newBlob(decodedData, mimeType, finalFileName));
  } catch (e) { Logger.log("Upload error: " + e.toString()); }
}

function handleContactForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 
    const { name, email, phone, message, country } = params;
    const spreadsheet = SpreadsheetApp.openById('1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ');
    const sheet = spreadsheet.getSheetByName('ContactMessages') || spreadsheet.insertSheet('ContactMessages');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Country', 'Message']);
    sheet.appendRow([new Date(), name, email, phone, country, message]);
    
    sendContactConfirmationEmail(email, name);
    sendContactAdminNotification(name, email, phone, country, message);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function handleNewsletterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 
    const { email } = params;
    const spreadsheet = SpreadsheetApp.openById('1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ');
    const sheet = spreadsheet.getSheetByName('Newsletter') || spreadsheet.insertSheet('Newsletter');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Email']);
    const data = sheet.getDataRange().getValues();
    if (data.some(row => row[1] === email)) return ContentService.createTextOutput(JSON.stringify({ success: false })).setMimeType(ContentService.MimeType.JSON);
    sheet.appendRow([new Date(), email]);
    sendNewsletterConfirmationEmail(email);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function handleJobForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); 
    const { name, email, portfolio, jobTitle, file } = params;
    const spreadsheet = SpreadsheetApp.openById('1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ');
    const sheet = spreadsheet.getSheetByName('JobApplications') || spreadsheet.insertSheet('JobApplications');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Name', 'Email', 'Portfolio', 'Job Title', 'Resume URL']);
    
    let resumeUrl = '';
    if (file && file !== '') {
      try {
        const folder = DriveApp.getFolderById('14biiXgOQeppz4JNdTn4bt7BOx_pNe95Q');
        const base64 = file.replace(/^data:[^;]+;base64,/, '');
        const decoded = Utilities.base64Decode(base64);
        resumeUrl = folder.createFile(Utilities.newBlob(decoded, 'application/pdf', `${name}_Resume_${Date.now()}.pdf`)).getUrl();
      } catch (e) { Logger.log('Job upload error: ' + e); }
    }
    sheet.appendRow([new Date(), name, email, portfolio, jobTitle, resumeUrl]);
    sendJobConfirmationEmail(email, name, jobTitle);
    sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

// ---------------- EMAIL HELPERS ----------------

function sendInitialConfirmationEmail(email, fullName) {
  const content = `
    <p>Dear ${fullName},</p>
    <p>Thank you for starting your project request with Phixels. We have successfully received your initial details and files.</p>
    <div class="info-box">
      <strong>Next Step:</strong> Please complete the scheduling process on our website to book your consultation call.
    </div>
    <p>If you have already booked a slot, please ignore this message and wait for the confirmation email.</p>
  `;
  MailApp.sendEmail({ to: email, subject: 'Project Request Received - Phixels', htmlBody: getEmailTemplate('Request Received', content) });
}

function sendFinalConfirmationEmail(email, fullName, date, time) {
  const content = `
    <p>Dear ${fullName},</p>
    <p>Great news! Your consultation with our team has been officially confirmed.</p>
    <div class="info-box" style="background-color: #FFF0F0; border-color: #ED1F24;">
      <h3 style="margin-top:0; color: #ED1F24;">Meeting Details</h3>
      <table style="width:100%">
        <tr><td><strong>Date:</strong></td><td>${date}</td></tr>
        <tr><td><strong>Time:</strong></td><td>${time}</td></tr>
        <tr><td><strong>Platform:</strong></td><td>Google Meet</td></tr>
      </table>
    </div>
    <p>A Google Meet link will be sent to your email 15 minutes before the scheduled time.</p>
  `;
  MailApp.sendEmail({ to: email, subject: 'Booking Confirmed! - Phixels', htmlBody: getEmailTemplate('Meeting Confirmed', content) });
}

function sendContactConfirmationEmail(email, name) {
  const content = `
    <p>Dear ${name},</p>
    <p>Thank you for getting in touch. We have received your message.</p>
    <p>Our team is reviewing your inquiry and will respond within 24 hours.</p>
    <div style="text-align:center;"><a href="https://phixels.io" class="btn">Visit Website</a></div>
  `;
  MailApp.sendEmail({ to: email, subject: 'We Received Your Message - Phixels', htmlBody: getEmailTemplate('Thank You', content) });
}

function sendNewsletterConfirmationEmail(email) {
  const content = `<p>You have successfully subscribed to the Phixels Newsletter.</p><p>Expect industry insights delivered straight to your inbox.</p>`;
  MailApp.sendEmail({ to: email, subject: 'Welcome to Phixels!', htmlBody: getEmailTemplate('Subscription Confirmed', content) });
}

function sendJobConfirmationEmail(email, name, jobTitle) {
  const content = `<p>Dear ${name},</p><p>We have received your application for the <strong>${jobTitle}</strong> position. Our HR team will review it shortly.</p>`;
  MailApp.sendEmail({ to: email, subject: 'Application Received - Phixels', htmlBody: getEmailTemplate('Application Received', content) });
}

function sendAdminNotification(email, fullName, phone, country, budget, desc, folderUrl, date, time, isFinal) {
  const statusTitle = isFinal ? "New Confirmed Booking" : "New Incomplete Lead (Step 1)";
  const subjectPrefix = isFinal ? "[ACTION REQUIRED]" : "[LEAD]";
  let meetingHtml = isFinal ? `<div style="margin-top:20px; border-top:1px dashed #ccc; padding-top:10px;"><h3 style="color:#ED1F24;">📅 Meeting Schedule</h3><p><strong>Date:</strong> ${date}<br><strong>Time:</strong> ${time}</p></div>` : `<p style="color:orange; font-style:italic; border: 1px solid orange; padding: 10px;">* Client has not booked a time yet (Step 2 pending).</p>`;

  const content = `
    <table class="table-data">
      <tr><td class="label">Client Name:</td><td>${fullName}</td></tr>
      <tr><td class="label">Email:</td><td>${email}</td></tr>
      <tr><td class="label">Phone:</td><td>${phone}</td></tr>
      <tr><td class="label">Country:</td><td>${country}</td></tr>
      <tr><td class="label">Budget:</td><td>${budget}</td></tr>
      <tr><td class="label">Description:</td><td>${desc}</td></tr>
    </table>
    ${meetingHtml}
    <div style="text-align: center; margin-top: 30px;"><a href="${folderUrl}" class="btn" style="background-color: #000;">📂 Open Client Folder</a></div>
  `;
  MailApp.sendEmail({ to: 'phixels.io@gmail.com', subject: `${subjectPrefix} ${fullName} - ${statusTitle}`, htmlBody: getEmailTemplate(statusTitle, content) });
}

function sendContactAdminNotification(name, email, phone, country, message) {
  const content = `<table class="table-data"><tr><td class="label">Name:</td><td>${name}</td></tr><tr><td class="label">Email:</td><td>${email}</td></tr><tr><td class="label">Phone:</td><td>${phone}</td></tr><tr><td class="label">Country:</td><td>${country}</td></tr><tr><td class="label">Message:</td><td>${message}</td></tr></table>`;
  MailApp.sendEmail({ to: 'phixels.io@gmail.com', subject: `New Contact: ${name}`, htmlBody: getEmailTemplate('New Contact Message', content) });
}

function sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl) {
  const content = `<table class="table-data"><tr><td class="label">Position:</td><td>${jobTitle}</td></tr><tr><td class="label">Name:</td><td>${name}</td></tr><tr><td class="label">Email:</td><td>${email}</td></tr><tr><td class="label">Portfolio:</td><td>${portfolio}</td></tr></table><div style="text-align: center; margin-top: 20px;"><a href="${resumeUrl}" class="btn">View Resume</a></div>`;
  MailApp.sendEmail({ to: 'phixels.io@gmail.com', subject: `Job Application: ${jobTitle} - ${name}`, htmlBody: getEmailTemplate('New Job Application', content) });
}