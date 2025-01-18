"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";  
import Editor from "@/components/editor";
import { Chapter } from "@prisma/client";

interface ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(0, {
        message: "Deskripsi Diperlukan",
    }),
});

const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterDescriptionFormProps) => {
    const [content, setContent] = useState(initialData?.description || "");
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
                description: content
            });
            toast.success("Deskripsi Chapter Kursus berhasil diperbarui!");
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
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium">
                Deskripsi Chapter Kursus
            </div>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-4 mt-4"
                > 
                    <FormField 
                        control={form.control}
                        name="description"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <Editor 
                                        value={content}
                                        onChange={setContent}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            disabled={!isValid || isSubmitting}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ChapterDescriptionForm;