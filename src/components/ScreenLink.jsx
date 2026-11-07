import { Link } from 'react-router-dom';
import { screenPath } from '../routes.js';

/**
 * A link to another screen. Takes the design's screen file name
 * ("Court.dc.html", optionally with "?query") and routes in-app;
 * anything else (#, http…) falls back to a plain anchor.
 */
export default function ScreenLink({ href, children, ...rest }) {
  const to = href ? screenPath(href) : null;
  if (!to) {
    return (
      <a href={href} onClick={href === '#' ? (e) => e.preventDefault() : undefined} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
