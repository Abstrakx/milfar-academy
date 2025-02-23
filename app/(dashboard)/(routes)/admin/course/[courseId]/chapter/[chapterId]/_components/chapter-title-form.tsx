"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, X, Badge, ChevronRight, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Judul minimal 3 karakter ya!",
  }),
});

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Judul Chapter berhasil diperbarui!");
      toggleEdit();
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
    <Card className="bg-white mt-6">
      <CardContent className="p-0">
        <div className="relative">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-800">Judul Chapter</h3>
                <Badge className="text-blue-700">
                  Required
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Ini akan ditampilkan sebagai judul Chapter kursus Anda.</p>
            </div>
            
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="hover:bg-blue-50"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Title
              </Button>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            {!isEditing ? (
              <div className="group relative">
                <div className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <p className="text-lg text-gray-700 font-medium">
                    {initialData.title || "No chapter title set"}
                  </p>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Contoh: Perkenalan"
                            className="h-12 text-lg font-medium px-4 border-gray-200 rounded-lg 
                                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                     placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsEditing(false)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Batalkan
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterTitleForm;
