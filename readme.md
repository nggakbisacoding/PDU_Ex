# core backend PMLD PDU

## how to run

```bash
npm install
```

copy `.env.example` to `.env` and set the values for database connection

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

## open api spec

open api spec http://;ocalhost:3000/api-docs

## sedikit penjelasan

request dari user pertama masuk ke middleware lalu ke controller lalu ke service lalu ke validator baru ke database, begitu juga sebaliknya

pertama user register akun baru lalu login lalu user dapat membuat perusahaan baru lalu di dalam perusahaan dapat membuat tempat baru lalu di dalam tempat dapat membuat sumur baru, tiap sumur punya token id yang digunakan sebagai token hit api di header untuk menjadi pembedanya.
