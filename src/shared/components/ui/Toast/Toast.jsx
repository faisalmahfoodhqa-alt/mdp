import React from 'react';
import styles from './Toast.module.css';

const cx = (...parts) => parts.filter(Boolean).join(' ');

export default function Toast({ message, type = 'info', className = '' }) {
  if (!message) return null;
  return <div className={cx(styles.root, styles[type], className)}>{message}</div>;
}
