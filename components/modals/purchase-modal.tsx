"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

interface PurchaseModalProps {
  children: React.ReactNode;
  onBuyNow: () => void;
  onContactAdmin: () => void;
  courseTitle: string;
  coursePrice: string;
}

const PurchaseModal = ({
  children,
  onBuyNow,
  onContactAdmin,
  courseTitle,
  coursePrice,
}: PurchaseModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-500" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle>Akses Membutuhkan Pembelian</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-4">
          <p>
            Untuk mengakses kursus <strong>{courseTitle}</strong>, Anda perlu melakukan pembelian sebesar{" "}
            <strong>{coursePrice}</strong>.
          </p>
          <p>
            Setelah pembelian, Anda akan mendapatkan:
            <ul className="list-disc pl-6 mt-2">
              <li>Akses seumur hidup ke materi kursus</li>
              <li>Update materi terbaru</li>
              <li>Akses ke grup diskusi</li>
              <li>Sertifikat penyelesaian</li>
            </ul>
          </p>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onContactAdmin}>
            Hubungi Admin
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onBuyNow}
            className="bg-green-600 hover:bg-green-700"
          >
            Beli Sekarang
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PurchaseModal;