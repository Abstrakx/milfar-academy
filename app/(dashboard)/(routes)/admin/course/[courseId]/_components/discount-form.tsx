"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/format";

interface DiscountFormProps {
  initialData: Course;
  courseId: string;
}

const DiscountForm = ({ initialData, courseId }: DiscountFormProps) => {
  
  const formSchema = z.object({
    hasDiscount: z.boolean(),
    discountPrice: z
      .number()
      .min(0)
      .max(initialData.price ?? 100)
      .nullable() 
      .optional(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasDiscount: false,
      discountPrice: null,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const enableDirectDiscount = useWatch({
    control: form.control,
    name: "hasDiscount",
  });

  useEffect(() => {
    if (!enableDirectDiscount) {
      form.setValue("discountPrice", null);
    }
  }, [enableDirectDiscount, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Diskon langsung berhasil diperbarui!");
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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Diskon Kursus
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Kembali</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Diskon
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.discountPrice
            ? `Harga kursus diskon: ${formatPrice(initialData.discountPrice)}`
            : "Tidak ada harga diskon langsung"}
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
              name="hasDiscount"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                    Aktifkan Diskon Langsung.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {form.watch("hasDiscount") && (
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Diskon Langsung</FormLabel>
                    <FormControl>
                    <Input
                      type="number"
                      step="5"
                      disabled={isSubmitting}
                      placeholder="Masukkan potongan diskon langsung"
                      value={field.value ?? ""} 
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? null : parseInt(val)); 
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="no-spinner"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DiscountForm;
