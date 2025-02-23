"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coupon } from "@prisma/client";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";

interface CouponManagementProps {
  initialData: Coupon[];
  courseId: string;
}

const CouponManagement = ({ courseId, initialData }: CouponManagementProps) => {
  const formSchema = z.object({
    name: z.string().min(3).toUpperCase(),
    discountPercentage: z.number().min(1).max(100),
    isActive: z.boolean(),
    courseId: z.string().nonempty(),
  });

  const [coupons, setCoupons] = useState<Coupon[]>(initialData);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      discountPercentage: 0,
      isActive: true,
      courseId: courseId,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const createCoupon = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/coupons`, values);
      setCoupons((prev) => [...prev, response.data]);
      toast.success("Kupon kursus berhasil dibuat!");
      setIsAddingNew(false);
    } catch {
      toast.error("Gagal untuk membuat kupon");
    }
  };

  const updateCoupon = async (id: string, values: z.infer<typeof formSchema>) => {
    try {
      const payload = { id, updateData: values };
      const response = await axios.patch(`/api/courses/${courseId}/coupons`, payload);
      setCoupons((prev) =>
        prev.map((coupon) => (coupon.id === id ? response.data : coupon))
      );
      toast.success("Kupon berhasil diperbaharui!");
      setIsAddingNew(false);
      setEditingId(null);
    } catch {
      toast.error("Gagal untuk memperbaharui kupon");
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/coupons`, { data: { id } });
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
      toast.success("Kupon berhasil dihapus!");
    } catch {
      toast.error("Gagal untuk menghapus kupon");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (editingId) {
      updateCoupon(editingId, values);
    } else {
      createCoupon(values);
    }
    form.reset();
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Manajemen Kupon
          {isAddingNew ? (
            <Button
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
                form.reset();
              }}
              variant="ghost"
            >
              Kembali
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsAddingNew(true);
                setEditingId(null);
                form.reset();
              }}
              variant="ghost"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Tambahkan Kupon
            </Button>
          )}
      </div>

      {isAddingNew && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-gray-100 rounded-lg border"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kode Kupon
            </label>
            <Input
              type="text"
              placeholder="Masukan kode kupon anda"
              {...form.register("name")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Persenan Diskon
            </label>
            <Input
              type="number"
              placeholder="Masukan persenan diskon"
              {...form.register("discountPercentage", {
                valueAsNumber: true,
              })}
              className="no-spinner"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {editingId ? "Update Kupon" : "Buat Kupon"}
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6">
        {coupons.length === 0 ? (
          <p className="text-gray-500">Tidak ada kupon yang tersedia.</p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg border"
            >
              <div>
                <h3 className="text-lg font-medium">{coupon.name}</h3>
                <p className="text-gray-600">{coupon.discountPercentage}% discount</p>
                <p className="text-sm text-gray-500">
                  Status: {coupon.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingNew(true);
                    setEditingId(coupon.id);
                    form.setValue("name", coupon.name);
                    form.setValue("discountPercentage", coupon.discountPercentage);
                    form.setValue("isActive", coupon.isActive);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteCoupon(coupon.id)}
                  className="text-red-500 border-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponManagement;
