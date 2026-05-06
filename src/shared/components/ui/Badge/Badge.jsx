import React from 'react';
import styles from './Badge.module.css';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Badge({ children, tone = 'neutral', className = '', ...props }) {
  return (
    <span className={cx(styles.root, styles[tone], className)} {...props}>
      {children}
    </span>
  );
}
