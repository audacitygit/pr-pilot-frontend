import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            id: string; // ✅ Add the `id` field
            address?: string; // ✅ Custom field
        };
    }

    interface User extends DefaultUser {
        id: string;
        address?: string;
    }
}
