import { Search, Bell, User, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className="px-4 md:px-6 pt-4 pb-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h4
          className="text-sm md:text-base"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
        >
          {title}
        </h4>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              size={18}
            />
            <input
              type="text"
              placeholder="Ara..."
              className="border rounded-lg pl-10 pr-4 py-2 text-sm w-48 lg:w-64 focus:outline-none focus:border-blue-600/50"
              style={{
                backgroundColor: theme === 'dark' ? '#1a2332' : '#f8fafc',
                borderColor: theme === 'dark' ? 'rgba(107, 114, 128, 0.5)' : 'rgba(226, 232, 240, 1)',
                color: theme === 'dark' ? '#d1d5db' : '#1e293b'
              }}
            />
          </div>
          <div className="relative">
            <Bell
              className="cursor-pointer"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              size={18}
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              4
            </span>
          </div>
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ backgroundColor: theme === 'dark' ? '#1e3a5f' : '#dbeafe' }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span
              className="text-sm hidden lg:inline"
              style={{ color: theme === 'dark' ? '#d1d5db' : '#1e293b' }}
            >
              Sistem Normal
            </span>
          </div>

          <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
        </div>
      </div>
      <div>
        <h1
          className="mb-1 text-xl md:text-2xl font-bold"
          style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
        >
          EKO-TEKNOPARK
        </h1>
        <p
          className="text-xs md:text-sm"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
        >
          Kapalı Döngü Kentsel Tarım ve Geri Dönüşüm Tesisi
        </p>
      </div>
    </header>
  );
}
