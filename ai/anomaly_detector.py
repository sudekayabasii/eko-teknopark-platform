import random, math, time
from collections import deque
from datetime import datetime, timezone

SENSORS = {
    "sicaklik":     {"min":18.0,"max":30.0,"normal":24.0,"birim":"°C"},
    "nem":          {"min":45.0,"max":80.0,"normal":62.0,"birim":"%"},
    "ph":           {"min":5.5, "max":7.5, "normal":6.8, "birim":"pH"},
    "gaz_basinci":  {"min":0.8, "max":2.5, "normal":1.6, "birim":"bar"},
    "metan_orani":  {"min":45.0,"max":75.0,"normal":58.0,"birim":"%"},
    "su_seviyesi":  {"min":20.0,"max":95.0,"normal":74.0,"birim":"%"},
    "co2":          {"min":400, "max":800, "normal":520, "birim":"ppm"},
    "enerji":       {"min":12.0,"max":28.0,"normal":18.0,"birim":"kWh"},
}

THRESHOLD = 2.5
WINDOW    = 30
MIN_OBS   = 10

windows = {k: deque(maxlen=WINDOW) for k in SENSORS}

def uret(isim, t):
    cfg = SENSORS[isim]
    amp = (cfg["max"] - cfg["min"]) * 0.12
    val = cfg["normal"] + amp*math.sin(2*math.pi*t/60) + random.gauss(0, amp*0.15)
    return round(max(cfg["min"], min(cfg["max"], val)), 2)

def z_score(isim, val):
    w = windows[isim]
    if len(w) < MIN_OBS:
        return None
    m = sum(w)/len(w)
    s = math.sqrt(sum((x-m)**2 for x in w)/len(w)) or 0.001
    return abs(val - m) / s

if __name__ == "__main__":
    print("="*60)
    print("  EKO-TEKNOPARK — Anomali Tespit Sistemi v1.0")
    print(f"  Pencere: {WINDOW} ölçüm  |  Z eşiği: {THRESHOLD}")
    print("="*60)

    # Pencereyi doldur
    print("\n[1/2] Pencere dolduruluyor (30 normal ölçüm)...")
    for i in range(WINDOW):
        t = time.time() + i*5
        for isim in SENSORS:
            windows[isim].append(uret(isim, t))
    print("      Hazır.\n")

    # Anomali tespiti
    print("[2/2] Anomali tespiti çalışıyor...\n")
    print(f"  {'Sensör':<18} {'Değer':>9}  {'Z-Score':>8}  Durum")
    print("  " + "-"*52)

    t = time.time() + WINDOW*5
    anomaliler = []
    for isim in SENSORS:
        val = uret(isim, t)
        windows[isim].append(val)
        z = z_score(isim, val)
        z_str = f"{z:.2f}" if z is not None else "  —  "
        if z and z > THRESHOLD:
            durum = "✗ ANOMALİ"
            anomaliler.append(isim)
        else:
            durum = "✓ normal"
        birim = SENSORS[isim]["birim"]
        print(f"  {isim:<18} {val:>7} {birim:<5}  {z_str:>6}    {durum}")

    print("\n" + "="*60)
    if anomaliler:
        print(f"  ⚠ {len(anomaliler)} anomali tespit edildi: {', '.join(anomaliler)}")
    else:
        print("  ✓ Tüm sensörler normal aralıkta")
    print("="*60)