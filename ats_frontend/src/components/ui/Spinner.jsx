import './Spinner.css';

/**
 * Loading spinner
 * @param {{ size?: 'sm' | 'md' | 'lg', color?: string }} props
 */
export function Spinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner--${size}`} aria-label="Loading..." />
  );
}

