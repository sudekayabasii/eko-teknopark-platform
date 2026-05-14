import { Home, Cpu, Sliders, FileText } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTheme } from '../context/ThemeContext';

export function Sidebar() {
  const { theme } = useTheme();

  const bg = theme === 'dark' ? '#0d1520' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(226, 232, 240, 1)';
  const titleColor = theme === 'dark' ? '#ffffff' : '#1e293b';
  const subtitleColor = theme === 'dark' ? '#6b7280' : '#94a3b8';
  const activeClass = 'bg-blue-600 text-white';
  const inactiveClass =
    theme === 'dark'
      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  const navItems = [
    { to: '/',           icon: <Home size={20} />,    label: 'Ana Sayfa' },
    { to: '/automation', icon: <Cpu size={20} />,     label: 'Otomasyon ve Kontrol' },
    { to: '/raporlama',  icon: <FileText size={20} />, label: 'Raporlama' },
    { to: '/settings',   icon: <Sliders size={20} />, label: 'Ayarlar' },
  ];

  return (
    <aside
      className="w-64 border-r flex flex-col h-full"
      style={{ backgroundColor: bg, borderColor }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor }}>
        <h2 className="mb-1" style={{ color: titleColor }}>EKO-TEKNOPARK</h2>
        <p className="text-xs" style={{ color: subtitleColor }}>
          Kapalı Döngü Kentsel Tarım
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor }}>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-green-400 inline-block"
            style={{ boxShadow: '0 0 6px #4ade80' }}
          />
          <span className="text-xs" style={{ color: subtitleColor }}>
            Sistem Aktif — v1.0.0
          </span>
        </div>
      </div>
    </aside>
  );
}
