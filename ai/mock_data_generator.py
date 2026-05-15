"""
EKO-TEKNOPARK - Mock Data Generator
====================================
Gerçek IoT sensörleri entegre edilene kadar
sistemin yazılım geliştirme sürecini aksatmamak
amacıyla matematiksel model tabanlı sahte sensör
verisi üreten modül.

Hazırlayan : [Adın Soyadın]
Tarih       : Nisan 2025
Versiyon    : 1.0
"""

import random
import math
import time
from datetime import datetime, timezone
from typing import Dict


# ── Sensör Konfigürasyonu ──────────────────────────────────────────
# Her sensörün gerçekçi değer aralığı ve güncelleme frekansı

SENSOR_CONFIG = {
    "sicaklik": {
        "birim"      : "°C",
        "min"        : 18.0,
        "max"        : 30.0,
        "normal"     : 24.0,
        "aciklama"   : "Dikey tarım alanı ortam sıcaklığı",
    },
    "nem": {
        "birim"      : "%",
        "min"        : 45.0,
        "max"        : 80.0,
        "normal"     : 62.0,
        "aciklama"   : "Dikey tarım alanı nem oranı",
    },
    "ph": {
        "birim"      : "pH",
        "min"        : 5.5,
        "max"        : 7.5,
        "normal"     : 6.8,
        "aciklama"   : "Su geri kazanım sistemi pH değeri",
    },
    "gaz_basinci": {
        "birim"      : "bar",
        "min"        : 0.8,
        "max"        : 2.5,
        "normal"     : 1.6,
        "aciklama"   : "Biyogaz tankı gaz basıncı",
    },
    "metan_orani": {
        "birim"      : "%",
        "min"        : 45.0,
        "max"        : 75.0,
        "normal"     : 58.0,
        "aciklama"   : "Biyogaz bileşimindeki metan yüzdesi",
    },
    "su_seviyesi": {
        "birim"      : "%",
        "min"        : 20.0,
        "max"        : 95.0,
        "normal"     : 74.0,
        "aciklama"   : "Su geri kazanım tankı doluluk oranı",
    },
    "co2": {
        "birim"      : "ppm",
        "min"        : 400.0,
        "max"        : 800.0,
        "normal"     : 520.0,
        "aciklama"   : "Dikey tarım alanı CO₂ konsantrasyonu",
    },
    "enerji_uretim": {
        "birim"      : "kWh",
        "min"        : 12.0,
        "max"        : 28.0,
        "normal"     : 18.0,
        "aciklama"   : "Günlük enerji üretimi",
    },
}

# ── Eşik Değerleri (Alarm Sistemi) ────────────────────────────────
# Kimya ve Makine Mühendisliği ekiplerinden kesin değerler
# alınana kadar literatür tabanlı geçici eşik değerleri kullanılmaktadır.

THRESHOLD_CONFIG = {
    "sicaklik"    : {"uyari_ust": 28.0, "kritik_ust": 30.0, "uyari_alt": 19.0, "kritik_alt": 18.0},
    "nem"         : {"uyari_ust": 75.0, "kritik_ust": 80.0, "uyari_alt": 50.0, "kritik_alt": 45.0},
    "ph"          : {"uyari_ust":  7.2, "kritik_ust":  7.5, "uyari_alt":  6.0, "kritik_alt":  5.5},
    "gaz_basinci" : {"uyari_ust":  2.0, "kritik_ust":  2.5, "uyari_alt":  1.0, "kritik_alt":  0.8},
    "metan_orani" : {"uyari_ust": 70.0, "kritik_ust": 75.0, "uyari_alt": 50.0, "kritik_alt": 45.0},
    "su_seviyesi" : {"uyari_ust": 90.0, "kritik_ust": 95.0, "uyari_alt": 25.0, "kritik_alt": 20.0},
    "co2"         : {"uyari_ust": 700.0,"kritik_ust": 800.0,"uyari_alt": 420.0,"kritik_alt": 400.0},
    "enerji_uretim": {"uyari_alt": 13.0, "kritik_alt": 12.0, "uyari_ust": 26.0, "kritik_ust": 28.0},
}


def _sinusoidal_drift(normal: float, amplitude: float, t: float, period: float = 60.0) -> float:
    """
    Gerçek sensörlerin zamanla gösterdiği doğal dalgalanmayı taklit etmek için
    sinüzoidal sinyal + küçük beyaz gürültü kullanır.
    """
    drift    = amplitude * math.sin(2 * math.pi * t / period)
    noise    = random.gauss(0, amplitude * 0.15)
    return normal + drift + noise


