import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SystemCardProps {
  title: string;
  icon: ReactNode;
  metrics: { label: string; value: string }[];
  status: 'Normal' | 'Uyarı' | 'Kritik';
}

export function SystemCard({ title, icon, metrics, status }: SystemCardProps) {
  const { theme } = useTheme();

  const statusColors = {
    Normal: 'bg-green-600/20 text-green-400 border-green-600/30',
    Uyarı: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
    Kritik: 'bg-red-600/20 text-red-400 border-red-600/30',
  };

  return (
    <div
      className="rounded-lg p-4 border shadow-xl"
      style={{
        backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <div className="text-blue-400">
              {icon}
            </div>
          </div>
          <h4
            className="text-sm"
            style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
          >
            {title}
          </h4>
        </div>
        <span className={`px-2 py-0.5 rounded text-xs border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="space-y-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span
              className="text-xs"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
            >
              {metric.label}
            </span>
            <span
              className="text-sm"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
