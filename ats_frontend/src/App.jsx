import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './router/AppRouter';

/**
 * Root component.
 * - ThemeProvider gives theme access to all children
 * - AppRouter handles all navigation
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}