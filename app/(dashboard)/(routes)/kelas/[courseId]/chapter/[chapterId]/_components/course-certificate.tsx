'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificateTemplate from './certificate-template';
import { Check, Loader2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  courseTitle: string;
}

const CertificateModal = ({ 
  isOpen, 
  onClose, 
  name,
  courseTitle
}: CertificateModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'confirm' | 'download'>('confirm');
  const completionDate = new Date().toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleConfirm = () => {
    setStep('download');
  };

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      setStep('confirm');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setStep('confirm');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {step === 'confirm' ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Konfirmasi Sertifikat</h2>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start mb-6">
                <div className="text-amber-500 mr-2 mt-1 flex-shrink-0">⚠️</div>
                <p className="text-sm text-amber-800">
                  Jika nama Anda tidak sesuai, silakan edit nama Anda di tombol profile sebelum melanjutkan.
                </p>
            </div>

            <div className="space-y-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 mb-2">Sertifikat Anda akan dibuat atas nama:</p>
                <p className="text-xl font-bold text-blue-800">{name}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2 w-full">
                <button 
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 text-center">Sertifikat Siap Diunduh</h2>
            
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Selamat! Anda telah menyelesaikan kursus:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <p className="font-semibold">{courseTitle}</p>
              </div>
              <p className="text-sm text-gray-500">Tanggal: {completionDate}</p>
            </div>

            <PDFDownloadLink
              document={<CertificateTemplate name={name} courseTitle={courseTitle} completionDate={completionDate} />}
              fileName={`certificate-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`}
              onClick={handleDownload}
              className="block w-full"
            >
              {({ loading }) => (
                <button
                  disabled={loading || isGenerating}
                  className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                    ${(loading || isGenerating)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {loading || isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {loading ? 'Generating PDF...' : 'Processing...'}
                    </>
                  ) : (
                    'Download Sertifikat'
                  )}
                </button>
              )}
            </PDFDownloadLink>
          </>
        )}
      </div>
    </div>
  );
}

export default CertificateModal;