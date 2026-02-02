import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Share2, ArrowLeft, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { Blog } from '../types/api';

export function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await apiService.getBlogById(id);
        if (response.success) {
          setBlog(response.data);
        } else {
          setError(response.message || 'Blog not found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[color:var(--bright-red)] animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">{error || 'Blog not found'}</h2>
        <Link to="/blog" className="flex items-center gap-2 text-[color:var(--bright-red)] hover:underline">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] min-h-screen pt-48 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Blog
        </Link>

        <header className="mb-12 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-[color:var(--bright-red)]/10 text-[color:var(--bright-red)] text-sm font-bold mb-6">
            {Array.isArray(blog.tags) ? blog.tags[0] : 'Technology'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 capitalize leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} /> {blog.writer}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {blog.readingTime} read
            </div>
          </div>
        </header>

        <div className="aspect-video rounded-2xl overflow-hidden mb-12">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          {blog.details.split('\n').map((para, i) => (
            <p key={i} className={i === 0 ? "lead text-xl text-gray-300 mb-8" : "text-gray-300 mb-6"}>
              {para}
            </p>
          ))}
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
    </main>
  );
}
