'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditUserModal from '@/components/modals/users-modal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleName: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

interface RecentUsersTableProps {
  users: User[];
}

const RecentUsersTable: React.FC<RecentUsersTableProps> = ({ users }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pengguna</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Peran</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Tanggal Bergabung</TableHead>
            <TableHead>Tindakan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
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
              <TableCell>{user.roleName || "-"}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('en-GB')}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => setEditingUser(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)}
        />
      )}
    </>
  );
};

export default RecentUsersTable;
