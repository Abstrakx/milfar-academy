"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  whatsappGroup: z.string().url({ message: "Masukkan link WhatsApp yang valid!" }).optional(),
});

interface WhatsappGroupFormProps {
  initialData: {
    whatsappGroup?: string;
  };
  courseId: string;
}

const WhatsappGroupForm = ({ initialData, courseId }: WhatsappGroupFormProps) => {
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
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Grup WhatsApp berhasil diperbarui!");
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
    <div className="mt-6 bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Grup WhatsApp
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Kembali</> : <><Pencil className="h-4 w-4 mr-2" /> Edit Link</>}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 dark:text-gray-300">
          {initialData?.whatsappGroup ? (
            <a href={initialData.whatsappGroup} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {initialData.whatsappGroup}
            </a>
          ) : (
            "Belum ada grup WhatsApp"
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 dark:text-gray-300">
            <FormField
              control={form.control}
              name="whatsappGroup"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="https://chat.whatsapp.com/xxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
};

export default WhatsappGroupForm;
