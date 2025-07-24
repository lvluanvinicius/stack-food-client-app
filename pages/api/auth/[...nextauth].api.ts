import { establishment } from "@/services/establishment";
import { ActionsResponse } from "@/types";
import { AxiosError } from "axios";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    accessToken: string;
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Celular", type: "phone" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.phone || !credentials?.password) return null;

        try {
          const response = await establishment.post<
            ActionsResponse<{ token: string }>
          >("/sign-in", credentials);

          if (
            response.status === 200 &&
            response.data &&
            response.data.status &&
            response.data.data
          ) {
            const { token } = response.data.data;

            const session = await establishment.get<
              ActionsResponse<{
                customer: { id: string; name: string; phone: string };
              }>
            >("session", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (session.status === 200 && session.data && session.data.status) {
              return {
                id: session.data.data.customer.id,
                name: session.data.data.customer.name,
                phone: session.data.data.customer.phone,
                accessToken: token,
              };
            }
          }

          return null;
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            const data = error.response.data as ActionsResponse<[]>;
            throw new Error(data.message);
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

  pages: {
    signIn: `http://191.37.38.59:3000/`,
    error: `http://191.37.38.59:3000/`,
  },
});
