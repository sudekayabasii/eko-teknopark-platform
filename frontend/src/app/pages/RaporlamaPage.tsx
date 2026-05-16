import { useState } from 'react';
import { Header } from '../components/Header';
import { Droplet, Zap, Recycle, Factory, TrendingUp, Download, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function RaporlamaPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Aylık');

  const tabs = ['Günlük', 'Haftalık', 'Aylık', 'Yıllık'];

  const waterData = [
    { id: 'w1', name: 'Oca', value: 3.8 },
    { id: 'w2', name: 'Şub', value: 4.0 },
    { id: 'w3', name: 'Mar', value: 3.9 },
    { id: 'w4', name: 'Nis', value: 4.2 },
    { id: 'w5', name: 'May', value: 4.2 },
  ];

  const energyData = [
    { id: 'e1', name: 'Oca', production: 170, consumption: 195 },
    { id: 'e2', name: 'Şub', production: 175, consumption: 200 },
    { id: 'e3', name: 'Mar', production: 180, consumption: 205 },
    { id: 'e4', name: 'Nis', production: 186, consumption: 210 },
    { id: 'e5', name: 'May', production: 186, consumption: 208 },
  ];

  const wasteData = [
    { id: 'wa1', name: 'Oca', value: 62 },
    { id: 'wa2', name: 'Şub', value: 65 },
    { id: 'wa3', name: 'Mar', value: 66 },
    { id: 'wa4', name: 'Nis', value: 68 },
    { id: 'wa5', name: 'May', value: 68 },
  ];

  const biogasData = [
    { id: 'b1', name: 'Oca', value: 11.8 },
    { id: 'b2', name: 'Şub', value: 12.0 },
    { id: 'b3', name: 'Mar', value: 12.3 },
    { id: 'b4', name: 'Nis', value: 12.5 },
    { id: 'b5', name: 'May', value: 12.5 },
  ];

  const reportRows = [
    { period: 'Aylık', module: 'Su Geri Kazanım', value: '4.2 m³', gain: '%8 artış', status: 'Normal' },
    { period: 'Aylık', module: 'Enerji Yönetimi', value: '186 kWh', gain: '%12 artış', status: 'Normal' },
    { period: 'Aylık', module: 'Atık Yönetimi', value: '%68', gain: '%6 artış', status: 'Normal' },
    { period: 'Aylık', module: 'Biyogaz', value: '12.5 m³/gün', gain: 'Stabil', status: 'Normal' },
    { period: 'Aylık', module: 'Dikey Tarım', value: '%87 verim', gain: '%5 artış', status: 'Normal' },
  ];

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: theme === 'dark' ? '#0a0f1a' : '#f8fafc' }}
    >
      <Header title="Raporlama" />

      <main className="px-4 md:px-6 pb-6">
        {/* Time Filter Tabs */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: activeTab === tab
                    ? 'rgba(59, 130, 246, 0.2)'
                    : theme === 'dark' ? '#0d1f33' : '#ffffff',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: activeTab === tab
                    ? 'rgba(59, 130, 246, 0.5)'
                    : theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                  color: activeTab === tab
                    ? '#3b82f6'
                    : theme === 'dark' ? '#d1d5db' : '#475569'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Report Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {/* Su Tasarrufu */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Droplet className="text-blue-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Aylık Su Tasarrufu
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  4.2 m³
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400">↑ 8%</span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Geri kazanım sistemi sayesinde
              </span>
            </div>
          </div>

          {/* Enerji Kazanımı */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Zap className="text-yellow-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Enerji Kazanımı
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  186 kWh
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400">↑ 12%</span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Biyogaz ve geri kazanım desteği
              </span>
            </div>
          </div>

          {/* Atık Geri Kazanım */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Recycle className="text-green-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Atık Geri Kazanım Oranı
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  %68
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400">↑ 6%</span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Organik ve geri dönüştürülebilir atıklar
              </span>
            </div>
          </div>

          {/* Biyogaz Üretimi */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Factory className="text-purple-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Biyogaz Üretimi
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  12.5 m³/gün
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              >
                Stabil
              </span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Organik atık dönüşüm hattı
              </span>
            </div>
          </div>

          {/* Sistem Verimliliği */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Sistem Verimliliği
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  %87
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
              >
                Normal
              </span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Genel sistem performansı
              </span>
            </div>
          </div>

          {/* Maliyet Tasarrufu */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-400" size={18} />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                >
                  Tahmini Maliyet Tasarrufu
                </p>
                <p
                  className="text-lg"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
                >
                  ₺18.400
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400">↑ 10%</span>
              <span
                className="text-xs"
                style={{ color: theme === 'dark' ? '#6b7280' : '#94a3b8' }}
              >
                Su, enerji ve atık geri kazanımı
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {/* Su Geri Kazanım Trendi */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
            >
              Su Geri Kazanım
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={waterData}>
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1a2332' : '#ffffff',
                    border: '1px solid',
                    borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line key="water-line" type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Enerji Üretim ve Tüketim */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
            >
              Enerji Üretim ve Tüketim Dengesi
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={energyData}>
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1a2332' : '#ffffff',
                    border: '1px solid',
                    borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar key="energy-production" dataKey="production" fill="#f59e0b" />
                <Bar key="energy-consumption" dataKey="consumption" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Atık Geri Dönüşüm Performansı */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
            >
              Atık Geri Dönüşüm Performansı
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={wasteData}>
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1a2332' : '#ffffff',
                    border: '1px solid',
                    borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar key="waste-bar" dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Biyogaz Üretim Trendi */}
          <div
            className="rounded-lg p-4 border shadow-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
              borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
            }}
          >
            <h3
              className="text-sm mb-3"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
            >
              Biyogaz Üretimi
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={biogasData}>
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={theme === 'dark' ? '#6b7280' : '#94a3b8'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1a2332' : '#ffffff',
                    border: '1px solid',
                    borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line key="biogas-line" type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Table */}
        <div
          className="rounded-lg p-4 border shadow-xl mb-4"
          style={{
            backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
            borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
          }}
        >
          <h3
            className="text-sm mb-3"
            style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
          >
            Rapor Özeti
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr
                  style={{
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
                  }}
                >
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                  >
                    Tarih Aralığı
                  </th>
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                  >
                    Sistem Modülü
                  </th>
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                  >
                    Ölçülen Değer
                  </th>
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                  >
                    Kazanım / Tasarruf
                  </th>
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}
                  >
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(226, 232, 240, 1)'
                    }}
                  >
                    <td
                      className="py-2 px-2"
                      style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}
                    >
                      {row.period}
                    </td>
                    <td
                      className="py-2 px-2"
                      style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}
                    >
                      {row.module}
                    </td>
                    <td
                      className="py-2 px-2"
                      style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}
                    >
                      {row.value}
                    </td>
                    <td
                      className="py-2 px-2"
                      style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}
                    >
                      {row.gain}
                    </td>
                    <td className="py-2 px-2">
                      <span className="text-green-400">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Evaluation */}
        <div
          className="rounded-lg p-4 border shadow-xl mb-4"
          style={{
            backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
            borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)'
          }}
        >
          <h3
            className="text-sm mb-2"
            style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}
          >
            Genel Değerlendirme
          </h3>
          <p
            className="text-xs"
            style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}
          >
            Bu rapor, su geri kazanımı, enerji üretimi, atık yönetimi ve biyogaz performansı üzerinden sistemin aylık çalışma verimliliğini göstermektedir.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
            <Download size={16} />
            Raporu İndir
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
            <FileText size={16} />
            PDF Olarak Dışa Aktar
          </button>
        </div>
      </main>
    </div>
  );
}
