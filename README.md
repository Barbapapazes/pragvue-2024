- Install the module `npx nuxt@latest module add auth-utils`

- Create a new endpoint `/routes/auth/github.get.ts`

```ts
export default oauthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
      },
    });
    return sendRedirect(event, "/");
  },
});
```

- See the result by visiting the home page


_Do not forget to setup `.env` | https://github.com/settings/developers_
