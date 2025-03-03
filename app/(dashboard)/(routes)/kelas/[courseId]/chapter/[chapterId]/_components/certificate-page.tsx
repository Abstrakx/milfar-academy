"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import CertificateModal from './course-certificate';

interface CertificatePageProps {
    name: string;
    courseTitle: string;
  }
  

export default function CertificatePage({ name, courseTitle }: CertificatePageProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="text-center">
      <Button
        onClick={() => setShowModal(true)}
        className="w-auto"  
      >
        Sertifikat
      </Button>

      <CertificateModal isOpen={showModal} onClose={() => setShowModal(false)} name={name} courseTitle={courseTitle} />
    </div>
  );
}
