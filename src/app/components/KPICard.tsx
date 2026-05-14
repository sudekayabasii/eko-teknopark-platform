import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

interface KPICardProps {
  title: string;
  value: string;
  indicator?: string;
  icon: ReactNode;
  iconBgColor: string;
}

export function KPICard({ title, value, indicator, icon, iconBgColor }: KPICardProps) {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-lg p-4 border shadow-xl"
      style={{
        backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
      }}
    >
      <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p
        className="text-xs mb-1"
        style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
      >
        {title}
      </p>
      <div className="flex items-end gap-2">
        <span
          className="text-xl"
          style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
        >
          {value}
        </span>
        {indicator && (
          <span className="text-xs text-green-400 mb-0.5">{indicator}</span>
        )}
      </div>
    </div>
  );
}
