import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET bulunamadı.");
}

const secretKey = new TextEncoder().encode(secret);

export async function createSession(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload as {
      userId: string;
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const session = await verifySession(token);

  if (!session?.userId) {
    return null;
  }

  const user = await prismaUser(session.userId);

  return user;
}

async function prismaUser(userId: string) {
  const { prisma } = await import("@/app/lib/prisma");

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}