"use client";

import { useState } from "react";
import { Mail, Phone, X, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EditProfileModal from '@/components/global/profile/EditProfileModal';

type ProfileProps = {
  fullName: string;
  email: string;
  phoneNo: string;
  trips: number;
  yearsActive: number;
  avatarUrl: string;
  username: string;
  token: string;
};

export default function Profile({
  fullName,
  email,
  username,
  phoneNo,
  trips,
  yearsActive,
  avatarUrl,
  token,
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-emerald-100">
        
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-emerald-700 to-green-600" />

        {/* Content */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-10 left-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow">
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="pt-14 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="md:ml-28">
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-sm text-emerald-700 font-medium">@{username}</p>

              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Mail size={14} /> {email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} /> {phoneNo}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="self-start px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <Stat value={trips.toString()} label="Treks" />
            <Stat value={`${yearsActive <= 0 ? "Less than a " : yearsActive} year`} label="Active" />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditProfileModal
          initialData={{ fullName, username, phoneNo, email }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

// --- Sub Components ---

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-emerald-50 rounded-lg p-3">
      <p className="text-lg font-bold text-emerald-800">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

