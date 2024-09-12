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
