"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function serverSignIn() {
    // Perform server-side authentication
    await signIn("github");
    redirect("/dashboard"); // Redirect after login
}
