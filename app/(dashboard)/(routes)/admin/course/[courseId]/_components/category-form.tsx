"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, ArrowLeft, Save, Pencil } from 'lucide-react';
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: {
    label: string;
    value: string;
  }[];
}

const formSchema = z.object({
  categoryId: z.string().optional(),
  newCategory: z.string().optional(),
});

const CategoryForm = ({
  initialData,
  courseId,
  options
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
      newCategory: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { setValue } = form;

  useEffect(() => {
    if (isAddingNewCategory) {
      setValue("categoryId", "");
      setValue("newCategory", "");
    } else {
      if (!form.getValues("categoryId")) {
        setValue("categoryId", initialData?.categoryId || "");
      }
    }
  }, [isAddingNewCategory, initialData, setValue]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isAddingNewCategory && values.newCategory) {
        // Create new category
        const newCategoryResponse = await axios.post("/api/categories", {
          name: values.newCategory,
        });

        // Update the course with the new category ID
        await axios.patch(`/api/courses/${courseId}`, {
          categoryId: newCategoryResponse.data.id,
        });
      } else if (values.categoryId) {
        // Update the course with the selected category
        await axios.patch(`/api/courses/${courseId}`, {
          categoryId: values.categoryId,
        });
      }

      toast.success("✨ Kategori kursus berhasil diperbarui");
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

  const selectedOption = options?.find(option => option.value === initialData.categoryId);
  
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        <span>Kategori Kursus</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Kembali</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Kategori
            </>
          )}
        </Button>
      </div>
      
      {!isEditing && (
        <div className="mt-2">
          {!selectedOption ? (
            <p className="text-sm text-gray-500 italic dark:text-gray-300">No category selected</p>
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
              <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500 dark:text-blue-200">
                {selectedOption.label}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-300">Kategori sekarang</span>
            </div>
          )}
        </div>
      )}
  
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 dark:text-gray-300">
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
              {!isAddingNewCategory ? (
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox options={options || []} disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="newCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Masukan kategori baru..."
                          disabled={isSubmitting}
                          className="border-gray-200 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
  
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAddingNewCategory((prev) => !prev)}
                className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-600"
              >
                {isAddingNewCategory ? (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke pilihan kategori
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambahkan kategori baru
                  </>
                )}
              </Button>
            </div>
  
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
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

export default CategoryForm;