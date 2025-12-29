# AuRoom Landing Page V2 - Pinjam Tunai Focus
## Complete Development Prompt for Claude Code

**Purpose:** Rebuild AuRoom landing page dengan fokus produk baru: Pinjam Tunai  
**Target:** Claude Code atau developer  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion  
**Estimated Time:** ~4-6 hours

---

## 🎯 CONTEXT: PIVOT PRODUK

### Landing Page V1 (Lama - DEPRECATED)
```
Fokus: "From Rupiah to Yield-Bearing Gold"
- Swap IDRX ke XAUT
- Stake di Vault
- Earn yield dari trading fees
- Target: Crypto investor
- Tone: Technical, DeFi-native
```

### Landing Page V2 (Baru - BUILD THIS)
```
Fokus: "Pinjam Tunai dengan Jaminan Emas Digital"
- Jaminkan emas digital
- Terima uang tunai ke rekening
- Bayar kapan saja, emas kembali
- Target: Masyarakat umum butuh likuiditas
- Tone: Simple, relatable, trustworthy
```

---

## 🧠 TARGET AUDIENCE

### Primary: Orang Indonesia yang Butuh Uang Tunai
```
Karakteristik:
- Punya tabungan emas (fisik atau digital)
- Butuh uang cepat tanpa jual aset
- Familiar dengan konsep pegadaian
- TIDAK familiar dengan crypto/DeFi
- Skeptis terhadap teknologi baru

Pain Points:
- Pegadaian tradisional ribet (antri, dokumen, dll)
- Bunga pegadaian tinggi
- Proses lama (bisa berhari-hari)
- Tidak bisa akses 24/7

Ekspektasi:
- Simple: "Saya punya emas, saya butuh uang"
- Fast: Proses cepat, uang langsung
- Safe: Emas aman, bisa diambil kembali
- Transparent: Tahu semua biaya di depan
```

### Secondary: Crypto User yang Punya XAUT
```
Karakteristik:
- Sudah punya gold token (XAUT)
- Paham blockchain tapi tidak mau jual
- Butuh likuiditas tanpa capital gains event
```

---

## 📋 LANDING PAGE STRUCTURE

