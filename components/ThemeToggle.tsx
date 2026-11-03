import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Theme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'light' ? t.nav.themeToDark : t.nav.themeToLight}
      className="press flex h-11 w-11 items-center justify-center rounded-full text-ink-2 hover:text-ink"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
