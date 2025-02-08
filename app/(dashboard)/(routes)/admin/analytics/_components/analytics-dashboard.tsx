"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, BookOpen, TrendingUp } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface Transaction {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  course?: {
    title: string;
    price: number | null;
  } | null;
}

interface AnalyticsDashboardProps {
  transactions: Transaction[];
  users: { id: string; name: string; }[];
  courses: { id: string; title: string; }[];
}

const AnalyticsDashboard = ({ 
  transactions = [], 
  users = [], 
  courses = [] 
}: AnalyticsDashboardProps) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const totalRevenue = transactions.reduce((acc, tx) => 
    acc + (tx.course?.price || 0), 0
  );

  const userOptions = users.map(user => ({
    value: user.id,
    label: `${user.name} (${user.id})`
  }));

  const courseOptions = courses.map(course => ({
    value: course.id,
    label: `${course.title} (${course.id})`
  }));

  const handleAddPurchase = async () => {
    if (!selectedUser || !selectedCourse) return;
  
    try {
      await axios.post("/api/purchases/manual", {
        userId: selectedUser,
        courseId: selectedCourse,
      });
      
      toast.success("✨ Pembelian berhasil ditambahkan");
      setSelectedUser("");
      setSelectedCourse("");
      router.refresh();
    } catch (error: any) {
        if (error.response) {
            toast.error(`Server responded with ${error.response.status} error`);
        } else if (error.request) {
            toast.error("No response received from the server");
        } else {
            toast.error(`Error: ${error.message}`);
        }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analisis Transaksi</h1>
        <Button variant="outline">Download Laporan</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp. {totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Kursus Terjual</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(transactions.map(t => t.courseId)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Pembelian Manual</CardTitle>
          <CardDescription>
            Buat catatan pembelian untuk pembayaran offline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pilih Pengguna</label>
              <Combobox
                options={userOptions}
                value={selectedUser}
                onChange={setSelectedUser}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pilih Kursus</label>
              <Combobox
                options={courseOptions}
                value={selectedCourse}
                onChange={setSelectedCourse}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleAddPurchase}
              disabled={!selectedUser || !selectedCourse}
            >
              Tambah Pembelian
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>
            Daftar semua pembelian kursus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>ID Pengguna</TableHead>
                <TableHead>Kursus</TableHead>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Pembelian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>{tx.userId}</TableCell>
                  <TableCell>{tx.course?.title || tx.courseId}</TableCell>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>
                    Rp. {tx.course?.price?.toLocaleString() || "N/A"}
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

export default AnalyticsDashboard;