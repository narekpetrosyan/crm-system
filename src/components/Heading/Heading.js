import React, { memo } from 'react';
import clsx from 'clsx';

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
};

const Tag = ({ children, variant, ...props }) =>
  React.createElement(elements[variant] || elements.h1, props, children);

const Heading = ({ children, variant, className, ...props }) => {
  return (
    <Tag variant={variant} className={clsx(className)} {...props}>
      {children}
    </Tag>
  );
};

export default memo(Heading);
