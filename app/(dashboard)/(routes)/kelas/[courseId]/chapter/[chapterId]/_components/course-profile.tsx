'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface EditUserNameModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

const EditUserNameModal: React.FC<EditUserNameModalProps> = ({ userId, userName, onClose }) => {
  const [name, setName] = useState(userName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`/api/certificate`, { id: userId, name });
      toast.success("Nama anda diperbarui!");
      onClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Server responded with ${error.response?.status} error`);
      } else {
        toast.error("Terjadi kesalahan saat memperbarui nama");
      }
    }
    setLoading(false);
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Nama Sertifikat</DialogTitle>
          <DialogDescription>Silakan perbarui nama anda untuk sertifikat di bawah ini.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserNameModal;
