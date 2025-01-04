"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Judul Diperlukan",
    }),
});

const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const togleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Judul kursus berhasil diperbarui!");
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
            Judul Kursus
            <Button onClick={togleEdit} variant="ghost">
                {isEditing ? (
                    <>Kembali</>
                ) : (
                    <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit judul
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <div className="text-sm mt-2">
                {initialData.title}
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder="Contoh: Budidaya perkebunan Sawit."
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

export default TitleForm