import { Home, Cpu, Sliders, Menu, X, FileText } from 'lucide-react';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const bg = theme === 'dark' ? '#0d1520' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(226, 232, 240, 1)';
  const titleColor = theme === 'dark' ? '#ffffff' : '#1e293b';
  const activeClass = 'bg-blue-600 text-white';
  const inactiveClass =
    theme === 'dark'
      ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  const navItems = [
    { to: '/',           icon: <Home size={20} />,    label: 'Ana Sayfa',            end: true },
    { to: '/automation', icon: <Cpu size={20} />,     label: 'Otomasyon ve Kontrol', end: false },
    { to: '/raporlama',  icon: <FileText size={20} />, label: 'Raporlama',           end: false },
    { to: '/settings',   icon: <Sliders size={20} />, label: 'Ayarlar',              end: false },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="lg:hidden border-b p-4 flex items-center gap-3"
        style={{ backgroundColor: bg, borderColor }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{
            color: titleColor,
            backgroundColor: isOpen
              ? theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(241, 245, 249, 1)'
              : 'transparent',
          }}
          aria-label="Menüyü aç/kapat"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div>
          <h2 style={{ color: titleColor }}>EKO-TEKNOPARK</h2>
          <p className="text-xs" style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}>
            Yönetim Paneli
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in menu */}
      <nav
        className={`lg:hidden fixed top-[73px] left-0 bottom-0 w-64 border-r z-50 p-4 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: bg, borderColor }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsOpen(false)}
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
    </>
  );
}
