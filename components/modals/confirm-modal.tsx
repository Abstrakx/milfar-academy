"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
};

const ConfirmModal = ({
    children,
    onConfirm
} : ConfirmModalProps) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Apakah anda yakin?
                </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Batalkan
                </AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    Konfirmasi
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal