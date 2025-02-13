import React from 'react';
import { Button as MUIButton } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'contained', color = 'primary' }) => (
  <MUIButton variant={variant} color={color} onClick={onClick}>
    {label}
  </MUIButton>
);

export default Button;