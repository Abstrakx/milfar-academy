"use client";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";


const ProfileCreate = async () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (user) {
    try {
        await axios.patch(`/api/profile`, {
            fullName: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
      });
    } catch (error: any) {
      if (error.response) {
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  }
  return (
    <div>
      <h1>Profile Create</h1>
    </div>
  )
}

export default ProfileCreate