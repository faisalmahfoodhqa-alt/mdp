import React from 'react';
import styles from './Modal.module.css';
import UIButton from '../Button/UIButton';

export default function Modal({
  title,
  onClose,
  children,
  dir = 'rtl',
  overlayStyle,
  contentStyle,
  titleStyle,
  closeButtonStyle
}) {
  return (
    <div className={styles.overlay} dir={dir} style={overlayStyle}>
      <div className={styles.content} style={contentStyle}>
        <div className={styles.header}>
          <h3 className={styles.title} style={titleStyle}>{title}</h3>
          <UIButton
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
            style={closeButtonStyle}
          >
            ×
          </UIButton>
        </div>
        {children}
      </div>
    </div>
  );
}