```
┌─────────────────────────────────────────────────────────────────┐
│  1. HERO SECTION                                                │
│     - Headline utama                                            │
│     - Subheadline                                               │
│     - CTA button                                                │
│     - Hero illustration                                         │
├─────────────────────────────────────────────────────────────────┤
│  2. PROBLEM & SOLUTION                                          │
│     - Masalah yang dihadapi                                     │
│     - Solusi AuRoom                                             │
├─────────────────────────────────────────────────────────────────┤
│  3. HOW IT WORKS                                                │
│     - 3 langkah simple                                          │
│     - Visual flow                                               │
├─────────────────────────────────────────────────────────────────┤
│  4. BENEFITS / WHY AUROOM                                       │
│     - 4-6 keunggulan                                            │
│     - Comparison dengan pegadaian tradisional                   │
├─────────────────────────────────────────────────────────────────┤
│  5. TRUST INDICATORS                                            │
│     - Live stats                                                │
│     - Security features                                         │
│     - Technology partners                                       │
├─────────────────────────────────────────────────────────────────┤
│  6. FAQ                                                         │
│     - Pertanyaan umum                                           │
├─────────────────────────────────────────────────────────────────┤
│  7. FINAL CTA                                                   │
│     - Ajakan action                                             │
│     - Button                                                    │
├─────────────────────────────────────────────────────────────────┤
│  8. FOOTER                                                      │
│     - Links                                                     │
│     - Disclaimer                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 SECTION 1: HERO

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         [AUROOM LOGO]                                   │
│                                                                         │
│                                                                         │
│         Butuh Uang Tunai?                                              │
│         Jaminkan Emas, Cairkan Instan                                  │
│                                                                         │
│         Pinjam uang dengan jaminan emas digital.                       │
│         Proses cepat, aman, dan transparan.                            │
│         Uang langsung masuk ke rekening bank kamu.                     │
│                                                                         │
│                                                                         │
│         [🚀 Pinjam Sekarang]     [📖 Pelajari Lebih Lanjut]            │
│                                                                         │
│                                                                         │
│                    [HERO ILLUSTRATION]                                  │
│                    Gambar: Emas → Uang Tunai                           │
│                                                                         │
│                                                                         │
│         ───────────────────────────────────────────                    │
│         ✅ Tanpa Antri    ✅ 24/7    ✅ Biaya Rendah                    │
│         ───────────────────────────────────────────                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Copy Options

**Headline Options:**
1. "Butuh Uang Tunai? Jaminkan Emas, Cairkan Instan"
2. "Emas Digital Jadi Uang Tunai dalam Hitungan Menit"
3. "Pegadaian Digital untuk Era Modern"
4. "Pinjam Tunai dengan Jaminan Emas - Tanpa Ribet"

**Subheadline:**
"Tidak perlu jual emas. Jaminkan, pinjam, dan tarik kembali kapan saja."

**CTA Primary:** "Pinjam Sekarang"
**CTA Secondary:** "Pelajari Lebih Lanjut" atau "Lihat Cara Kerja"

### Design Notes
- Background: Dark gradient (sesuai theme existing)
- Accent color: Gold (#F5A623)
- Hero image: Abstract illustration emas → uang atau mockup app
- Trust badges di bawah CTA

---

## 🎨 SECTION 2: PROBLEM & SOLUTION

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    😫 MASALAH YANG SERING DIHADAPI                      │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │                 │  │                 │  │                 │         │
│  │  🏦 Pegadaian   │  │  💸 Jual Emas   │  │  🏛️ Bank        │         │
│  │     Ribet      │  │     Rugi       │  │     Lama        │         │
│  │                 │  │                 │  │                 │         │
│  │  Antri panjang  │  │  Kehilangan    │  │  Proses berhari │         │
│  │  Dokumen banyak │  │  aset berharga │  │  Syarat rumit   │         │
│  │  Jam terbatas   │  │  Capital gains │  │  Jaminan ribet  │         │
│  │                 │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│                    ✨ SOLUSI: AUROOM PINJAM TUNAI                       │
│                                                                         │
│         Pegadaian digital yang simple, cepat, dan transparan.          │
│         Jaminkan emas digital kamu, terima uang tunai langsung         │
│         ke rekening bank. Emas aman, bisa ditarik kapan saja.          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Copy

**Problem Cards:**

1. **Pegadaian Tradisional**
   - Icon: 🏦
   - Title: "Pegadaian Ribet"
   - Points: Antri panjang, Dokumen banyak, Jam operasional terbatas

2. **Jual Emas**
   - Icon: 💸
   - Title: "Jual Emas = Rugi"
   - Points: Kehilangan aset berharga, Kena selisih harga jual-beli, Pajak capital gains

3. **Pinjaman Bank**
   - Icon: 🏛️
   - Title: "Bank Lama & Ribet"
   - Points: Proses berhari-hari, Syarat pengajuan rumit, Jaminan tidak fleksibel

**Solution:**
"AuRoom adalah pegadaian digital yang memungkinkan kamu meminjam uang tunai dengan jaminan emas digital. Proses 100% online, selesai dalam hitungan menit, uang langsung masuk ke rekening bank kamu."

---

## 🎨 SECTION 3: HOW IT WORKS

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                       🔄 CARA KERJA                                     │
│                    Semudah 1 - 2 - 3                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │   ┌─────────┐           ┌─────────┐           ┌─────────┐       │   │
│  │   │         │           │         │           │         │       │   │
│  │   │   🥇    │  ──────▶  │   💵   │  ──────▶  │   🏦    │       │   │
│  │   │         │           │         │           │         │       │   │
│  │   └─────────┘           └─────────┘           └─────────┘       │   │
│  │                                                                  │   │
│  │   STEP 1               STEP 2                STEP 3             │   │
│  │   Jaminkan Emas        Tentukan Nominal      Terima Uang        │   │
│  │                                                                  │   │
│  │   Emas digital kamu    Masukkan jumlah       Uang langsung      │   │
│  │   dijaminkan secara    yang ingin kamu       ditransfer ke      │   │
│  │   otomatis.            pinjam.               rekening bank.     │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│                         ⏱️ Proses < 5 menit                            │
│                                                                         │
│                      [🚀 Mulai Pinjam Sekarang]                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Copy

**Step 1: Jaminkan Emas**
- Title: "Jaminkan Emas"
- Description: "Emas digital (XAUT) di wallet kamu dijaminkan secara otomatis ke smart contract yang aman."
- Icon: 🥇 atau gold bar illustration

**Step 2: Tentukan Nominal**
- Title: "Tentukan Nominal"
- Description: "Masukkan jumlah uang yang kamu butuhkan. System otomatis hitung emas yang dijaminkan."
- Icon: 💵 atau calculator illustration

**Step 3: Terima Uang**
- Title: "Terima Uang"
- Description: "Uang langsung ditransfer ke rekening bank pilihan kamu. Selesai!"
- Icon: 🏦 atau bank illustration

**Bottom text:** "Proses selesai dalam waktu kurang dari 5 menit"

---

## 🎨 SECTION 4: BENEFITS / WHY AUROOM

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    💎 KENAPA PILIH AUROOM?                              │
│                                                                         │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐   │
│  │                   │  │                   │  │                   │   │
│  │  ⚡ INSTAN        │  │  💰 BIAYA RENDAH  │  │  🔒 AMAN          │   │
│  │                   │  │                   │  │                   │   │
│  │  Proses selesai   │  │  Hanya 0.5%      │  │  Emas dijamin     │   │
│  │  dalam hitungan   │  │  biaya layanan.   │  │  smart contract   │   │
│  │  menit, bukan     │  │  Tidak ada bunga  │  │  yang transparan  │   │
│  │  hari.            │  │  berbunga.        │  │  dan teraudit.    │   │
│  │                   │  │                   │  │                   │   │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘   │
│                                                                         │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐   │
│  │                   │  │                   │  │                   │   │
│  │  🕐 24/7          │  │  📱 100% ONLINE   │  │  🔄 FLEKSIBEL     │   │
│  │                   │  │                   │  │                   │   │
│  │  Akses kapan saja │  │  Tidak perlu ke   │  │  Lunasi kapan     │   │
│  │  dari mana saja.  │  │  mana-mana.       │  │  saja, emas       │   │
│  │  Tidak ada jam    │  │  Cukup dari HP.   │  │  langsung         │   │
│  │  operasional.     │  │                   │  │  kembali.         │   │
│  │                   │  │                   │  │                   │   │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Comparison Table (Optional)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│              AUROOM vs PEGADAIAN TRADISIONAL                           │
│                                                                         │
│  ┌──────────────────┬──────────────────┬──────────────────┐            │
│  │                  │     AUROOM       │    PEGADAIAN     │            │
│  │                  │                  │   TRADISIONAL    │            │
│  ├──────────────────┼──────────────────┼──────────────────┤            │
│  │ Waktu Proses     │  < 5 menit ✅    │  Berjam-jam ❌   │            │
│  │ Biaya            │  0.5% sekali ✅  │  Bunga bulanan ❌│            │
│  │ Akses            │  24/7 online ✅  │  Jam kerja saja ❌│           │
│  │ Dokumen          │  Tidak perlu ✅  │  KTP, dll ❌     │            │
│  │ Antri            │  Tidak ada ✅    │  Panjang ❌      │            │
│  │ Pelunasan        │  Kapan saja ✅   │  Ada tenor ❌    │            │
│  └──────────────────┴──────────────────┴──────────────────┘            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Copy for Benefits

1. **⚡ Instan**
   - "Proses selesai dalam hitungan menit. Tidak perlu menunggu approval berhari-hari."

2. **💰 Biaya Rendah**
   - "Hanya 0.5% biaya layanan. Tidak ada bunga berbunga atau biaya tersembunyi."

3. **🔒 Aman**
   - "Emas dijamin oleh smart contract yang transparan. Kode terbuka, bisa diverifikasi siapa saja."

4. **🕐 24/7**
   - "Akses kapan saja, dari mana saja. Tidak ada jam operasional, tidak ada hari libur."

5. **📱 100% Online**
   - "Semua proses digital. Tidak perlu ke kantor, tidak perlu dokumen fisik."

6. **🔄 Fleksibel**
   - "Lunasi kapan saja tanpa penalti. Begitu lunas, emas langsung kembali ke wallet kamu."

---

## 🎨 SECTION 5: TRUST INDICATORS

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                       📊 STATISTIK LIVE                                 │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │                 │  │                 │  │                 │         │
│  │  Total Pinjaman │  │  Emas Dijaminkan│  │  Harga Emas     │         │
│  │                 │  │                 │  │                 │         │
│  │  Rp 1.2 M      │  │  50 XAUT       │  │  Rp 42.660.000  │         │
│  │                 │  │  (~Rp 2.1 M)   │  │  per XAUT       │         │
│  │                 │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│                       🛡️ KEAMANAN                                       │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │                 │  │                 │  │                 │         │
│  │  🔐 Smart       │  │  ✅ KYC         │  │  📜 Open        │         │
│  │     Contract    │  │     Verified    │  │     Source      │         │
│  │                 │  │                 │  │                 │         │
│  │  Emas disimpan  │  │  Semua user     │  │  Kode bisa      │         │
│  │  di blockchain, │  │  terverifikasi  │  │  diperiksa      │         │
│  │  bukan server   │  │  identitasnya   │  │  siapa saja     │         │
│  │                 │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│                    🔧 DIBANGUN DENGAN TEKNOLOGI                         │
│                                                                         │
│         [Mantle Logo]    [IDRX Logo]    [Tether Gold Logo]             │
│                                                                         │
│         Mantle Network - Layer 2 Ethereum yang cepat & murah           │
│         IDRX - Stablecoin Rupiah Indonesia                             │
│         XAUT - Tether Gold, backed by real gold                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Stats to Display (Live from Contract)
1. **Total Pinjaman Tersalurkan** - Sum of all borrows
2. **Total Emas Dijaminkan** - Total collateral locked
3. **Harga Emas Saat Ini** - Current XAUT price in IDR

### Security Points
1. **Smart Contract** - "Emas disimpan di blockchain, bukan di server yang bisa diretas"
2. **KYC Verified** - "Semua pengguna terverifikasi identitasnya untuk keamanan"
3. **Open Source** - "Kode smart contract terbuka, bisa diperiksa siapa saja"

### Technology Partners
- **Mantle Network** - "Layer 2 Ethereum yang cepat dan biaya rendah"
- **IDRX** - "Stablecoin Rupiah Indonesia yang teregulasi"
- **Tether Gold (XAUT)** - "Token emas yang didukung emas fisik nyata"

---

## 🎨 SECTION 6: FAQ

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    ❓ PERTANYAAN UMUM                                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  ▼ Apa itu AuRoom?                                              │   │
│  │                                                                  │   │
│  │    AuRoom adalah platform pinjaman digital yang memungkinkan    │   │
│  │    kamu meminjam uang tunai dengan jaminan emas digital (XAUT). │   │
│  │    Seperti pegadaian, tapi 100% online dan lebih cepat.         │   │
│  │                                                                  │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ▶ Bagaimana cara mendapatkan emas digital (XAUT)?              │   │
│  │                                                                  │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ▶ Berapa biaya yang dikenakan?                                 │   │
│  │                                                                  │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ▶ Apakah emas saya aman?                                       │   │
│  │                                                                  │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ▶ Bagaimana cara melunasi pinjaman?                            │   │
│  │                                                                  │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                  │   │
│  │  ▶ Apa yang terjadi jika saya tidak bisa melunasi?              │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### FAQ Items

**Q1: Apa itu AuRoom?**
A: AuRoom adalah platform pinjaman digital yang memungkinkan kamu meminjam uang tunai dengan jaminan emas digital (XAUT). Seperti pegadaian, tapi 100% online, lebih cepat, dan biaya lebih rendah.

**Q2: Bagaimana cara mendapatkan emas digital (XAUT)?**
A: Kamu bisa membeli XAUT melalui exchange crypto seperti Tokocrypto, Indodax, atau langsung di platform AuRoom menggunakan IDRX (stablecoin Rupiah).

**Q3: Berapa biaya yang dikenakan?**
A: Biaya layanan hanya 0.5% dari jumlah pinjaman, dikenakan sekali saat pencairan. Tidak ada bunga bulanan atau biaya tersembunyi lainnya.

**Q4: Apakah emas saya aman?**
A: Ya, emas kamu dijamin oleh smart contract di blockchain. Tidak ada pihak ketiga yang bisa mengakses emas kamu. Begitu kamu melunasi pinjaman, emas otomatis kembali ke wallet kamu.

**Q5: Bagaimana cara melunasi pinjaman?**
A: Kamu bisa melunasi kapan saja tanpa batas waktu. Cukup bayar nominal hutang, dan emas kamu langsung kembali ke wallet.

**Q6: Apa yang terjadi jika saya tidak bisa melunasi?**
A: Jika nilai emas turun drastis hingga mencapai batas likuidasi (90% LTV), sebagian emas akan dijual otomatis untuk melunasi hutang. Tapi dengan LTV 30%, kamu punya buffer yang sangat besar - harga emas harus turun ~67% sebelum ini terjadi.

**Q7: Berapa maksimal yang bisa saya pinjam?**
A: Kamu bisa meminjam hingga 75% dari nilai emas. Tapi untuk keamanan, kami set default di 30% sehingga posisi kamu sangat aman dari likuidasi.

**Q8: Apakah ada minimal pinjaman?**
A: Tidak ada minimal pinjaman. Kamu bisa pinjam sesuai kebutuhan.

---

## 🎨 SECTION 7: FINAL CTA

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │                                                                  │   │
│  │              Siap Mendapatkan Uang Tunai?                       │   │
│  │                                                                  │   │
│  │     Jaminkan emas digital kamu dan terima uang dalam           │   │
│  │     hitungan menit. Tidak perlu antri, tidak perlu ribet.      │   │
│  │                                                                  │   │
│  │                                                                  │   │
│  │                [🚀 Pinjam Sekarang]                             │   │
│  │                                                                  │   │
│  │                                                                  │   │
│  │     Belum punya emas digital? [Beli XAUT →]                     │   │
│  │                                                                  │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Copy

**Headline:** "Siap Mendapatkan Uang Tunai?"
**Subheadline:** "Jaminkan emas digital kamu dan terima uang dalam hitungan menit. Tidak perlu antri, tidak perlu ribet."
**CTA Primary:** "Pinjam Sekarang" → navigates to /pinjam-tunai
**CTA Secondary:** "Belum punya emas digital? Beli XAUT →" → navigates to /swap

---

## 🎨 SECTION 8: FOOTER

### Content

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [AUROOM LOGO]                                                          │
│                                                                         │
│  Pegadaian Digital untuk Era Modern                                    │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│  Produk              Bantuan               Teknologi                   │
│  • Pinjam Tunai      • FAQ                 • Mantle Network            │
│  • Beli Emas         • Cara Kerja          • Smart Contract            │
│  • Swap              • Hubungi Kami        • Dokumentasi               │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│  ⚠️ DISCLAIMER                                                          │
│  AuRoom adalah platform testnet untuk demonstrasi teknologi.           │
│  Semua transaksi menggunakan token testnet tanpa nilai riil.          │
│  Bukan merupakan saran investasi atau keuangan.                        │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│  © 2025 AuRoom Protocol. Built for Mantle SEA Hackathon.              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### File Structure

```
app/
├── page.tsx                    # Landing page (replace existing)
└── (landing)/
    └── components/
        ├── HeroSection.tsx
        ├── ProblemSolutionSection.tsx
        ├── HowItWorksSection.tsx
        ├── BenefitsSection.tsx
        ├── TrustSection.tsx
        ├── FAQSection.tsx
        ├── CTASection.tsx
        └── Footer.tsx

