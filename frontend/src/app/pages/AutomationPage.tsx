import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/Header';
import {
  Droplets, Wind, Sun, Waves, Flame, Settings2,
  AlertTriangle, Clock, ChevronRight,
} from 'lucide-react';

type StatusType = 'normal' | 'warning' | 'critical';

const STATUS_STYLE: Record<StatusType, { bg: string; text: string; border: string; label: string }> = {
  normal:   { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)',  label: 'Normal' },
  warning:  { bg: 'rgba(234,179,8,0.15)',  text: '#eab308', border: 'rgba(234,179,8,0.3)',  label: 'Uyarı' },
  critical: { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)',  label: 'Kritik' },
};

interface DeviceCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOn: boolean;
  metricLabel: string;
  metricValue: string;
  statusType: StatusType;
  durum: string;
}

interface DeviceControlCardProps {
  card: DeviceCard;
  theme: string;
  onToggle: (id: string, on: boolean) => void;
}

function DeviceControlCard({ card, theme, onToggle }: DeviceControlCardProps) {
  const bg = theme === 'dark' ? '#0d1f33' : '#ffffff';
  const border = theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';
  const sc = STATUS_STYLE[card.statusType];

  return (
    <div className="rounded-xl p-4 border flex flex-col gap-3" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
            {card.icon}
          </div>
          <span className="text-sm font-semibold leading-tight" style={{ color: text }}>{card.title}</span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full border shrink-0 ml-2"
          style={{ backgroundColor: sc.bg, color: sc.text, borderColor: sc.border }}
        >
          {sc.label}
        </span>
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full shrink-0 ${card.isOn ? 'bg-green-400' : 'bg-gray-500'}`} />
          <span className="text-xs" style={{ color: sub }}>
            Durum:{' '}
            <span style={{ color: card.isOn ? '#4ade80' : (theme === 'dark' ? '#6b7280' : '#94a3b8') }}>
              {card.durum}
            </span>
          </span>
        </div>
        <p className="text-sm font-medium pl-3.5" style={{ color: sub }}>
          {card.metricLabel}:{' '}
          <span className="font-semibold" style={{ color: text }}>{card.metricValue}</span>
        </p>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onToggle(card.id, true)}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            backgroundColor: card.isOn ? '#2563eb' : 'rgba(37,99,235,0.15)',
            color: card.isOn ? '#ffffff' : '#60a5fa',
            border: `1px solid ${card.isOn ? '#2563eb' : 'rgba(59,130,246,0.3)'}`,
          }}
        >
          Aç
        </button>
        <button
          onClick={() => onToggle(card.id, false)}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            backgroundColor: !card.isOn
              ? (theme === 'dark' ? 'rgba(100,116,139,0.4)' : 'rgba(100,116,139,0.2)')
              : (theme === 'dark' ? 'rgba(55,65,81,0.3)' : 'rgba(226,232,240,0.8)'),
            color: !card.isOn
              ? (theme === 'dark' ? '#f1f5f9' : '#1e293b')
              : (theme === 'dark' ? '#4b5563' : '#94a3b8'),
            border: `1px solid ${!card.isOn
              ? 'rgba(100,116,139,0.4)'
              : (theme === 'dark' ? 'rgba(55,65,81,0.3)' : 'rgba(226,232,240,1)')}`,
          }}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

interface ModeControlCardProps {
  autoMode: boolean;
  manualMode: boolean;
  onToggleAuto: () => void;
  onToggleManual: () => void;
  theme: string;
}

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

function ModeControlCard({ autoMode, manualMode, onToggleAuto, onToggleManual, theme }: ModeControlCardProps) {
  const bg = theme === 'dark' ? '#0d1f33' : '#ffffff';
  const border = theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';

  return (
    <div className="rounded-xl p-4 border flex flex-col gap-3" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
          <Settings2 size={18} />
        </div>
        <span className="text-sm font-semibold" style={{ color: text }}>Kontrol Modu</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: text }}>Otomatik Mod</p>
            <p className="text-xs" style={{ color: sub }}>Sistem sensör verilerine göre çalışır</p>
          </div>
          <Toggle checked={autoMode} onChange={onToggleAuto} />
        </div>
        <div className="h-px" style={{ backgroundColor: theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(226,232,240,1)' }} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: text }}>Manuel Mod</p>
            <p className="text-xs" style={{ color: sub }}>Cihazları doğrudan kontrol edin</p>
          </div>
          <Toggle checked={manualMode} onChange={onToggleManual} />
        </div>
      </div>
    </div>
  );
}

const INITIAL_DEVICES: DeviceCard[] = [
  {
    id: 'sulama',
    title: 'Sulama Sistemi',
    icon: <Droplets size={18} />,
    isOn: true,
    metricLabel: 'Nem',
    metricValue: '%62',
    statusType: 'normal',
    durum: 'Açık',
  },
  {
    id: 'fan',
    title: 'Fan Sistemi',
    icon: <Wind size={18} />,
    isOn: false,
    metricLabel: 'Hız',
    metricValue: '%40',
    statusType: 'warning',
    durum: 'Kapalı',
  },
  {
    id: 'aydinlatma',
    title: 'Aydınlatma Sistemi',
    icon: <Sun size={18} />,
    isOn: true,
    metricLabel: 'Yoğunluk',
    metricValue: '%70',
    statusType: 'normal',
    durum: 'Açık',
  },
  {
    id: 'su-pompasi',
    title: 'Su Pompası',
    icon: <Waves size={18} />,
    isOn: true,
    metricLabel: 'Debi',
    metricValue: '12 L/dk',
    statusType: 'normal',
    durum: 'Açık',
  },
  {
    id: 'biyogaz',
    title: 'Biyogaz Sistemi',
    icon: <Flame size={18} />,
    isOn: true,
    metricLabel: 'Basınç',
    metricValue: '1.6 bar',
    statusType: 'critical',
    durum: 'Uyarı',
  },
];

const ALARMS = [
  {
    id: 'a1',
    title: 'Biyogaz basıncı yüksek',
    source: 'Biyogaz Sistemi',
    time: '10:24',
    type: 'critical' as StatusType,
  },
  {
    id: 'a2',
    title: 'Su seviyesi düşük',
    source: 'Su Geri Kazanım',
    time: '09:58',
    type: 'warning' as StatusType,
  },
  {
    id: 'a3',
    title: 'pH değeri sınırda',
    source: 'Su Geri Kazanım',
    time: '09:41',
    type: 'warning' as StatusType,
  },
];

const COMMANDS = [
  { id: 'c1', time: '13:10', text: 'Sulama sistemi açıldı', actor: 'Kullanıcı', actorType: 'user' },
  { id: 'c2', time: '12:45', text: 'Fan sistemi kapatıldı', actor: 'Otomatik', actorType: 'auto' },
  { id: 'c3', time: '12:30', text: 'Aydınlatma sistemi açıldı', actor: 'Kullanıcı', actorType: 'user' },
  { id: 'c4', time: '12:15', text: 'Su pompası hızı artırıldı', actor: 'Otomatik', actorType: 'auto' },
  { id: 'c5', time: '11:50', text: 'Biyogaz sistemi uyarı moduna geçti', actor: 'Sistem', actorType: 'system' },
];

export function AutomationPage() {
  const { theme } = useTheme();
  const [devices, setDevices] = useState<DeviceCard[]>(INITIAL_DEVICES);
  const [autoMode, setAutoMode] = useState(true);
  const [manualMode, setManualMode] = useState(false);

  const bg = theme === 'dark' ? '#0a0f1a' : '#f8fafc';
  const cardBg = theme === 'dark' ? '#0d1f33' : '#ffffff';
  const cardBorder = theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)';
  const text = theme === 'dark' ? '#ffffff' : '#1e293b';
  const sub = theme === 'dark' ? '#9ca3af' : '#64748b';

  function handleToggle(id: string, on: boolean) {
    setDevices(prev =>
      prev.map(d => d.id === id ? { ...d, isOn: on, durum: on ? 'Açık' : 'Kapalı' } : d)
    );
  }

  return (
    <div className="flex-1 overflow-auto" style={{ backgroundColor: bg }}>
      <Header title="Otomasyon ve Kontrol" />

      <main className="px-4 md:px-6 pb-8">
        <div className="mb-4 -mt-2">
          <p className="text-sm" style={{ color: sub }}>Sistem bileşenlerinin kontrol paneli</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {devices.map(card => (
            <DeviceControlCard
              key={card.id}
              card={card}
              theme={theme}
              onToggle={handleToggle}
            />
          ))}
          <ModeControlCard
            autoMode={autoMode}
            manualMode={manualMode}
            onToggleAuto={() => setAutoMode(v => !v)}
            onToggleManual={() => setManualMode(v => !v)}
            theme={theme}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Kritik Alarmlar */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-red-400" />
              <h3 className="text-sm font-semibold" style={{ color: text }}>Aktif Alarmlar</h3>
            </div>
            <div className="space-y-3">
              {ALARMS.map(alarm => {
                const sc = STATUS_STYLE[alarm.type];
                return (
                  <div
                    key={alarm.id}
                    className="flex items-start justify-between gap-3 rounded-lg p-3"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(15,23,42,0.6)' : 'rgba(248,250,252,0.8)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(226,232,240,1)'}`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: text }}>{alarm.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: sub }}>
                        {alarm.source} · {alarm.time}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border shrink-0"
                      style={{ backgroundColor: sc.bg, color: sc.text, borderColor: sc.border }}
                    >
                      {sc.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              className="mt-4 flex items-center gap-1 text-xs transition-colors hover:opacity-80"
              style={{ color: '#60a5fa' }}
            >
              Tüm alarmları görüntüle <ChevronRight size={13} />
            </button>
          </div>

          {/* Son Komutlar */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-blue-400" />
              <h3 className="text-sm font-semibold" style={{ color: text }}>Son Komutlar</h3>
            </div>
            <div className="space-y-2.5">
              {COMMANDS.map(cmd => {
                const actorColor =
                  cmd.actorType === 'user' ? '#60a5fa' :
                  cmd.actorType === 'auto' ? '#34d399' : '#a78bfa';
                return (
                  <div key={cmd.id} className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono shrink-0 w-10 text-right"
                      style={{ color: sub }}
                    >
                      {cmd.time}
                    </span>
                    <div
                      className="w-px h-4 shrink-0"
                      style={{ backgroundColor: theme === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(226,232,240,1)' }}
                    />
                    <p className="text-xs flex-1 min-w-0" style={{ color: theme === 'dark' ? '#d1d5db' : '#475569' }}>
                      {cmd.text}
                    </p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded shrink-0"
                      style={{
                        backgroundColor: `${actorColor}18`,
                        color: actorColor,
                        border: `1px solid ${actorColor}30`,
                      }}
                    >
                      {cmd.actor}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              className="mt-4 flex items-center gap-1 text-xs transition-colors hover:opacity-80"
              style={{ color: '#60a5fa' }}
            >
              Komut geçmişi <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
