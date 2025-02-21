import NextAuth from "next-auth";
import { authOptions } from "./authconfig"


console.log(`NEXT_AUTH_SECRET`, process.env.NEXTAUTH_SECRET)

// Export NextAuth API handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

