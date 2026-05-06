import React from 'react';
import styles from './Input.module.css';

export default function Input({ className = '', ...props }) {
  const nextClassName = [styles.field, className].filter(Boolean).join(' ');
  return <input className={nextClassName} {...props} />;
}
