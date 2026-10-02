import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    return Response.json({
      users,
    });
  } catch (error) {
    console.error("Kullanıcılar alınırken hata:", error);

    return Response.json(
      {
        error: "Kullanıcılar alınamadı",
      },
      {
        status: 500,
      }
    );
  }
}