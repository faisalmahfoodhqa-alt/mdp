import React from 'react';
import Button from './Button';

/**
 * Wrapper for legacy pages: preserves full inline `style` (pixel-perfect migrations).
 * Defaults to type="button" (forms can pass type="submit").
 */
export default function UIButton({ children, style, type = 'button', ...rest }) {
  return (
    <Button variant="secondary" size="sm" {...rest} type={type} style={style}>
      {children}
    </Button>
  );
}
