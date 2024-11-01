import api from "@/app/api/api";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    token: string;
    fullName: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    authToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await api.post("/auth/login", credentials);
        const { token, user } = response.data;
        if (token && user) {
          return {
            ...user,
            token: token.token,
            fullName: user.fullName,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.fullName = user.fullName as string;
        token.authToken = user.token as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string;
        session.user.token = token.authToken as string;
      }
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
