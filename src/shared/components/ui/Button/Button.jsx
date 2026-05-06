import React from 'react';
import styles from './Button.module.css';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cx(styles.root, styles[variant], styles[size], fullWidth && styles.fullWidth, className)}
      {...props}
    >
      {children}
    </button>
  );
}
