import type { NextAuthOptions, Session } from 'next-auth'
import { decode } from 'jsonwebtoken';
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

export const options: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
            checks: ['pkce', 'state'],
            idToken: true
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username: ",
                    type: "text",
                    placeholder: "Enter username"
                },
                password: {
                    label: "Password: ",
                    type: "password",
                    placeholder: "Enter password"
                }
            },
            async authorize(credentials, req) {
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                }
                else return null;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            if (user) {
                console.log("user from callback: ", user);
                return true;
            }
            return false;
        },
        redirect: async ({url, baseUrl}) => {
            return baseUrl;
        },
        async jwt({ token, user, account }) {
            console.log("account from jwt callback: ", account);
            if (account?.access_token) {
                const decodedToken: any = decode(account.id_token as string);
                if (decodedToken) {
                    console.log(decodedToken);
                    token.roles = decodedToken.roles || [];
                }
            }
            return token;
        },
        async session({ session, token }: {session: Session, token: JWT}) {
            session.user.roles = token.roles;
            return session;
        }
    },
    events: {
        async signIn(message) { /* onc successful sign in */ },
        async signOut(message) { /* on signout */ },
        async createUser(message) { /* user created */ },
        async updateUser(message) { /* user updated - e.g. their email was verified */ },
        async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
        async session(message) { /* session is active */ },
    },
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout'
    // }
}
