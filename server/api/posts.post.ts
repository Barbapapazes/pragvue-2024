export default defineLazyEventHandler(async () => {
  const db = hubDatabase();

  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS posts ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "title" TEXT NOT NULL, "content" TEXT NOT NULL, "user_id" INTEGER NOT NULL)`
    )
    .run();

  return defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const body = await readBody(event);

    if (!body.title || !body.content) {
      throw createError({
        status: 400,
        message: "Title and content are required",
      });
    }

    const { results } = await db
      .prepare(
        "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?) returning *"
      )
      .bind(body.title, body.content, user.githubId)
      .run();

    setResponseStatus(event, 201);
    return results[0];
  });
});
