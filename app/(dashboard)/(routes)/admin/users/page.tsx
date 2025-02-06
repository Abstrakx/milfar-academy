import { db } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Settings, Calendar } from 'lucide-react';

const AdminDashboard = async () => {
  // Fetch users from the database
  const recentUsers = await db.profile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  const totalUsers = await db.profile.count();
  const adminUsers = await db.profile.count({ where: { role: 'ADMIN' } });

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const usersLastMonth = await db.profile.count({
    where: {
      createdAt: {
        gte: oneMonthAgo,
      },
    },
  });

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

        {/* New Card for Users Joined in the Last Month */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pengguna Bergabung Bulan Lalu</p>
                <h3 className="text-2xl font-bold">{usersLastMonth}</h3>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead>Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.imageUrl || '/default-avatar.png'} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
