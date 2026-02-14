"use client";

import { useState } from "react";
import { Mail, Phone, X, Save, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/zustand-store";

type EditModalProps = {
  initialData: { fullName: string; username: string; phoneNo: string; email: string };
  onClose: () => void;
};

export default function EditProfileModal({ initialData, onClose }: EditModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  // Optional: Local error state for inline validation messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (formData.username.length < 3) newErrors.username = "Username must be at least 3 chars";
    
    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNo) {
        newErrors.phoneNo = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNo.replace(/\D/g, ''))) {
        // This regex removes non-digits before checking length
        // You can adjust strictly based on your needs
        newErrors.phoneNo = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Client-side Validation
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        username: formData.username,
        phoneNo: formData.phoneNo,
      };

      const token = Cookies.get("session");
      if (!token) throw new Error("Session expired. Please login again.");

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // 2. Server-side Error Handling
      if (!res.ok) {
        // Throwing error here sends code execution to the catch block
        throw new Error(data.message || "Failed to update profile");
      }

      // 3. Success Handling
      toast.success("Profile updated successfully!");
      
      const { user, setUser } = useAuthStore.getState();
      setUser({
        ...user,
        name: data.user.fullName,
        username: data.user.username,
        phone: data.user.phoneNo,
      });
      
      router.refresh();
      onClose(); 

    } catch (error: any) {
      console.error("Profile Update Error:", error);
      // Display the specific error message
      toast.error(error.message || "Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Changed animate-in to prevent layout shifts */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.fullName 
                  ? "border-red-300 focus:ring-red-200 bg-red-50" 
                  : "border-gray-300 focus:ring-emerald-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                errors.username 
                  ? "border-red-300 focus:ring-red-200 bg-red-50" 
                  : "border-gray-300 focus:ring-emerald-500"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.username}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.phoneNo
                    ? "border-red-300 focus:ring-red-200 bg-red-50" 
                    : "border-gray-300 focus:ring-emerald-500"
                }`}
                />
            </div>
            {errors.phoneNo && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.phoneNo}
              </p>
            )}
          </div>
          
           {/* Read Only Email */}
           <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email (Cannot be changed)</label>
            <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                value={formData.email}
                readOnly
                className="w-full pl-9 pr-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed select-none"
                />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}