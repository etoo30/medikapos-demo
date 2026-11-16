# MedikaPOS Demo

Demo frontend POS dan inventori toko alat kesehatan. Dibuat dengan Svelte 5, TypeScript, Vite, Dexie.js dan IndexedDB. Tidak memiliki backend, autentikasi produksi, pembayaran online, atau sinkronisasi antarperangkat.

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

Pemeriksaan dan build statis:

```sh
npm run check
npm run build
```

Akun demo: `owner` atau `cashier`, kata sandi `demo123`. Sesi hanya simulasi browser dan disimpan pada LocalStorage. Database operasional tersimpan lokal di IndexedDB `MedikaPOSDatabase`.

## Modul demo

- Overview dinamis untuk penjualan, katalog, persediaan, dan peringatan near-expiry.
- CRUD produk, kategori, merek, supplier, dan pelanggan.
- Penerimaan pembelian quantity, batch dengan lot/expired date, atau serial unit.
- Pelacakan saldo, adjustment quantity, batch quarantine, unit serial, serta pergerakan stok.
- POS dengan pencarian SKU/barcode, diskon, validasi pembayaran, alokasi FEFO, pilihan serial, checkout atomik, dan nota browser.
- Riwayat penjualan, laporan penjualan/pembelian/inventory, CSV, dan backup/restore JSON.

## Batasan

Data hanya berada di browser dan origin ini. Login bukan kontrol keamanan. Backup perlu dilakukan sendiri. Demo ini tidak mengelola retur, pembatalan, quotation, klaim garansi, konversi satuan, banyak lokasi, pajak, atau sinkronisasi. Batch expired dikecualikan dari stok jual; unit serial dijual satu per satu dengan masa garansi pada catatan unit. Informasi produk dan registrasi merupakan simulasi dan belum diverifikasi. Jangan memasukkan data pasien atau informasi kesehatan. Aplikasi bukan sistem klinis atau sistem produksi.

## Vercel

Hubungkan repository ke Vercel dan pilih preset **Vite**. Build command `npm run build`, output `dist`, install command `npm install`. Aplikasi memakai satu halaman tanpa URL client routing sehingga fallback SPA tidak diperlukan. IndexedDB memiliki ruang terpisah untuk setiap origin; data lokal development tidak ikut ke domain deployment.