components/
└── landing/
    ├── StatCard.tsx            # For live stats
    ├── BenefitCard.tsx         # For benefits grid
    ├── ComparisonTable.tsx     # Optional comparison
    ├── FAQAccordion.tsx        # Expandable FAQ
    └── TechPartnerLogo.tsx     # Partner logos
```

### Key Components

#### StatCard.tsx
```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
}

// Display live stats from contract
// Use useReadContract for live data
```

#### FAQAccordion.tsx
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

// Expandable/collapsible FAQ items
// Use shadcn Accordion component
```

### Data Fetching for Stats

```typescript
// hooks/useLandingStats.ts

import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts/addresses';
import { BorrowingProtocolV2ABI } from '@/lib/contracts/abis';

export function useLandingStats() {
  // Get total collateral (emas dijaminkan)
  const totalCollateral = useReadContract({
    address: CONTRACTS.BorrowingProtocolV2,
    abi: BorrowingProtocolV2ABI,
    functionName: 'xaut', // or a custom view function
  });
  
  // Get XAUT price
  const xautPrice = useReadContract({
    address: CONTRACTS.BorrowingProtocolV2,
    abi: BorrowingProtocolV2ABI,
    functionName: 'xautPriceInIDRX',
  });
  
  return {
    // Process and return stats
  };
}
```

