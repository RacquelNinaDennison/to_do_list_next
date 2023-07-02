import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
});
// export const authOptions: NextAuthOptions = {
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID as string,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// 			authorization: {
// 				params: {
// 					prompt: "consent",
// 					access_type: "offline",
// 					response_type: "code",
// 				},
// 			},
// 		}),
// 	],
// 	secret: process.env.NEXTAUTH_SECRET,
// };
// export default NextAuth(authOptions);
