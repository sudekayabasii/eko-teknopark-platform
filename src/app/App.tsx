import { BrowserRouter, Routes, Route } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { MobileSidebar } from './components/MobileSidebar';
import { HomePage } from './pages/HomePage';
import { AutomationPage } from './pages/AutomationPage';
import { RaporlamaPage } from './pages/RaporlamaPage';
import { SettingsPage } from './pages/SettingsPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className="size-full flex flex-col lg:flex-row"
      style={{ backgroundColor: theme === 'dark' ? '#0a0f1a' : '#f8fafc' }}
    >
      <MobileSidebar />
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/raporlama" element={<RaporlamaPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}