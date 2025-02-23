"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, BookOpen, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import toast from "react-hot-toast";

interface Transaction {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  transactionPrice: number | null;
  transactionStatus: string;
  course?: {
    title: string;
    price: number | null;
  } | null;
  coupon?: {
    name: string;
    discountPercentage: number | null;
  } | null;
}

interface AnalyticsDashboardProps {
  transactions: Transaction[];
  users: { userId: string; name: string }[];
  courses: {
    id: string;
    title: string;
    price: number | null;
    hasDiscount: boolean;
    discountPrice: number | null;
  }[];
  coupons: {
    id: string;
    name: string;
    discountPercentage: number;
    courseId?: string | null;
    isActive: boolean;
  }[];
}

const AnalyticsDashboard = ({ 
  transactions = [], 
  users = [], 
  courses = [],
  coupons = [],
}: AnalyticsDashboardProps) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");

  const totalRevenue = transactions.reduce((acc, tx) => 
    acc + (tx.transactionPrice || 0), 0
  );

  useEffect(() => {
    setSelectedCoupon("");
  }, [selectedCourse]);

  const handleAddPurchase = async () => {
    if (!selectedUser || !selectedCourse) return;

    try {
      const course = courses.find((c) => c.id === selectedCourse);
      if (!course) {
        toast.error("Kursus tidak ditemukan");
        return;
      }

      const basePrice = course.price || 0;
      let finalPrice = basePrice;

      if (selectedCoupon) {
        const coupon = coupons.find((c) => c.id === selectedCoupon);
        if (coupon) {
          finalPrice = basePrice * (1 - coupon.discountPercentage / 100);
        }
      }
  
      else if (course.hasDiscount && course.discountPrice) {
        finalPrice = course.discountPrice;
      }

      finalPrice = Number(finalPrice.toFixed(2));

      await axios.post("/api/purchases/manual", {
        userId: selectedUser,
        courseId: selectedCourse,
        couponId: selectedCoupon || undefined,
        transactionPrice: finalPrice,
        transactionStatus: "MANUAL",
      });

      toast.success("✨ Pembelian berhasil ditambahkan");
      setSelectedUser("");
      setSelectedCourse("");
      setSelectedCoupon("");
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

  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.userId === userId);
    return user ? user.name : userId;
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
              {formatPrice(totalRevenue || 0)}
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
      </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* User Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pilih Pengguna</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between truncate"
                  >
                    {selectedUser
                      ? users.find((user) => user.userId === selectedUser)?.name
                      : "Pilih pengguna..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 sm:w-full">
                <Command filter={(value, search) => {
                  const user = users.find(u => u.userId === value);
                  return user?.name.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                }}>
                  <CommandInput placeholder="Cari pengguna..." />
                  <CommandList>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.userId}
                          value={user.userId}
                          onSelect={() => setSelectedUser(user.userId)}
                          className="truncate"
                        >
                          {user.name} ({user.userId.slice(0, 10)}...)
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Course Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pilih Kursus</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between truncate"
                  >
                    {selectedCourse
                      ? courses.find((course) => course.id === selectedCourse)?.title
                      : "Pilih kursus..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 sm:w-full">
                  <Command filter={(value, search) => {
                    const course = courses.find(c => c.id === value);
                    return course?.title.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                  }}>
                    <CommandInput placeholder="Cari kursus..." />
                    <CommandList>
                      <CommandGroup>
                        {courses.map((course) => (
                          <CommandItem
                            key={course.id}
                            value={course.id}
                            onSelect={() => setSelectedCourse(prev => prev === course.id ? "" : course.id)}
                            className="truncate"
                          >
                            {course.title} ({course.id.slice(0, 6)}...)
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Coupon Selection */}
            {selectedCourse && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih Kupon</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between truncate"
                    >
                      {selectedCoupon
                        ? coupons.find((coupon) => coupon.id === selectedCoupon)?.name
                        : "Pilih kupon..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 sm:w-full">
                    <Command filter={(value, search) => {
                      const coupon = coupons.find(cp => cp.id === value);
                      return coupon?.name.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                    }}>
                      <CommandInput placeholder="Cari kupon..." />
                      <CommandList>
                        <CommandGroup>
                          {coupons
                            .filter(coupon => 
                              coupon.isActive && 
                              (!coupon.courseId || coupon.courseId === selectedCourse)
                            )
                            .map((coupon) => (
                              <CommandItem
                                key={coupon.id}
                                value={coupon.id}
                                onSelect={() => setSelectedCoupon(prev => prev === coupon.id ? "" : coupon.id)}
                                className="truncate"
                              >
                                {coupon.name} ({coupon.discountPercentage}% off)
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleAddPurchase}
              disabled={!selectedUser || !selectedCourse}
              className="w-full md:w-auto"
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
                <TableHead>Tipe Pembayaran</TableHead>
                <TableHead>Kode Kupon</TableHead>
                <TableHead>Total Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>{getUserName(tx.userId)} ({tx.userId.slice(5, 10)}...)</TableCell>
                  <TableCell>{tx.course?.title || tx.courseId}</TableCell>
                  <TableCell>{tx.transactionStatus}</TableCell>
                  <TableCell>{tx.coupon?.name || "-"}</TableCell>
                  <TableCell>
                    {formatPrice(tx.transactionPrice || 0)}
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