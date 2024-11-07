import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Button({ children, to, href, variant = 'primary', size = 'default', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 relative group';

  // Size variations
  const sizeClasses = {
    small: 'px-4 py-2 text-sm rounded-lg',
    default: 'px-6 py-3 rounded-xl',
    large: 'px-8 py-4 text-lg rounded-xl'
  };

  // Enhanced variant styles with gradients and hover effects
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-violet-600 to-fuchsia-600
      text-white
      hover:from-violet-500 hover:to-fuchsia-500
      hover:shadow-lg hover:shadow-violet-500/25
      active:from-violet-700 active:to-fuchsia-700
      disabled:opacity-50 disabled:cursor-not-allowed
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-600/0 before:via-white/25 before:to-fuchsia-600/0
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
      overflow-hidden
    `,
    secondary: `
      bg-white/[0.03] backdrop-blur-sm
      border border-white/10
      text-white/90
      hover:bg-white/[0.08] hover:border-white/20 hover:text-white
      active:bg-white/[0.12]
      disabled:opacity-50 disabled:cursor-not-allowed
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500/0 before:via-violet-500/10 before:to-fuchsia-500/0
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    outline: `
      bg-transparent
      border-2 border-violet-500/50
      text-violet-400
      hover:border-violet-400 hover:text-violet-300
      hover:shadow-lg hover:shadow-violet-500/20
      active:border-violet-600 active:text-violet-500
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      bg-transparent
      text-white/70
      hover:text-white hover:bg-white/[0.05]
      active:bg-white/[0.1]
      disabled:opacity-50 disabled:cursor-not-allowed
    `
  };

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  // Common props for all button types
  const commonProps = {
    className: classes,
    ...props
  };

  if (to) {
    return <Link to={to} {...commonProps}>{children}</Link>;
  }

  if (href) {
    return <a href={href} {...commonProps}>{children}</a>;
  }

  return <button {...commonProps}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string
};
