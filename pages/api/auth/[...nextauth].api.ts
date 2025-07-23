import { establishment } from "@/services/establishment";
import { ActionsResponse } from "@/types";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

// const options: AuthOptions = {
//   providers: [,],
// };

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const response =
          await establishment.post<ActionsResponse<{ token: string }>>(
            "/sign-in",
          );

        if (
          response.status === 200 &&
          response.data &&
          response.data.status &&
          response.data.data
        ) {
          const { token } = response.data.data;

          const session = await establishment.get<
            ActionsResponse<{ id: string; name: string; email: string }>
          >("session", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (session.status === 200 && session.data && session.data.status) {
            return {
              id: session.data.data.id,
              name: session.data.data.name,
              email: session.data.data.email,
              accessToken: token,
            };
          }
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
