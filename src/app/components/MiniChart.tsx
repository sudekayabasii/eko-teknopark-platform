import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

interface MiniChartProps {
  title: string;
  value: string;
  data: number[];
  color?: string;
}

export function MiniChart({ title, value, data, color = '#3b82f6' }: MiniChartProps) {
  const { theme } = useTheme();
  const chartData = data.map((val, index) => ({ value: val, index }));

  return (
    <div
      className="rounded-lg p-4 border shadow-xl"
      style={{
        backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
        >
          {title}
        </span>
        <span
          className="text-sm"
          style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
        >
          {value}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
