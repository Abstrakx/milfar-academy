"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course, Chapter } from "@prisma/client";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

import ChaptersList from "./chapter-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Kursus berhasil diperbarui!");
      toggleCreating();
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

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reoder`, {
        list: updateData,
      });
      toast.success("Chapter Kursus reordered!");
      router.refresh();
    } catch (error: any) {
      if (error.response) {
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/admin/course/${courseId}/chapter/${id}`)
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapter Kursus
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? <>Kembali</> : <><PlusCircle className="h-4 w-4 mr-2" /> Tambahkan Chapter</>}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Contoh: 'Pengenalan kursus kita...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters found"}

          <ChaptersList
            onEdit={onEdit}
            onReoder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
    </div>
  );
};

export default ChaptersForm;
