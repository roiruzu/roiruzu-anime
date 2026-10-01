import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Giriş yapılmamış." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("ME ERROR:", error);

    return NextResponse.json(
      { error: "Kullanıcı bilgileri alınamadı." },
      { status: 500 }
    );
  }
}