### Animations (Framer Motion)

```typescript
// Scroll-triggered animations for sections
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Usage
<motion.div {...fadeInUp}>
  <HeroSection />
</motion.div>
```

---

## 🎨 DESIGN SYSTEM

### Colors

```typescript
const colors = {
  // Primary - Gold
  gold: {
    DEFAULT: '#F5A623',
    light: '#FFD700',
    dark: '#B8860B',
  },
  
  // Background
  background: {
    page: '#0A0A0A',      // Almost black
    card: '#141414',      // Dark card
    cardHover: '#1E1E1E', // Hover state
  },
  
  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1A1',
    muted: '#6B6B6B',
  },
  
  // Accent
  accent: {
    green: '#10B981',  // Success
    red: '#EF4444',    // Error/Danger
    blue: '#3B82F6',   // Info
  },
};
```

### Typography

```typescript
const typography = {
  // Headlines
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-xl md:text-2xl font-semibold',
  
  // Body
  body: 'text-base md:text-lg',
  small: 'text-sm',
  
  // Special
  stat: 'text-3xl md:text-4xl font-bold',
};
```

### Spacing

```typescript
// Section spacing
const sectionPadding = 'py-16 md:py-24 lg:py-32';
const containerWidth = 'max-w-6xl mx-auto px-4 md:px-6';
```

