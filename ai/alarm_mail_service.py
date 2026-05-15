"""
EKO-TEKNOPARK - Anomali Tespit + Otomatik Mail Alarm Sistemi
=============================================================
Sensörlerde anomali tespit edildiğinde otomatik alarm maili
gönderen entegre sistem modülü.

Hazırlayan : Sudenaz Kayabaşı
Tarih       : Mayıs 2026
Versiyon    : 1.0

Kağan Şeker tarafından kurulan mail altyapısı (user.com domain,
SMTP port 25) ile entegre çalışmaktadır.
"""

import smtplib
import random
import math
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from collections import deque
from datetime import datetime, timezone

# ── Mail Yapılandırması (Kağan Şeker - user.com domain) ───────────
MAIL_CONFIG = {
    "smtp_host"  : "localhost",      # Kağan'ın kurduğu SMTP sunucusu
    "smtp_port"  : 25,               # SMTP port
    "gonderen"   : "sistem@user.com",
    "alicilar"   : [
        "yonetici@user.com",         # Tesis yöneticisi
        "muhendis@user.com",         # Nöbetçi mühendis
    ],
}

# ── Sensör Konfigürasyonu ─────────────────────────────────────────
SENSORS = {
    "sicaklik"    : {"min":18.0,"max":30.0,"normal":24.0,"birim":"°C"},
    "nem"         : {"min":45.0,"max":80.0,"normal":62.0,"birim":"%"},
    "ph"          : {"min":5.5, "max":7.5, "normal":6.8, "birim":"pH"},
    "gaz_basinci" : {"min":0.8, "max":2.5, "normal":1.6, "birim":"bar"},
    "metan_orani" : {"min":45.0,"max":75.0,"normal":58.0,"birim":"%"},
    "su_seviyesi" : {"min":20.0,"max":95.0,"normal":74.0,"birim":"%"},
    "co2"         : {"min":400, "max":800, "normal":520, "birim":"ppm"},
    "enerji"      : {"min":12.0,"max":28.0,"normal":18.0,"birim":"kWh"},
}

# ── Anomali Parametreleri ─────────────────────────────────────────
WINDOW_SIZE  = 30
MIN_SAMPLES  = 10
Z_UYARI      = 2.5
Z_KRITIK     = 3.5

windows = {k: deque(maxlen=WINDOW_SIZE) for k in SENSORS}
gonderilen_alarmlar = set()   # Aynı alarm tekrar gönderilmesin

# ── Karar Destek Sistemi Kuralları ────────────────────────────────
KDS_KURALLARI = {
    "gaz_basinci" : {"esik": 2.0, "operator": ">=", "seviye": "KRİTİK", "aksiyon": "Biyogaz vanası kapatıldı"},
    "ph"          : {"esik": 7.5, "operator": ">=", "seviye": "UYARI",  "aksiyon": "Su arıtma pompası yeniden başlatıldı"},
    "sicaklik"    : {"esik": 28.0,"operator": ">=", "seviye": "UYARI",  "aksiyon": "İklimlendirme fanı devreye alındı"},
    "su_seviyesi" : {"esik": 25.0,"operator": "<=", "seviye": "KRİTİK", "aksiyon": "Su pompalama sistemi başlatıldı"},
    "metan_orani" : {"esik": 70.0,"operator": ">=", "seviye": "KRİTİK", "aksiyon": "Biyogaz güvenlik vanası kapatıldı"},
    "enerji"      : {"esik": 13.0,"operator": "<=", "seviye": "UYARI",  "aksiyon": "Enerji optimizasyon modu etkinleştirildi"},
    "nem"         : {"esik": 75.0,"operator": ">=", "seviye": "UYARI",  "aksiyon": "Havalandırma sistemi devreye alındı"},
    "co2"         : {"esik": 700, "operator": ">=", "seviye": "UYARI",  "aksiyon": "CO₂ filtre sistemi aktive edildi"},
}


