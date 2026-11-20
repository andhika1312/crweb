# Culture Roleplay V2 — Setup (semua gratis)
1. **Firebase** (Spark/gratis): buat project > aktifkan Authentication (Email/Password) + Firestore. Isi `config.js`.
2. **Jadi admin**: daftar akun di web, lalu di Firestore buat dokumen `admins/{UID akun}` (isi field apa saja).
3. **Rules Firestore**:
```
rules_version='2';service cloud.firestore{match /databases/{d}/documents{
 function adm(){return exists(/databases/$(d)/documents/admins/$(request.auth.uid))}
 match /types/{i}{allow read:if true;allow write:if adm()}
 match /products/{i}{allow read:if true;allow write:if adm()}
 match /secrets/{i}{allow read,write:if adm()}
 match /admins/{i}{allow read:if request.auth!=null&&request.auth.uid==i}
 match /{c}/{i}{allow read:if c in ['content','blacklist','team','partners','settings'];allow write:if c in ['content','blacklist','team','partners','settings']&&adm()}
 match /apps/{i}{allow create:if request.resource.data.typeId=='admin_recruit'?(!exists(/databases/$(d)/documents/settings/admin_recruit)||get(/databases/$(d)/documents/settings/admin_recruit).data.get('open',true)!=false):get(/databases/$(d)/documents/types/$(request.resource.data.typeId)).data.get('open',true)!=false;allow read,update,delete:if adm()}
 match /orders/{i}{allow create:if request.auth!=null&&request.resource.data.uid==request.auth.uid;
  allow read:if request.auth!=null&&(resource.data.uid==request.auth.uid||adm());allow update,delete:if adm()}}}
```
4. **GitHub**: upload folder ini ke repo. Taruh file di `assets/images/logo.png`, `assets/videos/hero.mp4`, `assets/music/bgm.mp3`.
5. **Netlify** (gratis): New site from Git > pilih repo. Environment variables:
   - `FIREBASE_SERVICE_ACCOUNT` = isi JSON service account (Firebase > Project settings > Service accounts)
   - `FIVEM_URL` = `http://IP:30120` (pastikan bisa diakses publik)
   - `DISCORD_INVITE` = kode invite saja (contoh `abc123`)
   - `FIVEM_API`, `FIVEM_SECRET` = untuk log/inventory (butuh resource Lua di server)
6. Buka `/kontrol-cr2.html#masuk` (halaman ini tampil 404 kalau tanpa `#masuk`, tidak ada link ke sana di web publik; ganti nama file sesukamu), klik "Isi 6 whitelist awal", lalu isi webhook tiap whitelist + webhook admin & order.

7. Foto tim: taruh di `assets/images/team/`, lalu isi path-nya di dashboard (bagian Tim). Aturan, blacklist, tim, dan partner semuanya diatur dari dashboard.
