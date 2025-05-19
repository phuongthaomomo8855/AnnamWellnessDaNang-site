import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug, getRelatedPosts, getCategoryColor, blogPageIcons } from '@/data/blogData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Tag, ArrowRight } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(slug, 2) : [];

  const customBackgroundImages = {
    '12-benefits-of-yoga': 'https://i.postimg.cc/BvWPxNKx/yoga-ne.jpg',
    'discover-da-nang': 'https://i.postimg.cc/q7JZGTbk/%C4%90O%CC%80_A%CC%86N_DA_NANG.jpg',
    'fate-comes-to-singing-bowl': 'https://i.postimg.cc/fRjrXLv2/BA-T-HA-T.jpg',
    'culinary-wellness-le-danh-tuyen': 'https://i.postimg.cc/bJdCKRfW/GS-TIEN.webp',
    'bamboo-massage-benefits': 'https://i.postimg.cc/bw86zPjQ/MA-T-XA.jpg',
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
  };
  
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Sharing is not supported on this browser. You can copy the URL manually.');
    }
  };

  const heroImageUrl = customBackgroundImages[slug] || post.imageUrl;

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gradient-to-b from-background via-slate-50 to-secondary/5"
    >
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img 
          src={heroImageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="container-custom absolute bottom-0 left-0 right-0 pb-8 md:pb-12 z-10">
          <Link to="/blog" className="inline-flex items-center text-sm text-gray-200 hover:text-white transition-colors mb-2 group">
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-300">
            <div className="flex items-center">
              {blogPageIcons.User}
              <span>{post.authors}</span>
            </div>
            <div className="flex items-center">
              {blogPageIcons.Calendar}
              <span>{post.date}</span>
            </div>
            <Badge variant="outline" className={`${getCategoryColor(post.category)} border-none text-xs py-0.5`}>{post.category}</Badge>
          </div>
        </div>
      </div>

      <main className="container-custom py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <motion.article 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none 
                       prose-headings:font-serif prose-headings:text-heading-foreground 
                       prose-p:text-paragraph-foreground prose-p:leading-relaxed
                       prose-a:text-primary hover:prose-a:text-primary-dark
                       prose-strong:text-heading-foreground
                       prose-ul:pl-5 prose-li:marker:text-primary
                       prose-img:rounded-md prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <aside className="lg:col-span-4 mt-10 lg:mt-0 space-y-8">
            <motion.div 
              variants={contentVariants} 
              initial="hidden" 
              animate="visible" 
              className="p-6 bg-card rounded-lg shadow-md border border-border/60"
            >
              <h3 className="text-lg font-semibold text-heading-foreground mb-3">Share this Post</h3>
              <Button onClick={sharePost} variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              {post.articleUrl && (
                 <a href={post.articleUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block">
                    <Button variant="link" className="w-full text-primary p-0 h-auto">
                        Read Original Article <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                </a>
              )}
            </motion.div>

            {post.tags && post.tags.length > 0 && (
              <motion.div 
                variants={contentVariants} 
                initial="hidden" 
                animate="visible" 
                className="p-6 bg-card rounded-lg shadow-md border border-border/60"
              >
                <h3 className="text-lg font-semibold text-heading-foreground mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-primary" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs py-0.5">{tag}</Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {relatedPosts.length > 0 && (
              <motion.div 
                variants={contentVariants} 
                initial="hidden" 
                animate="visible" 
                className="p-6 bg-card rounded-lg shadow-md border border-border/60"
              >
                <h3 className="text-lg font-semibold text-heading-foreground mb-4">Related Articles</h3>
                <ul className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <li key={relatedPost.id} className="group">
                      <Link to={`/blog/${relatedPost.slug}`} className="block">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-20 h-16 rounded-md overflow-hidden">
                             <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-heading-foreground group-hover:text-primary transition-colors leading-snug mb-0.5">
                              {relatedPost.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">{relatedPost.date}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </aside>
        </div>
      </main>
    </motion.div>
  );
};

export default BlogPostPage;