import React from 'react';
import BlogCard from '../../molecules/BlogCard';

interface Blog {
  id: number;
  title: string;
  summary: string;
  content:string;
  author: string;
}

interface BlogListProps {
  blogs: Blog[];
  onBlogClick: (id: number) => void;
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const BlogList: React.FC<BlogListProps> = ({ blogs, onBlogClick }) => (
    <div>
    {blogs.map((blog) => (
      <BlogCard
        key={blog.id}
        title={blog.title}
        summary={truncateText(blog.summary, 50)}
        author={blog.author}
        content={truncateText(blog.content, 50)}
        onClick={() => onBlogClick(blog.id)}
      />
    ))}
  </div>
  
);

export default BlogList;