---

## ✅ CHECKLIST

### Must Have
- [ ] Hero section dengan clear value proposition
- [ ] Problem/Solution section
- [ ] How it works (3 steps)
- [ ] Benefits section (min 4 benefits)
- [ ] Live stats dari contract
- [ ] FAQ section (min 5 questions)
- [ ] Final CTA section
- [ ] Footer dengan disclaimer
- [ ] Mobile responsive
- [ ] Dark theme (sesuai existing)
- [ ] Gold accent color

### Nice to Have
- [ ] Scroll animations (Framer Motion)
- [ ] Comparison table
- [ ] Video explainer embed
- [ ] Testimonials (jika ada)
- [ ] Live chat widget

### Remove from V1
- [ ] Yield-bearing gold messaging
- [ ] Vault/staking content
- [ ] APY displays
- [ ] ERC-4626 technical details
- [ ] Complex DeFi terminology

---

## 📝 COPY SUMMARY

### Key Messages

| Message | Usage |
|---------|-------|
| "Pegadaian Digital" | Positioning - familiar concept |
| "Jaminkan Emas, Cairkan Instan" | Hero headline |
| "Tanpa ribet, tanpa antri" | Pain point solution |
| "Proses < 5 menit" | Speed benefit |
| "Biaya hanya 0.5%" | Cost benefit |
| "24/7 dari mana saja" | Accessibility |
| "Emas aman, bisa ditarik kapan saja" | Trust/security |

