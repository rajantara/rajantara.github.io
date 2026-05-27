# CV Web Laode Rajantara

Website ini adalah CV / portofolio statis berbasis HTML, CSS, dan JavaScript.

## Cara upload ke GitHub

1. Install Git di komputer Anda.
2. Buka terminal di folder proyek `CV WEB`.
3. Jalankan perintah:

```bash
git init
git add .
git commit -m "Initial commit"
```

4. Buat repository baru di GitHub.
5. Tambahkan remote origin:

```bash
git remote add origin https://github.com/<username>/<nama-repo>.git
git branch -M main
git push -u origin main
```

## Cara deploy ke GitHub Pages

1. Pastikan repository sudah berada di GitHub.
2. Pada `Settings > Pages` pilih sumber `GitHub Actions` atau biarkan workflow `deploy.yml` yang dibuat otomatis men-deploy setelah `main` dipush.
3. Tunggu beberapa menit, lalu buka URL GitHub Pages Anda:

```
https://<username>.github.io/<nama-repo>/
```

## Catatan

- Jika Anda ingin menggunakan custom domain, tambahkan file `CNAME` di root repository.
- Pada `index.html`, ubah nilai `og:url` menjadi URL GitHub Pages setelah selesai deploy.
