import NextAuth, { NextAuthOptions, Session, TokenSet } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface CustomToken extends TokenSet {
  jwt: string; // Define the 'jwt' property
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.AUTH_SERVICE_URL!}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentialDetails),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status == 401) {
          return null;
        }

        const user = await res.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.jwt = token.jwt;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
