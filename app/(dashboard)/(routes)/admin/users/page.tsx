import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Calendar } from 'lucide-react';
import RecentUsersTable from './_components/users-tables';

const AdminDashboard = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    return redirect("/?error=unauthorized")
  }

  const admin_required = await db.profile.findFirst({
    where: {
      userId,
      role: "ADMIN",
    },
  })

  if (!admin_required) {
    redirect("/?error=admin_required")
  }
  
  const recentUsers = await db.profile.findMany({
    orderBy: { role: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      roleName: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  const totalUsers = await db.profile.count();
  const adminUsers = await db.profile.count({ where: { role: 'ADMIN' } });
  const memberUsers = await db.profile.count({ where: { role: 'MEMBER' } });

  return (
    <div className="p-6 space-y-6">
      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
                <h3 className="text-2xl font-bold">{totalUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pengguna Admin</p>
                <h3 className="text-2xl font-bold">{adminUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pengguna Biasa</p>
                <h3 className="text-2xl font-bold">{memberUsers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pengguna Terbaru</CardTitle>
          <CardDescription>Daftar pengguna yang baru bergabung di platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUsersTable users={recentUsers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
