import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, getCategoryColor, blogPageIcons } from '@/data/blogData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BlogPostCard = ({ post, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: index * 0.1 } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col border border-border/60 glass-card-professional"
    >
      <Link to={`/blog/${post.slug}`} className="block group">
        <div className="relative h-52 overflow-hidden">
          <img 
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
           {post.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2.5 py-1 text-xs">
              Top Reccommend
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <Badge variant="outline" className={`${getCategoryColor(post.category)} border-none text-xs`}>{post.category}</Badge>
        </div>
        <Link to={`/blog/${post.slug}`} className="block group">
          <h3 className="text-lg font-semibold text-heading-foreground mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <div className="text-xs text-muted-foreground mb-4">
          <div className="flex items-center mb-1">
            {blogPageIcons.User}
            <span>{post.authors}</span>
          </div>
          <div className="flex items-center">
            {blogPageIcons.Calendar}
            <span>{post.date}</span>
          </div>
        </div>
        <Link to={`/blog/${post.slug}`} className="mt-auto">
          <Button variant="outline" size="sm" className="w-full hover:bg-primary/10 hover:border-primary/50 text-primary hover:text-primary-dark">
            Read More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gradient-to-b from-background via-slate-50 to-secondary/5 min-h-screen">
      <motion.header 
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 md:py-20 text-center relative overflow-hidden bg-primary/5"
      >
        <div className="absolute inset-0 opacity-40">
           <img src="https://i.postimg.cc/9FpYqTCD/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.55.03.png" alt="Abstract wellness background with soft light and natural textures" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>

        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-primary-dark mb-3">Wellness Expert Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles on wellbeing, mindfulness, travel, and holistic health from our experts and guest contributors.
          </p>
          <div className="decorative-line-teal mt-6"></div>
        </div>
      </motion.header>

      <main className="container-custom py-8 md:py-12">
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-card border-border/70 focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          <div className="relative">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto h-11 pl-3 pr-10 rounded-md border border-border/70 bg-card text-sm focus:ring-primary focus:border-primary appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-heading-foreground">No Articles Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search term or category filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;