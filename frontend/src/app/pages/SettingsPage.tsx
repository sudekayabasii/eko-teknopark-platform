import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/Header';
import {
  User, Server, Bell, Sliders, Link2, Users, Shield, HardDrive,
  Save, RefreshCw, ChevronRight, Check, Database, Wifi
} from 'lucide-react';
import {
  LineChart, Line, ResponsiveContainer, Tooltip
} from 'recharts';

/* ─── Shared primitives ─────────────────────────────────────── */

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors shrink-0 focus:outline-none"
      style={{ backgroundColor: checked ? '#2563eb' : 'rgba(55,65,81,0.6)' }}
    >
      <span
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
        style={{ left: checked ? '1.375rem' : '0.25rem' }}
      />
    </button>
  );
}

interface CardProps {
  title: string;
  icon: React.ReactNode;
  theme: string;
  children: React.ReactNode;
}

function SettingsCard({ title, icon, theme, children }: CardProps) {
  const bg = theme === 'dark' ? '#0d1f33' : '#ffffff';
  const border = theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';

  return (
    <div className="rounded-xl p-4 border flex flex-col gap-4" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
          {icon}
        </div>
        <h3 className="text-sm font-semibold" style={{ color: text }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ActionButton({
  children,
  variant = 'primary',
  theme,
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'amber';
  theme: string;
  onClick?: () => void;
}) {
  const styles = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: '1px solid #2563eb',
    },
    secondary: {
      backgroundColor: theme === 'dark' ? 'rgba(37,99,235,0.12)' : 'rgba(59,130,246,0.08)',
      color: '#60a5fa',
      border: '1px solid rgba(59,130,246,0.3)',
    },
    amber: {
      backgroundColor: 'rgba(217,119,6,0.15)',
      color: '#f59e0b',
      border: '1px solid rgba(217,119,6,0.3)',
    },
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
      style={styles[variant]}
    >
      {children}
    </button>
  );
}

function FieldRow({ label, value, theme }: { label: string; value: string; theme: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs shrink-0" style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}>{label}</span>
      <span className="text-xs font-medium text-right" style={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}>{value}</span>
    </div>
  );
}

function InputField({ label, value, unit, theme }: { label: string; value: string; unit?: string; theme: string }) {
  const inputBg = theme === 'dark' ? '#0a1628' : '#f8fafc';
  const inputBorder = theme === 'dark' ? 'rgba(59,130,246,0.25)' : 'rgba(226,232,240,1)';

  return (
    <div>
      <label className="block text-xs mb-1" style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}>{label}</label>
      <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: inputBorder }}>
        <input
          type="text"
          defaultValue={value}
          className="flex-1 text-xs px-3 py-2 focus:outline-none bg-transparent"
          style={{ backgroundColor: inputBg, color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}
        />
        {unit && (
          <span
            className="px-2.5 py-2 text-xs border-l shrink-0"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(37,99,235,0.15)' : 'rgba(59,130,246,0.06)',
              borderColor: inputBorder,
              color: '#60a5fa',
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function SelectField({ label, value, theme }: { label: string; value: string; theme: string }) {
  const inputBg = theme === 'dark' ? '#0a1628' : '#f8fafc';
  const inputBorder = theme === 'dark' ? 'rgba(59,130,246,0.25)' : 'rgba(226,232,240,1)';

  return (
    <div>
      <label className="block text-xs mb-1" style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}>{label}</label>
      <div
        className="flex items-center justify-between rounded-lg border px-3 py-2 cursor-pointer"
        style={{ backgroundColor: inputBg, borderColor: inputBorder }}
      >
        <span className="text-xs" style={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}>{value}</span>
        <Check size={13} className="text-green-400 shrink-0" />
      </div>
    </div>
  );
}

/* ─── Tab content cards ──────────────────────────────────────── */

const MINI_CHART_DATA = [
  { v: 20 }, { v: 35 }, { v: 28 }, { v: 42 }, { v: 38 },
  { v: 55 }, { v: 48 }, { v: 60 }, { v: 52 }, { v: 65 },
];

function Genel({ theme, setTheme }: { theme: string; setTheme: (t: 'dark' | 'light') => void }) {
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const divider = theme === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(226,232,240,1)';

  const [notifs, setNotifs] = useState({
    kritik: true,
    uyari: true,
    raporlar: false,
    bakim: true,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

      {/* 1 · Profil Bilgileri */}
      <SettingsCard title="Profil Bilgileri" icon={<User size={16} />} theme={theme}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0 border-2 border-blue-500/30">
            <User size={28} className="text-blue-400" />
          </div>
          <ActionButton variant="secondary" theme={theme}>
            Fotoğraf Değiştir
          </ActionButton>
        </div>
        <div className="space-y-3">
          <InputField label="Ad Soyad" value="*****" theme={theme} />
          <InputField label="E-posta" value="******@ekoteknopark.com" theme={theme} />
          <InputField label="Rol" value="Sistem Yöneticisi" theme={theme} />
        </div>
        <div className="flex justify-end">
          <ActionButton variant="primary" theme={theme}>
            <Save size={12} /> Kaydet
          </ActionButton>
        </div>
      </SettingsCard>

      {/* 2 · Sistem Bilgileri */}
      <SettingsCard title="Sistem Bilgileri" icon={<Server size={16} />} theme={theme}>
        <div className="space-y-2.5">
          <FieldRow label="Sistem Adı" value="EKO-TEKNOPARK Yönetim Sistemi" theme={theme} />
          <div className="h-px" style={{ backgroundColor: divider }} />
          <FieldRow label="Sürüm" value="v1.2.0" theme={theme} />
          <div className="h-px" style={{ backgroundColor: divider }} />
          <FieldRow label="Son Güncelleme" value="12 Mayıs 2025 14:30" theme={theme} />
          <div className="h-px" style={{ backgroundColor: divider }} />
          <FieldRow label="Çalışma Süresi" value="15 gün, 7 saat, 42 dakika" theme={theme} />
          <div className="h-px" style={{ backgroundColor: divider }} />
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: sub }}>Veritabanı Durumu</span>
            <span className="text-xs flex items-center gap-1 font-medium" style={{ color: '#4ade80' }}>
              <Database size={11} /> Bağlı
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <ActionButton variant="amber" theme={theme}>
            <RefreshCw size={12} /> Sistem Güncelleme
          </ActionButton>
        </div>
      </SettingsCard>

      {/* 3 · Bildirim Tercihleri */}
      <SettingsCard title="Bildirim Tercihleri" icon={<Bell size={16} />} theme={theme}>
        <div className="space-y-3">
          {(
            [
              { key: 'kritik', label: 'Kritik alarmlar' },
              { key: 'uyari', label: 'Uyarı alarmları' },
              { key: 'raporlar', label: 'Sistem raporları' },
              { key: 'bakim', label: 'Bakım bildirimleri' },
            ] as const
          ).map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm" style={{ color: text }}>{item.label}</span>
              <Toggle
                checked={notifs[item.key]}
                onChange={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <ActionButton variant="primary" theme={theme}>
            <Save size={12} /> Tercihleri Kaydet
          </ActionButton>
        </div>
      </SettingsCard>

      {/* 4 · Eşik Değerler */}
      <SettingsCard title="Eşik Değerler" icon={<Sliders size={16} />} theme={theme}>
        <div className="space-y-3">
          <InputField label="Toprak Nem Seviyesi" value="60" unit="%" theme={theme} />
          <InputField label="Su Seviyesi" value="75" unit="%" theme={theme} />
          <InputField label="pH Değeri" value="6.5" theme={theme} />
          <InputField label="Biyogaz Basıncı" value="1.8" unit="bar" theme={theme} />
          <InputField label="Sıcaklık" value="26" unit="°C" theme={theme} />
        </div>
        <div className="flex justify-end">
          <ActionButton variant="primary" theme={theme}>
            <Save size={12} /> Eşik Değerleri Kaydet
          </ActionButton>
        </div>
      </SettingsCard>

      {/* 5 · Entegrasyonlar */}
      <SettingsCard title="Entegrasyonlar" icon={<Link2 size={16} />} theme={theme}>
        <div className="space-y-2.5">
          {[
            { label: 'Hava Durumu API', status: 'Aktif', type: 'active' },
            { label: 'SMS Servisi', status: 'Aktif', type: 'active' },
            { label: 'E-posta Servisi', status: 'Aktif', type: 'active' },
            { label: 'SCADA Bağlantısı', status: 'Bağlı', type: 'connected' },
          ].map(item => {
            const isConnected = item.type === 'connected';
            const badgeBg = isConnected ? 'rgba(59,130,246,0.15)' : 'rgba(34,197,94,0.15)';
            const badgeText = isConnected ? '#60a5fa' : '#22c55e';
            const badgeBorder = isConnected ? 'rgba(59,130,246,0.3)' : 'rgba(34,197,94,0.3)';
            return (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi size={13} style={{ color: badgeText }} />
                  <span className="text-sm" style={{ color: text }}>{item.label}</span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: badgeBg, color: badgeText, borderColor: badgeBorder }}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          <ActionButton variant="secondary" theme={theme}>
            <ChevronRight size={12} /> Entegrasyon Yönetimi
          </ActionButton>
        </div>
      </SettingsCard>

      {/* 6 · Tema ve Dil */}
      <SettingsCard title="Tema ve Dil" icon={<Shield size={16} />} theme={theme}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs mb-1" style={{ color: sub }}>Tema</label>
              <div className="flex gap-1.5">
                {(['dark', 'light'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={{
                      backgroundColor:
                        theme === t
                          ? 'rgba(37,99,235,0.25)'
                          : theme === 'dark'
                          ? 'rgba(15,23,42,0.5)'
                          : '#f8fafc',
                      borderColor: theme === t ? 'rgba(59,130,246,0.5)' : (theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(226,232,240,1)'),
                      color: theme === t ? '#60a5fa' : sub,
                    }}
                  >
                    {t === 'dark' ? 'Koyu' : 'Açık'}
                  </button>
                ))}
              </div>
            </div>
            <SelectField label="Dil" value="Türkçe" theme={theme} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <SelectField label="Tarih Formatı" value="DD/MM/YYYY" theme={theme} />
            <SelectField label="Saat Formatı" value="24 Saat" theme={theme} />
          </div>
          {/* Mini preview chart */}
          <div
            className="rounded-lg p-2 border"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(15,23,42,0.6)' : 'rgba(248,250,252,0.8)',
              borderColor: theme === 'dark' ? 'rgba(59,130,246,0.2)' : 'rgba(226,232,240,1)',
            }}
          >
            <p className="text-xs mb-1.5" style={{ color: sub }}>Önizleme</p>
            <ResponsiveContainer width="100%" height={48}>
              <LineChart data={MINI_CHART_DATA} margin={{ top: 2, right: 4, left: 4, bottom: 2 }}>
                <Line
                  key="preview-line"
                  type="monotone"
                  dataKey="v"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0d1f33' : '#ffffff',
                    borderColor: 'rgba(59,130,246,0.3)',
                    fontSize: 10,
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-end">
          <ActionButton variant="primary" theme={theme}>
            <Save size={12} /> Kaydet
          </ActionButton>
        </div>
      </SettingsCard>
    </div>
  );
}

function BildirimlerTab({ theme }: { theme: string }) {
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const [notifs, setNotifs] = useState({ kritik: true, uyari: true, raporlar: false, bakim: true, email: true, sms: false });
  const items = [
    { key: 'kritik' as const, label: 'Kritik alarmlar', desc: 'Anlık tehlike bildirimleri' },
    { key: 'uyari' as const, label: 'Uyarı alarmları', desc: 'Eşik aşımı bildirimleri' },
    { key: 'raporlar' as const, label: 'Sistem raporları', desc: 'Günlük özet raporları' },
    { key: 'bakim' as const, label: 'Bakım bildirimleri', desc: 'Periyodik bakım hatırlatmaları' },
    { key: 'email' as const, label: 'E-posta bildirimleri', desc: 'E-posta ile bildirim al' },
    { key: 'sms' as const, label: 'SMS bildirimleri', desc: 'SMS ile bildirim al' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SettingsCard title="Bildirim Kanalları" icon={<Bell size={16} />} theme={theme}>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: text }}>{item.label}</p>
                <p className="text-xs" style={{ color: sub }}>{item.desc}</p>
              </div>
              <Toggle checked={notifs[item.key]} onChange={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key] }))} />
            </div>
          ))}
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Kaydet</ActionButton></div>
      </SettingsCard>
      <SettingsCard title="Bildirim Geçmişi" icon={<Bell size={16} />} theme={theme}>
        <div className="space-y-2">
          {[{ msg: 'Biyogaz basıncı kritik seviyeye ulaştı', time: '10:24', type: 'critical' }, { msg: 'Su seviyesi düşük uyarısı', time: '09:58', type: 'warning' }, { msg: 'Günlük rapor oluşturuldu', time: '08:00', type: 'info' }].map((n, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(15,23,42,0.5)' : 'rgba(248,250,252,0.8)', border: `1px solid ${theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(226,232,240,1)'}` }}>
              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.type === 'critical' ? 'bg-red-400' : n.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: text }}>{n.msg}</p>
                <p className="text-xs" style={{ color: sub }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

function EsikTab({ theme }: { theme: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SettingsCard title="Çevre Parametreleri" icon={<Sliders size={16} />} theme={theme}>
        <div className="space-y-3">
          <InputField label="Toprak Nem Alt Limiti" value="55" unit="%" theme={theme} />
          <InputField label="Toprak Nem Üst Limiti" value="80" unit="%" theme={theme} />
          <InputField label="Sıcaklık Alt Limiti" value="18" unit="°C" theme={theme} />
          <InputField label="Sıcaklık Üst Limiti" value="30" unit="°C" theme={theme} />
          <InputField label="CO₂ Üst Limiti" value="1200" unit="ppm" theme={theme} />
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Kaydet</ActionButton></div>
      </SettingsCard>
      <SettingsCard title="Su ve Enerji Parametreleri" icon={<Sliders size={16} />} theme={theme}>
        <div className="space-y-3">
          <InputField label="Su Seviyesi Alt Limiti" value="30" unit="%" theme={theme} />
          <InputField label="pH Alt Limiti" value="6.0" theme={theme} />
          <InputField label="pH Üst Limiti" value="7.5" theme={theme} />
          <InputField label="Biyogaz Basıncı Üst Limiti" value="1.8" unit="bar" theme={theme} />
          <InputField label="Batarya Alt Limiti" value="20" unit="%" theme={theme} />
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Kaydet</ActionButton></div>
      </SettingsCard>
    </div>
  );
}

function EntegrasyonTab({ theme }: { theme: string }) {
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const integrations = [
    { label: 'Hava Durumu API', status: 'Aktif', color: '#22c55e' },
    { label: 'SMS Servisi', status: 'Aktif', color: '#22c55e' },
    { label: 'E-posta Servisi', status: 'Aktif', color: '#22c55e' },
    { label: 'SCADA Bağlantısı', status: 'Bağlı', color: '#60a5fa' },
    { label: 'FastAPI Backend', status: 'Bekleniyor', color: '#f59e0b' },
    { label: 'MQTT Broker', status: 'Bekleniyor', color: '#f59e0b' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SettingsCard title="Aktif Entegrasyonlar" icon={<Link2 size={16} />} theme={theme}>
        <div className="space-y-2.5">
          {integrations.map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi size={13} style={{ color: item.color }} />
                <span className="text-sm" style={{ color: text }}>{item.label}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full border" style={{ backgroundColor: `${item.color}18`, color: item.color, borderColor: `${item.color}40` }}>{item.status}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end"><ActionButton variant="secondary" theme={theme}><RefreshCw size={12} /> Yenile</ActionButton></div>
      </SettingsCard>
      <SettingsCard title="API Yapılandırması" icon={<Link2 size={16} />} theme={theme}>
        <div className="space-y-3">
          <InputField label="Backend URL" value="http://localhost:8000" theme={theme} />
          <InputField label="API Zaman Aşımı" value="30" unit="sn" theme={theme} />
          <InputField label="WebSocket URL" value="ws://localhost:8000/ws/realtime" theme={theme} />
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Kaydet</ActionButton></div>
      </SettingsCard>
    </div>
  );
}

function KullanicilarTab({ theme }: { theme: string }) {
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const divider = theme === 'dark' ? 'rgba(59,130,246,0.12)' : 'rgba(226,232,240,1)';
  const users = [
    { name: 'Sistem Yöneticisi', email: 'admin@ekoteknopark.com', role: 'Yönetici', status: 'Aktif' },
    { name: 'Tarım Uzmanı', email: 'tarim@ekoteknopark.com', role: 'Operatör', status: 'Aktif' },
    { name: 'Teknik Sorumlu', email: 'teknik@ekoteknopark.com', role: 'Teknisyen', status: 'Aktif' },
  ];
  return (
    <SettingsCard title="Kullanıcı Listesi" icon={<Users size={16} />} theme={theme}>
      <div className="space-y-3">
        {users.map((u, i) => (
          <div key={i}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0">
                  <User size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: text }}>{u.name}</p>
                  <p className="text-xs" style={{ color: sub }}>{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>{u.role}</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>{u.status}</span>
              </div>
            </div>
            {i < users.length - 1 && <div className="h-px" style={{ backgroundColor: divider }} />}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <ActionButton variant="primary" theme={theme}><Users size={12} /> Kullanıcı Ekle</ActionButton>
      </div>
    </SettingsCard>
  );
}

function GuvenlikTab({ theme }: { theme: string }) {
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SettingsCard title="Şifre Değiştir" icon={<Shield size={16} />} theme={theme}>
        <div className="space-y-3">
          <InputField label="Mevcut Şifre" value="" theme={theme} />
          <InputField label="Yeni Şifre" value="" theme={theme} />
          <InputField label="Yeni Şifre (Tekrar)" value="" theme={theme} />
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Güncelle</ActionButton></div>
      </SettingsCard>
      <SettingsCard title="Oturum Bilgileri" icon={<Shield size={16} />} theme={theme}>
        <div className="space-y-2.5">
          {[
            { label: 'Son Giriş', value: '14 Mayıs 2026 · 21:47' },
            { label: 'IP Adresi', value: '192.168.1.42' },
            { label: 'Tarayıcı', value: 'Chrome 124' },
            { label: 'Oturum Süresi', value: '2 saat 18 dakika' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs" style={{ color: sub }}>{row.label}</span>
              <span className="text-xs font-medium" style={{ color: text }}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end"><ActionButton variant="amber" theme={theme}><RefreshCw size={12} /> Oturumu Sonlandır</ActionButton></div>
      </SettingsCard>
    </div>
  );
}

function YedeklemeTab({ theme }: { theme: string }) {
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const backups = [
    { name: 'Günlük Yedek', date: '14 Mayıs 2026 · 02:00', size: '4.2 MB', status: 'Başarılı' },
    { name: 'Haftalık Yedek', date: '11 Mayıs 2026 · 02:00', size: '18.7 MB', status: 'Başarılı' },
    { name: 'Aylık Yedek', date: '01 Mayıs 2026 · 02:00', size: '76.3 MB', status: 'Başarılı' },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SettingsCard title="Yedekleme Durumu" icon={<HardDrive size={16} />} theme={theme}>
        <div className="space-y-3">
          {backups.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(15,23,42,0.5)' : 'rgba(248,250,252,0.8)', border: `1px solid ${theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(226,232,240,1)'}` }}>
              <div>
                <p className="text-sm font-medium" style={{ color: text }}>{b.name}</p>
                <p className="text-xs" style={{ color: sub }}>{b.date} · {b.size}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>{b.status}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><HardDrive size={12} /> Şimdi Yedekle</ActionButton></div>
      </SettingsCard>
      <SettingsCard title="Yedekleme Ayarları" icon={<HardDrive size={16} />} theme={theme}>
        <div className="space-y-3">
          <SelectField label="Günlük Yedekleme Zamanı" value="02:00" theme={theme} />
          <SelectField label="Saklama Süresi" value="30 gün" theme={theme} />
          <InputField label="Yedekleme Konumu" value="/opt/ekoteknopark/backups" theme={theme} />
        </div>
        <div className="flex justify-end"><ActionButton variant="primary" theme={theme}><Save size={12} /> Kaydet</ActionButton></div>
      </SettingsCard>
    </div>
  );
}

/* ─── Tab definitions ────────────────────────────────────────── */

const TABS = [
  { id: 'genel',       label: 'Genel',         icon: <User size={14} /> },
  { id: 'bildirimler', label: 'Bildirimler',    icon: <Bell size={14} /> },
  { id: 'esik',        label: 'Eşik Değerler',  icon: <Sliders size={14} /> },
  { id: 'entegrasyon', label: 'Entegrasyonlar', icon: <Link2 size={14} /> },
  { id: 'kullanicilar',label: 'Kullanıcılar',   icon: <Users size={14} /> },
  { id: 'guvenlik',    label: 'Güvenlik',       icon: <Shield size={14} /> },
  { id: 'yedekleme',   label: 'Yedekleme',      icon: <HardDrive size={14} /> },
] as const;

type TabId = (typeof TABS)[number]['id'];

/* ─── Page ──────────────────────────────────────────────────── */

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('genel');

  const bg = theme === 'dark' ? '#0a0f1a' : '#f8fafc';
  const tabBarBg = theme === 'dark' ? '#0d1f33' : '#ffffff';
  const tabBarBorder = theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: bg }}>
      <Header title="Ayarlar" />

      <main className="px-4 md:px-6 pb-8">
        {/* Sub-heading */}
        <div className="mb-4 -mt-2">
          <p className="text-sm" style={{ color: sub }}>Sistem arayüzü ve kullanıcı ayarlarını yönetin.</p>
        </div>

        {/* Tab bar */}
        <div
          className="rounded-xl border mb-4 p-1 flex flex-wrap gap-1 overflow-x-auto"
          style={{ backgroundColor: tabBarBg, borderColor: tabBarBorder }}
        >
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: active
                    ? 'rgba(37,99,235,0.25)'
                    : 'transparent',
                  color: active ? '#60a5fa' : sub,
                  border: active ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === 'genel'        && <Genel theme={theme} setTheme={setTheme} />}
        {activeTab === 'bildirimler'   && <BildirimlerTab theme={theme} />}
        {activeTab === 'esik'          && <EsikTab theme={theme} />}
        {activeTab === 'entegrasyon'   && <EntegrasyonTab theme={theme} />}
        {activeTab === 'kullanicilar'  && <KullanicilarTab theme={theme} />}
        {activeTab === 'guvenlik'      && <GuvenlikTab theme={theme} />}
        {activeTab === 'yedekleme'     && <YedeklemeTab theme={theme} />}
      </main>
    </div>
  );
}
