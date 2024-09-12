// auth.d.ts
declare module "#auth-utils" {
  interface User {
    githubId: number;
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};
