"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import EditUserNameModal from './course-profile';

interface User {
  userId: string;
  name: string;
}

const ProfilePage = ({userId, name}: User) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="text-center">
      <Button onClick={() => setShowModal(true)}>
        Edit Sertifikat
      </Button>

      {showModal && (
        <EditUserNameModal
          userId={userId}
          userName={name}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
