import React from 'react';
import styles from './Card.module.css';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Card({ children, padding = 'md', className = '', ...props }) {
  const paddingClass =
    padding === 'sm' ? styles.paddingSm : padding === 'lg' ? styles.paddingLg : styles.paddingMd;

  return (
    <div className={cx(styles.root, paddingClass, className)} {...props}>
      {children}
    </div>
  );
}
