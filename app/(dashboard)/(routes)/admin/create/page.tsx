import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { redirect } from "next/navigation";
import CreatePage from "./_components/create-course";

export default async function AdminCreateCoursePage() {
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    redirect("/?error=unauthorized");
  }

  const admin_required = await db.profile.findFirst({
    where: {
      userId,
      role: "ADMIN",
    },
  });

  if (!admin_required) {
    redirect("/?error=admin_required");
  }

  return <CreatePage />;
}
