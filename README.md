# Strava with Zero and Next.js

Based on the [hello zero](https://github.com/a-poor/hellozero) repo by [Austin Poor](https://github.com/a-poor).

Uses Docker for the DB. Zero-cache, zero-drizzle, drizzle, better-auth, next.js, tailwind.

## Developing

1. First, start up the the docker image:

```
npm run dev:db-up
```

2. Start up the zero-sync

```
npm run dev:cache
```

3. Start Next.js server

```
npm run dev:ui
```

and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. (optional) Start Drizzle Studio

```
npm run db:studio
```

and in browser go to [](https://local.drizzle.studio/)

## Adding to the schema

1. Did you add to the schema in `db/schema.ts`
2. Did you also add to the `drizzle-zero.config.ts`
3. Did you enable the permissions in `schema.ts` file?
4. Did you run the drizzle-kit `npm run db:generate` and `npm run db:migrate` commands?
5. Did you run the drizzle-zero schema generate `npm run schema:generate`
