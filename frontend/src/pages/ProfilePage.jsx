import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import avatar from '../../public/images/avatar.png';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, isCheckingAuth} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      // Call the updateProfile function with the base64 image  
      await updateProfile({ profilePicture: base64Image });
    }
  };


  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="rounded-xl p-6 space-y-8 bg-gradient-to-t from-dijon-100/30 to-brown-500/10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-brown-900">Profile</h1>
            <p className="mt-2 text-brown-700">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePicture || avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-brown-400"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content border-2 border-solid border-white hover:scale-105 hover:border-2 hover:border-yellow-200 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-dijon-600">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-brown-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-brown-500/10 rounded-lg border border-brown-400/30">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-brown-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-brown-500/10 rounded-lg border border-brown-400/30">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-brown-500/10 rounded-xl p-6 border-brown-400/30 border">
            <h2 className="text-lg font-medium  mb-4 text-brown-900">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-brown-400">
                <span className="text-brown-700">Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-brown-700">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage