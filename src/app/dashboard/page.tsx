import { authAdmin } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import User from "@/models/User";
import dbConnect from '@/lib/dbConnect';
import LogoutButton from "./LogoutButton";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  await dbConnect();

  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    redirect('/login');
  }

  const user = await User.findOne({}).sort({ createdAt: -1 });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border">
          <p className="text-slate-600 mb-4">No user found in Database.</p>
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up here →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Trekly.
          </span>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Verification Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Manage your account and database synchronization.</p>
        </header>

        <div className="grid gap-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
                System Status: Verified
              </span>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{user.username}</h2>
                  <p className="text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Firebase UID</p>
                  <p className="font-mono text-sm bg-slate-50 p-2 rounded border border-slate-100 text-slate-700 break-all">
                    {user.firebaseId}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">MongoDB ID</p>
                  <p className="font-mono text-sm bg-slate-50 p-2 rounded border border-slate-100 text-slate-700">
                    {user._id.toString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                Data synced from Trekly Cluster-01 • Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}