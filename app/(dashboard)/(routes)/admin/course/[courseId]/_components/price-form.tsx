"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number(),
});

const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const togleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        },
    });
    
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Harga Kursus berhasil diperbarui!");
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
            Harga Kursus
            <Button onClick={togleEdit} variant="ghost">
                {isEditing ? (
                    <>Kembali</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Harga
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <div className={cn(
                "text-sm mt-2",
                !initialData.price && "text-slate-500 italic"
            )}>
                {initialData.price 
                    ? formatPrice(initialData.price) 
                    : "Harga belum ditentukan"
                }
            </div>
        )}
        {isEditing && (
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-4 mt-4"
                > 
                    <FormField 
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        disabled={isSubmitting}
                                        placeholder="Tentukan harga kursus anda"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button 
                            type="submit" 
                            disabled={!isValid || isSubmitting}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
  )
}

export default PriceForm