### Tone of Voice
- **Simple** - Hindari jargon teknis
- **Trustworthy** - Transparansi adalah kunci
- **Friendly** - Bicara seperti teman
- **Confident** - Tapi tidak arogan
- **Indonesian** - Gunakan bahasa sehari-hari

### Words to USE ✅
- Pinjam tunai
- Jaminkan emas
- Cairkan
- Lunasi
- Uang masuk ke rekening
- Aman
- Cepat
- Simple

### Words to AVOID ❌
- Collateral
- LTV / Loan-to-Value
- Smart contract (minimize)
- DeFi
- Yield
- APY
- Staking
- Liquidity
- Protocol

---

## 🚀 DEPLOYMENT NOTES

### Navigation Update
```typescript
// Update navbar links
const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/pinjam-tunai', label: 'Pinjam Tunai' },  // NEW - primary
  { href: '/swap', label: 'Beli Emas' },
  { href: '/vault', label: 'Vault' },  // Keep but de-emphasize
];
```

### Meta Tags
```typescript
// app/layout.tsx
export const metadata = {
  title: 'AuRoom - Pinjam Tunai dengan Jaminan Emas Digital',
  description: 'Pegadaian digital yang simple, cepat, dan transparan. Jaminkan emas digital, terima uang tunai ke rekening dalam hitungan menit.',
  keywords: 'pinjam tunai, gadai emas, pegadaian digital, XAUT, gold-backed loan',
};
```

---

## 📎 REFERENCE LINKS

**Contract Address:**
```
BorrowingProtocol V2: 0xd84B183Dc6a19BFb9D1Fe630284521dF2998207a
```

**Routes:**
```
Landing Page: /
Pinjam Tunai: /pinjam-tunai
Swap/Beli Emas: /swap
```

---

**Selamat membangun Landing Page V2! 🚀💰**

---

*Document Version: 2.0.0*  
*Created: December 25, 2025*  
*Project: AuRoom - Landing Page V2 (Pinjam Tunai Focus)*
