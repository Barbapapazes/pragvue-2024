## Nitro Database

- Enable the experimental feature

```ts
nitro: {
  experimental: {
    database: true,
  }
},
```

- Installer le package `better-sqlite3`

- Create a new endpoint `server/api/users.post.ts` to create a new user (use the devtools)

```ts
export default defineLazyEventHandler(() => {
  const db = useDatabase();

  db.sql`create table if not exists users ("id" integer primary key autoincrement, "email" text unique not null)`;

  return defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.email) {
      throw createError({
        status: 400,
        message: "Email is required",
      });
    }

    await db.sql`insert into users (email) values (${body.email})`;

    const user = await db.sql`select * from users where email = ${body.email}`;

    return user;
  });
});
```

_Do not delete for the next section_

## NuxtHub Database

- Install the module and wrangler `npx nuxi@latest module add hub && npx ni@latest -D wrangler`
- Enable the database feature in the `nuxt.config.ts`

```ts
hub: {
  database: true
}
```

- Create a new endpoint `server/api/users.post.ts` to create a new user (use the devtools)

```ts
export default defineLazyEventHandler(() => {
  const db = hubDatabase();

  db.prepare(
    `create table if not exists users ("id" integer primary key autoincrement, "email" text unique not null)`
  ).run();

  return defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.email) {
      throw createError({
        status: 400,
        message: "Email is required",
      });
    }

    await db
      .prepare(`insert into users (email) values (?1)`)
      .bind(body.email)
      .run();

    const user = await db
      .prepare(`select * from users where email = ?1`)
      .bind(body.email)
      .first();

    return user;
  });
});

```
