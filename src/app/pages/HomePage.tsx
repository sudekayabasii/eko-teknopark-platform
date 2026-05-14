import { Header } from '../components/Header';
import { KPICard } from '../components/KPICard';
import { SystemCard } from '../components/SystemCard';
import { MiniChart } from '../components/MiniChart';
import { AlertTriangle, Zap, Droplet, Activity, Leaf, Recycle, Factory, Truck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function HomePage() {
  const { theme } = useTheme();

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: theme === 'dark' ? '#0a0f1a' : '#f8fafc' }}
    >
      <Header title="Ana Sayfa" />

      <main className="px-4 md:px-6 pb-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <KPICard
            title="Aktif Alarm Sayısı"
            value="4"
            icon={<AlertTriangle size={18} />}
            iconBgColor="bg-red-500/20"
          />
          <KPICard
            title="Günlük Enerji Üretimi"
            value="18 kWh"
            indicator="↑ 12%"
            icon={<Zap size={18} className="text-yellow-400" />}
            iconBgColor="bg-yellow-500/20"
          />
          <KPICard
            title="Su Geri Kazanım Oranı"
            value="74%"
            indicator="↑ 8%"
            icon={<Droplet size={18} className="text-blue-400" />}
            iconBgColor="bg-blue-500/20"
          />
          <KPICard
            title="Sistem Sağlığı"
            value="87%"
            icon={<Activity size={18} className="text-green-400" />}
            iconBgColor="bg-green-500/20"
          />
        </div>

        {/* System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <SystemCard
            title="Dikey Tarım"
            icon={<Leaf size={18} />}
            status="Normal"
            metrics={[
              { label: 'Sıcaklık', value: '24°C' },
              { label: 'Nem', value: '%62' },
              { label: 'CO₂', value: '520 ppm' },
            ]}
          />

          <SystemCard
            title="Su Geri Kazanım"
            icon={<Droplet size={18} />}
            status="Uyarı"
            metrics={[
              { label: 'pH', value: '6.8' },
              { label: 'Su Seviyesi', value: '%74' },
              { label: 'Debi', value: '12 L/dk' },
            ]}
          />

          <SystemCard
            title="Biyogaz"
            icon={<Factory size={18} />}
            status="Kritik"
            metrics={[
              { label: 'Gaz Basıncı', value: '1.6 bar' },
              { label: 'Metan Oranı', value: '%58' },
              { label: 'Üretim Hızı', value: '12.5 m³/gün' },
            ]}
          />

          <SystemCard
            title="Atık Yönetimi"
            icon={<Recycle size={18} />}
            status="Normal"
            metrics={[
              { label: 'Günlük İşlem', value: '145 kg' },
              { label: 'Geri Dönüşüm', value: '%68' },
              { label: 'Depolama', value: '%42' },
            ]}
          />

          <SystemCard
            title="Enerji Yönetimi"
            icon={<Zap size={18} />}
            status="Normal"
            metrics={[
              { label: 'Üretim', value: '18 kWh' },
              { label: 'Tüketim', value: '22 kWh' },
              { label: 'Batarya', value: '%85' },
            ]}
          />

          <SystemCard
            title="Taşıma Sistemi"
            icon={<Truck size={18} />}
            status="Normal"
            metrics={[
              { label: 'Aktif Hat', value: '3/4' },
              { label: 'Ortalama Hız', value: '0.8 m/s' },
              { label: 'Yük', value: '%67' },
            ]}
          />
        </div>

        {/* Mini Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <MiniChart
            title="Sıcaklık"
            value="24°C"
            data={[22, 23, 24, 23, 24, 25, 24, 23]}
            color="#3b82f6"
          />
          <MiniChart
            title="Nem"
            value="%62"
            data={[60, 62, 61, 63, 62, 64, 62, 61]}
            color="#3b82f6"
          />
          <MiniChart
            title="Enerji Dengesi"
            value="10 kWh"
            data={[15, 17, 16, 18, 19, 17, 18, 16]}
            color="#f97316"
          />
          <MiniChart
            title="Su Kullanımı"
            value="%74"
            data={[70, 72, 74, 73, 75, 74, 74, 73]}
            color="#3b82f6"
          />
        </div>
      </main>
    </div>
  );
}
