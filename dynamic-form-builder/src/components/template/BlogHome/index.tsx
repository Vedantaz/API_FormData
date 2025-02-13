import React from 'react';
import BlogList from '../../organisms/BlogList';

const BlogHome: React.FC = () => {
//   const blogs = [
//     { id: 1, title: 'Sample Blog 1', summary: 'Summary 1', author: 'Author 1' },
//     { id: 2, title: 'Sample Blog 2', summary: 'Summary 2', author: 'Author 2' }
//   ];

const [blogs, setBlogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('../../../../blogs.json')
      .then((response) => response.json())
      .then((data) => setBlogs(data.blogs))
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const handleBlogClick = (id: number) => {
    console.log(`Navigate to blog ${id}`);
  };

  return <BlogList blogs={blogs} onBlogClick={handleBlogClick} />;
};

export default BlogHome;
