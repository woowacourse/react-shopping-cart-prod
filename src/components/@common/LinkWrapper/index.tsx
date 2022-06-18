import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

export default function LinkWrapper({ to, children }) {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e instanceof SVGElement) {
      e.preventDefault();
    }
  };

  return (
    <Link to={to} replace onClick={handleLinkClick}>
      {children}
    </Link>
  );
}