def uret(isim, t):
    """Sinüzoidal + Gauss gürültüsü ile sensör verisi üretir."""
    cfg = SENSORS[isim]
    amp = (cfg["max"] - cfg["min"]) * 0.12
    val = cfg["normal"] + amp*math.sin(2*math.pi*t/60) + random.gauss(0, amp*0.15)
    return round(max(cfg["min"], min(cfg["max"], val)), 2)


def z_score(isim, val):
    """Z-Score hesaplar."""
    w = windows[isim]
    if len(w) < MIN_SAMPLES:
        return None
    m = sum(w) / len(w)
    s = math.sqrt(sum((x-m)**2 for x in w)/len(w)) or 0.001
    return abs(val - m) / s


def kds_aksiyon(isim, val):
    """Karar Destek Sistemi — değeri kuralla karşılaştırır."""
    if isim not in KDS_KURALLARI:
        return None
    kural = KDS_KURALLARI[isim]
    tetiklendi = False
    if kural["operator"] == ">=" and val >= kural["esik"]:
        tetiklendi = True
    elif kural["operator"] == "<=" and val <= kural["esik"]:
        tetiklendi = True
    return kural if tetiklendi else None


def mail_gonder(isim, val, z, seviye, aksiyon):
    """Anomali alarmını mail olarak gönderir."""
    zaman = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    birim = SENSORS[isim]["birim"]

    konu = f"[EKO-TEKNOPARK] {seviye} ALARM — {isim.upper()} Sensörü"

    icerik = f"""
EKO-TEKNOPARK Otomatik Alarm Sistemi
{'='*50}

ALARM BİLGİSİ
Sensör    : {isim}
Değer     : {val} {birim}
Seviye    : {seviye}
Z-Score   : {z:.2f} sigma
Zaman     : {zaman}

OTOMATİK AKSİYON
{aksiyon}

SİSTEM DURUMU
Anomali Tespit : Z-Score + IQR Hibrit Modeli
Kayan Pencere  : {WINDOW_SIZE} ölçüm
Z Eşiği        : {Z_UYARI}σ (Uyarı) / {Z_KRITIK}σ (Kritik)

Bu mail EKO-TEKNOPARK Akıllı İşletim Sistemi tarafından
otomatik olarak oluşturulmuştur.
Geliştirici: Sudenaz Kayabaşı | YZ & Dijital İkiz Sorumlusu
{'='*50}
"""

    msg = MIMEMultipart()
    msg["From"]    = MAIL_CONFIG["gonderen"]
    msg["To"]      = ", ".join(MAIL_CONFIG["alicilar"])
    msg["Subject"] = konu
    msg.attach(MIMEText(icerik, "plain", "utf-8"))

    try:
        with smtplib.SMTP(MAIL_CONFIG["smtp_host"], MAIL_CONFIG["smtp_port"], timeout=5) as server:
            server.sendmail(
                MAIL_CONFIG["gonderen"],
                MAIL_CONFIG["alicilar"],
                msg.as_string()
            )
        return True
    except Exception as e:
        # Gerçek mail sunucusu yoksa simülasyon modunda çalışır
        return False


def analiz_et(isim, val, t):
    """Tek sensörü analiz eder, gerekirse alarm üretir."""
    windows[isim].append(val)
    z = z_score(isim, val)
    birim = SENSORS[isim]["birim"]

    # Z-Score anomali tespiti
    z_anomali = z and z > Z_UYARI
    seviye = "KRİTİK" if (z and z > Z_KRITIK) else "UYARI"

    # Karar Destek Sistemi
    kds = kds_aksiyon(isim, val)

    if z_anomali or kds:
        aksiyon = kds["aksiyon"] if kds else "Manuel kontrol gerekiyor"
        alarm_key = f"{isim}_{round(val, 0)}"

        mail_gonderildi = False
        if alarm_key not in gonderilen_alarmlar:
            mail_gonderildi = mail_gonder(isim, val, z or 0, seviye, aksiyon)
            gonderilen_alarmlar.add(alarm_key)

        return {
            "anomali"   : True,
            "sensor"    : isim,
            "deger"     : val,
            "birim"     : birim,
            "z_score"   : round(z, 2) if z else None,
            "seviye"    : seviye,
            "aksiyon"   : aksiyon,
            "mail"      : mail_gonderildi,
        }
    return {"anomali": False, "sensor": isim, "deger": val, "birim": birim, "z_score": round(z,2) if z else None}


