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

      toast.success("Course Category updated");
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
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800">Course Category</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Organize your course by selecting or creating a category
              </CardDescription>
            </div>
          </div>
          
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <Pencil className="w-4 h-4" />
              Edit Category
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            {selectedOption ? (
              <>
                <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {selectedOption.label}
                </Badge>
                <span className="text-sm text-gray-500">Current category</span>
              </>
            ) : (
              <p className="text-sm text-gray-500 italic">No category selected</p>
            )}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                {!isAddingNewCategory ? (
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Combobox
                            options={options || []}
                            disabled={isSubmitting}
                            {...field}
                          />
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
                            placeholder="Enter new category name..."
                            disabled={isSubmitting}
                            className="border-gray-200 focus:ring-blue-500"
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
                  onClick={() => setIsAddingNewCategory(prev => !prev)}
                  className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  {isAddingNewCategory ? (
                    <>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to existing categories
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create new category
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Category"}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAddingNewCategory(false);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

export default CategoryForm;