import NextAuth from "next-auth";
import { authOptions } from "./authconfig"

// Export NextAuth API handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