def _get_alarm_status(sensor_name: str, value: float) -> str:
    """Değeri eşik tablosuyla karşılaştırarak alarm durumu döndürür."""
    if sensor_name not in THRESHOLD_CONFIG:
        return "normal"
    th = THRESHOLD_CONFIG[sensor_name]
    if value >= th.get("kritik_ust", float("inf")) or value <= th.get("kritik_alt", float("-inf")):
        return "kritik"
    if value >= th.get("uyari_ust", float("inf")) or value <= th.get("uyari_alt", float("-inf")):
        return "uyari"
    return "normal"


def generate_sensor_reading(sensor_name: str, t: float = None) -> Dict:
    """
    Tek bir sensör için anlık okuma üretir.

    Parametreler
    ------------
    sensor_name : SENSOR_CONFIG anahtarlarından biri
    t           : Zaman damgası (saniye). None ise sistem zamanı kullanılır.

    Dönüş Değeri
    ------------
    {sensor, deger, birim, durum, zaman_damgasi}
    """
    if sensor_name not in SENSOR_CONFIG:
        raise ValueError(f"Bilinmeyen sensör: {sensor_name}")

    if t is None:
        t = time.time()

    cfg       = SENSOR_CONFIG[sensor_name]
    amplitude = (cfg["max"] - cfg["min"]) * 0.12   # Genliği aralığın %12'si
    raw       = _sinusoidal_drift(cfg["normal"], amplitude, t)
    value     = round(max(cfg["min"], min(cfg["max"], raw)), 2)
    durum     = _get_alarm_status(sensor_name, value)

    return {
        "sensor"        : sensor_name,
        "deger"         : value,
        "birim"         : cfg["birim"],
        "durum"         : durum,          # "normal" | "uyari" | "kritik"
        "aciklama"      : cfg["aciklama"],
        "zaman_damgasi" : datetime.now(timezone.utc).isoformat().replace("+00:00","Z"),
    }


def generate_all_sensors(t: float = None) -> Dict:
    """
    Tüm sensörler için aynı anda anlık okuma üretir.
    Dashboard'un /api/sensors endpoint'ine döndürülecek veri yapısıdır.
    """
    if t is None:
        t = time.time()

    readings = {name: generate_sensor_reading(name, t) for name in SENSOR_CONFIG}

    # Sistem geneli özet
    alarm_sayisi = sum(1 for r in readings.values() if r["durum"] != "normal")
    kritik_sayisi = sum(1 for r in readings.values() if r["durum"] == "kritik")

    return {
        "zaman_damgasi" : datetime.now(timezone.utc).isoformat().replace("+00:00","Z"),
        "sistem_durumu" : "kritik" if kritik_sayisi > 0 else ("uyari" if alarm_sayisi > 0 else "normal"),
        "aktif_alarm"   : alarm_sayisi,
        "sensörler"     : readings,
    }


# ── FastAPI Entegrasyonu ───────────────────────────────────────────
# Aşağıdaki kod mevcut FastAPI projesine kopyalanarak kullanılabilir.

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware

    app = FastAPI(
        title       = "EKO-TEKNOPARK API",
        description = "Kapalı Döngü Kentsel Tarım ve Geri Dönüşüm Tesisi — Akıllı İzleme Sistemi",
        version     = "0.2.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins  = ["*"],   # Geliştirme ortamı — prodüksiyon için kısıtlanacak
        allow_methods  = ["GET"],
        allow_headers  = ["*"],
    )

    @app.get("/api/sensors", summary="Tüm sensörlerin anlık okuması")
    def get_all_sensors():
        return generate_all_sensors()

    @app.get("/api/sensors/{sensor_name}", summary="Tek sensör okuması")
    def get_sensor(sensor_name: str):
        return generate_sensor_reading(sensor_name)

    @app.get("/api/health", summary="Sistem sağlık durumu")
    def health_check():
        data = generate_all_sensors()
        return {
            "durum"       : data["sistem_durumu"],
            "aktif_alarm" : data["aktif_alarm"],
            "zaman"       : data["zaman_damgasi"],
        }

except ImportError:
    pass   # FastAPI yüklü değilse sadece veri üreteci olarak çalışır


# ── Bağımsız Test ─────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 55)
    print("  EKO-TEKNOPARK — Mock Data Generator v1.0")
    print("=" * 55)
    print(f"  {'Sensör':<18} {'Değer':>10}  {'Durum'}")
    print("-" * 55)

    snapshot = generate_all_sensors()
    for name, reading in snapshot["sensörler"].items():
        durum_icon = {"normal": "✓", "uyari": "!", "kritik": "✗"}.get(reading["durum"], "?")
        print(f"  {name:<18} {reading['deger']:>8} {reading['birim']:<5}  {durum_icon} {reading['durum']}")

    print("-" * 55)
    print(f"  Sistem Durumu : {snapshot['sistem_durumu'].upper()}")
    print(f"  Aktif Alarm   : {snapshot['aktif_alarm']}")
    print(f"  Zaman Damgası : {snapshot['zaman_damgasi']}")
    print("=" * 55)
