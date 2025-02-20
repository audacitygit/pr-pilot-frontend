import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

// Define authentication options
export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise), // Persist sessions in MongoDB
    session: {
        strategy: "jwt", // Use JWT for session handling
    },
    callbacks: {
        async session({ session, token }) {
            // Attach user ID to session
            if (session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth API handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

