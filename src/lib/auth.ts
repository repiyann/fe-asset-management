import axios from "axios";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await axios.post(
          "http://localhost:3333/api/v1/auth/login",
          credentials,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { token, user } = response.data.data;

        if (!token && !user) {
          throw new Error("Failed to retrieve access token");
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          access_token: token.token,
          token_type: token.type,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/auth/logout",
    error: "/tes",
  },
};
