"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import toast from "react-hot-toast";

interface ImageFormProps {
    initialData: Article;
    articleId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(3, {
        message: "Gambar Diperlukan",
    }),
});

const ImageForm = ({
    initialData,
    articleId
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const togleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/article/${articleId}`, values);
            toast.success("Gambar artikel berhasil diperbarui!");
            togleEdit();
            router.refresh();
        } catch (error: any) {
            if (error.response) {
                toast.error(`Server responded with ${error.response.status} error`);
            } else if (error.request) {
                toast.error("No response received from the server");
            } else {
                toast.error("Error: ${error.message}");
            }
            
        }
    };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Gambar Artikel
            <Button onClick={togleEdit} variant="ghost">
                {isEditing && (
                    <>Kembali</>
                )}

                {!isEditing && !initialData.imageUrl && (
                    <>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Tambahkan Gambar 
                    </>
                )}
                     
                {!isEditing && initialData.imageUrl && (
                    <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Gambar 
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            !initialData.imageUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon 
                        className="h-10 w-10 text-slate-500"
                    />
                </div>
            ) : (
                <div className="relative aspect-video mt-2">
                    <Image 
                        alt="Uploaded Image"
                        fill
                        className="rounded-md"
                        src={initialData.imageUrl} 
                    />
                </div>
            )
        )}

        {isEditing && (
            <div>
                <FileUpload 
                    endpoint="courseImage"
                    onChange={(url) => {
                        if (url) {
                            onSubmit({ imageUrl: url });
                        }
                    }}
                />
            </div>
        )}
    </div>
  )
}

export default ImageForm