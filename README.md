# Intro to Zero Sync

[![](https://img.youtube.com/vi/IOw-LzKk-s8/hqdefault.jpg)](https://www.youtube.com/watch?v=IOw-LzKk-s8)

The code created in my video [Intro to Zero Sync](https://www.youtube.com/watch?v=IOw-LzKk-s8), that walks through setting up Zero in a NextJS project.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Adding to the schema
1. Did you add to the schema in `db/schema.ts`
2. Did you also add to the `drizzle-zero.config.ts`
3. Did you enable the permissions in `schema.ts` file?
4. Did you run the drizzle-kit `npm run db:generate` and `npm run db:migrate` commands?
5. Did you run the drizzle-zero schema generate `npm run schema:generate`