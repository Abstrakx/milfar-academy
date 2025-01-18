import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
) {
    try {
        const { userId }: { userId: string | null } = await auth()
        const { name } = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingCategory = await db.category.findFirst({
            where: { name },
          });

          if (existingCategory) {
            return new NextResponse("Category already exists", { status: 400 });
          }

          const category = await db.category.create({
            data: {
              name,
            },
          });
        
          return NextResponse.json(category);

    } catch (error) {
        console.log("CATEGORIES: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}