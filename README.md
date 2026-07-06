# Studio Guru Prompt Builder

Aplikasi web statik untuk membantu guru Malaysia membina prompt suntingan foto studio rasmi dalam Bahasa Melayu. Aplikasi ini **tidak menghasilkan gambar**; ia menyediakan prompt yang boleh digunakan bersama gambar asal dalam AI image editor pilihan pengguna.

Gambar yang dipilih hanya dipaparkan sebagai preview. Sebarang tetapan dalam aplikasi tidak mengubah preview tersebut secara automatik.

## Ciri utama

- Preview gambar secara lokal dalam pelayar
- Tetapan guru, pakaian, latar studio dan gaya
- Pilihan pose, warna profesional dan pembuangan pantulan cermin mata
- Kawalan peratus serta empat preset segera
- Prompt dikemas kini secara langsung
- Salin, pilih semua, muat turun `.txt` dan reset
- Responsif untuk desktop, tablet dan telefon
- Tiada API, backend, pangkalan data, akaun atau storan awan

## Privasi

Gambar tidak dimuat naik, dihantar atau disimpan. Preview menggunakan `URL.createObjectURL()` dan kekal dalam sesi pelayar pengguna sahaja.

## Cara menggunakan

1. Buka `index.html` dalam pelayar.
2. Pilih atau seret gambar potret.
3. Masukkan nama dan pilih tetapan yang dikehendaki.
4. Laraskan slider atau gunakan preset.
5. Salin atau muat turun prompt akhir.
6. Lampirkan gambar asal bersama prompt tersebut dalam AI image editor pilihan anda.

## Jalankan secara lokal

Tiada pemasangan diperlukan. Buka `index.html` terus, atau jalankan pelayan statik:

```bash
python -m http.server 8080
```

Kemudian buka `http://localhost:8080`.

## Deploy ke GitHub Pages

1. Push semua fail ke repositori GitHub.
2. Buka **Settings → Pages**.
3. Di bahagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main`, folder `/(root)`, kemudian klik **Save**.
5. Tunggu deployment selesai dan buka URL Pages yang dipaparkan.

## Deploy ke Firebase Hosting

Pastikan Node.js dan Firebase CLI tersedia, kemudian:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Gunakan folder projek semasa sebagai direktori public dan jangan timpa `index.html`. Fail `firebase.json` asas telah disediakan.

## Teknologi

HTML, CSS dan JavaScript vanilla sahaja. Selepas fail dimuatkan, semua fungsi aplikasi berjalan tanpa panggilan API.
