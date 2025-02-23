"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const AuthModal = ({ error }: { error?: string | string[] }) => {
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (error) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            router.push('/');
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      const redirectTimer = setTimeout(() => {
        router.push('/');
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [error, router]);

  const getMessage = () => {
    switch (error?.toString()) {
      case 'unauthorized':
        return 'Harap login untuk mengakses fitur ini!';
      case 'admin_required':
        return 'Anda harus memiliki akses admin untuk masuk ke halaman ini!';
      default:
        return 'Terjadi kesalahan autentikasi';
    }
  };

  const handleRedirect = () => {
    router.push('/');
  };

  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Akses Ditolak</AlertTitle>
            <AlertDescription>
              {getMessage()}
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2" />
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Redirect otomatis dalam {Math.ceil((100 - progress) / 20)} detik...
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            onClick={handleRedirect}
            variant="default"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthModal;