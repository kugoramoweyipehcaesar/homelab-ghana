"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, FlaskConical, FileText, Plus, Home, TestTube, Calendar, User } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getLocal } from "@/lib/utils";

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const currentUser = getLocal("currentUser");
    setUser(currentUser);
    const all = getLocal("bookings", []);
    setBookings(
      all.filter(
        (b) => b.userEmail === currentUser?.email || b.userPhone === currentUser?.phone
      )
    );
  }, []);

  if (!user) return null;

  const firstName = user.fullName?.split(" ")[0] || "User";

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen pb-20">
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">HL</div>
          <span className="font-bold">HomeLab GH</span>
        </div>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
          {firstName[0]}
        </div>
      </div>

      <div className="p-4">
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h1 className="text-2xl font-bold text-navy">Hello, {firstName}!</h1>
          <p className="text-sm text-gray-600">Good morning — here is your health overview</p>
          <div className="mt-3 bg-white rounded-lg p-3 flex items-center gap-3">
            <Calendar className="text-primary" size={20} />
            <div>
              <p className="text-sm font-medium">Upcoming Collection Appointment</p>
              <p className="text-xs text-gray-500">Tomorrow, 8:00 AM • Home Collection</p>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-navy mb-3">Test Progress</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle size={20} />
            </div>
            <p className="text-xs mt-1 font-medium">Sample Collected</p>
          </div>
          <div className="flex-1 h-1 bg-blue-200 mx-1"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
              <FlaskConical size={18} />
            </div>
            <p className="text-xs mt-1 font-medium">In Lab</p>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-1"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <FileText size={18} />
            </div>
            <p className="text-xs mt-1 font-medium">Results Ready</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-gray-500">Total Tests</p>
            <p className="text-2xl font-bold text-navy">{bookings.length || 12}</p>
            <p className="text-xs text-green-600">+2 this month</p>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-gray-500">Pending Results</p>
            <p className="text-2xl font-bold text-navy">1</p>
            <p className="text-xs text-orange-500">Expected today</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-navy">Recent Bookings</h2>
          <button onClick={() => router.push("/my-results")} className="text-sm text-primary">
            See all
          </button>
        </div>
        <div className="space-y-2 mb-6">
          {(bookings.length
            ? bookings.slice(0, 3)
            : [
                { tests: ["CBC Panel"], date: "20 Sept 2024", status: "Completed" },
                { tests: ["Lipid Panel"], date: "18 Sept 2024", status: "Completed" },
                { tests: ["Vitamin D Test"], date: "15 Sept 2024", status: "Completed" },
              ]
          ).map((b, i) => (
            <div key={i} className="flex items-center justify-between bg-white border rounded-xl p-3">
              <div>
                <p className="font-medium text-sm">
                  {Array.isArray(b.tests) ? b.tests.join(", ") : b.tests}
                </p>
                <p className="text-xs text-gray-500">{b.date || b.createdAt}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {b.status || "Completed"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/book-test")}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Book New Test
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 max-w-lg mx-auto">
        <button onClick={() => router.push("/dashboard")} className="flex flex-col items-center text-primary text-xs">
          <Home size={20} /> Home
        </button>
        <button onClick={() => router.push("/tests")} className="flex flex-col items-center text-gray-500 text-xs">
          <TestTube size={20} /> Tests
        </button>
        <button onClick={() => router.push("/my-results")} className="flex flex-col items-center text-gray-500 text-xs">
          <Calendar size={20} /> Bookings
        </button>
        <button onClick={() => router.push("/dashboard")} className="flex flex-col items-center text-gray-500 text-xs">
          <User size={20} /> Profile
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}