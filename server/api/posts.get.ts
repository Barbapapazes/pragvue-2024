export default defineLazyEventHandler(async () => {
  const db = hubDatabase();

  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS posts ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "title" TEXT NOT NULL, "content" TEXT NOT NULL, "user_id" INTEGER NOT NULL)`
    )
    .run();

  return defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const { results } = await db
      .prepare("SELECT * FROM posts WHERE user_id = ?")
      .bind(user.githubId)
      .all();

    return results;
  });
});
