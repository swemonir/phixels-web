import { useParams } from 'react-router-dom';
import { Calendar, User, Clock, Share2 } from 'lucide-react';
export function BlogDetailPage() {
  const {
    slug
  } = useParams();
  const title = slug?.replace(/-/g, ' ') || 'Blog Post';
  return <main className="bg-[#050505] min-h-screen pt-48 pb-20">
    <article className="container mx-auto px-4 max-w-4xl">
      <header className="mb-12 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-[color:var(--bright-red)]/10 text-[color:var(--bright-red)] text-sm font-bold mb-6">
          Technology Trends
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 capitalize leading-tight">
          {title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} /> Alex Chen
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} /> Jan 15, 2026
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} /> 5 min read
          </div>
        </div>
      </header>

      <div className="aspect-video rounded-2xl overflow-hidden mb-12">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80" alt="Blog Cover" className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-gray-300 mb-8">
          Artificial Intelligence is rapidly transforming the landscape of
          mobile application development. From personalized user experiences
          to predictive analytics, AI integration is no longer a luxury but a
          necessity.
        </p>

        <h2>The Rise of Intelligent Apps</h2>
        <p>
          Modern users expect apps to be smart. They want interfaces that
          adapt to their behavior, content that aligns with their interests,
          and assistance that feels human.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
        <div className="text-white font-bold">Share this article:</div>
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  </main>;
}