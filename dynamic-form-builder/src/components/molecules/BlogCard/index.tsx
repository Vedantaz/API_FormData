import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface BlogCardProps {
  title: string;
  summary: string;
  author: string;
  content: string;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, summary, author, content, onClick }) => (
  <Card onClick={onClick} style={{ margin: '1rem', cursor: 'pointer' }}>
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {summary}
      </Typography>
      <Typography variant='body2' color='textSecondary'> {content}</Typography>
      <Typography variant="caption">By {author}</Typography>
    </CardContent>
  </Card>
);

export default BlogCard;