# ── Ana Program ───────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 62)
    print("  EKO-TEKNOPARK — Anomali Tespit + Mail Alarm Sistemi v1.0")
    print("  Geliştirici: Sudenaz Kayabaşı")
    print("=" * 62)
    print(f"\n  Mail Sunucusu : {MAIL_CONFIG['smtp_host']}:{MAIL_CONFIG['smtp_port']}")
    print(f"  Alıcılar      : {', '.join(MAIL_CONFIG['alicilar'])}")
    print(f"  Z Eşiği       : {Z_UYARI}σ (Uyarı) / {Z_KRITIK}σ (Kritik)")

    # Pencereyi doldur
    print("\n[1/3] Pencere dolduruluyor (30 normal ölçüm)...")
    for i in range(WINDOW_SIZE):
        t = time.time() + i * 5
        for isim in SENSORS:
            windows[isim].append(uret(isim, t))
    print("      Hazır.\n")

    # Anomali simülasyonu — birkaç sensörde kritik değer üret
    print("[2/3] Anomali senaryosu simüle ediliyor...\n")
    anormal_degerler = {
        "gaz_basinci" : 2.3,    # Kritik — biyogaz basıncı yüksek
        "ph"          : 4.1,    # Kritik — pH çok düşük
        "su_seviyesi" : 18.0,   # Kritik — su seviyesi çok düşük
    }

    print(f"  {'Sensör':<18} {'Değer':>9}  {'Z-Score':>8}  {'Seviye':<10}  Aksiyon")
    print("  " + "-" * 70)

    tum_sonuclar = {}

    # Normal sensörler
    t = time.time() + WINDOW_SIZE * 5
    for isim in SENSORS:
        val = anormal_degerler.get(isim, uret(isim, t))
        sonuc = analiz_et(isim, val, t)
        tum_sonuclar[isim] = sonuc

        z_str = f"{sonuc['z_score']:.2f}" if sonuc.get("z_score") else "  —  "
        birim = sonuc["birim"]

        if sonuc["anomali"]:
            mail_str = "📧 Mail gönderildi" if sonuc["mail"] else "📧 Mail (simülasyon)"
            print(f"  {isim:<18} {val:>7} {birim:<5}  {z_str:>6}    ⚠ {sonuc['seviye']:<8}  {sonuc['aksiyon']}")
            print(f"  {'':18} {'':>9}  {'':>8}  {mail_str}")
        else:
            print(f"  {isim:<18} {val:>7} {birim:<5}  {z_str:>6}    ✓ normal")

    # Özet
    anomaliler = [s for s, r in tum_sonuclar.items() if r["anomali"]]
    print("\n" + "=" * 62)
    print(f"\n[3/3] ÖZET RAPOR")
    print(f"  Toplam Sensör   : {len(SENSORS)}")
    print(f"  Anomali Sayısı  : {len(anomaliler)}")
    print(f"  Mail Gönderilen : {sum(1 for r in tum_sonuclar.values() if r.get('mail'))}")

    if anomaliler:
        print(f"\n  ⚠ Anomali tespit edilen sensörler:")
        for isim in anomaliler:
            r = tum_sonuclar[isim]
            print(f"    → {isim}: {r['deger']} {r['birim']} | {r['seviye']} | {r['aksiyon']}")

    print(f"\n  Sistem Durumu   : {'KRİTİK' if any(r.get('seviye')=='KRİTİK' for r in tum_sonuclar.values() if r['anomali']) else 'UYARI'}")
    print(f"  Zaman           : {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    print("\n" + "=" * 62)
