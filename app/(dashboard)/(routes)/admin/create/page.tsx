'use client';

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Judul Diperlukan",
    }),
});

const CreatePage = () => {
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
        await axios.post("/api/courses", values);
        router.push("/admin/course/$(response.data.id)");
    } catch (error : any) {
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
    <div className="h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 px-4 sm:px-6 lg:px-8">
          {/* Left Side - Main Form */}
          <div className="flex-1">
            <Card className="shadow-xl border-0 bg-white rounded-xl mt-6">
              <CardHeader className="pb-4 space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Beri Nama untuk Kursus Baru
                  </h1>
                </div>
                <p className="text-lg text-gray-500 mt-4 leading-relaxed pt-2">
                  Apa nama yang ingin Anda berikan untuk kursus ini? Jangan khawatir, Anda bisa mengubahnya kapan saja nanti.
                </p>
              </CardHeader>
              
              <CardContent className="pt-3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-base font-semibold text-gray-700">
                            Judul Kursus
                          </FormLabel>
                          <FormControl>
                            <Input 
                              disabled={isSubmitting}
                              placeholder="Contoh: Budidaya perkebunan Sawit."
                              className="h-12 text-lg transition-all duration-200 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm text-gray-500">
                            Beri nama untuk kursus baru Anda. Nama yang baik akan membantu peserta memahami isi kursus.
                          </FormDescription>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center gap-x-4 pt-4">
                      <Link href="/" className="w-full sm:w-auto">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto h-12 text-base font-medium border-gray-200 hover:bg-gray-50 transition-all duration-200"
                        >
                          Batal
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="w-full sm:w-auto h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm"
                      >
                        {isSubmitting ? 'Menyimpan...' : 'Buat Kursus'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Tips & Information */}
          <div className="hidden lg:block w-80 mt-6">
            <Card className="bg-blue-50 border-0 shadow-none sticky top-6">
              <CardHeader>
                <h2 className="text-lg font-semibold text-blue-900">Tips Membuat Kursus</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-blue-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-sm">Gunakan judul yang jelas dan menggambarkan isi kursus</p>
                  </li>
                  <li className="flex gap-3 text-blue-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-sm">Pastikan judul relevan dengan target peserta Anda</p>
                  </li>
                  <li className="flex gap-3 text-blue-700">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-sm">Hindari penggunaan kata-kata yang terlalu umum</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;