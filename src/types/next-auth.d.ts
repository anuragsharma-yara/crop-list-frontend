import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string | null;
            email: string | null;
            image: string | null;
            roles: string[];
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      // Add your custom properties
      roles: string[];
    }
  }