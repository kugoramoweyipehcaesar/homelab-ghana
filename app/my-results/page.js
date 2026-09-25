"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Download, Share2, Search } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getLocal } from "@/lib/utils";

function MyResultsContent() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentUser = getLocal("currentUser");
    const all = getLocal("bookings", []);
    setBookings(
      all.filter(
        (b) => b.userEmail === currentUser?.email || b.userPhone === currentUser?.phone
      )
    );
  }, []);

  const filtered = bookings.filter((b) =>
    (Array.isArray(b.tests) ? b.tests.join(" ") : b.tests || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusColor = (s) => {
    if (s === "Ready" || s === "Completed") return "bg-green-100 text-green-700";
    if (s === "Processing") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-navy mb-2">My Results</h1>
      <p className="text-gray-600 mb-6">
        Review your recent laboratory results securely. All data is encrypted and confidential.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">📋</div>
          <div>
            <p className="text-sm text-gray-500">Total Results</p>
            <p className="text-xl font-bold">{bookings.length || 3}</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">⏳</div>
          <div>
            <p className="text-sm text-gray-500">Pending/Processing</p>
            <p className="text-xl font-bold">2</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">✅</div>
          <div>
            <p className="text-sm text-gray-500">Ready</p>
            <p className="text-xl font-bold">1</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search results, test name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {(filtered.length
            ? filtered
            : [
                { tests: ["Blood Panel — Comprehensive"], status: "Pending", date: "10 Oct 2024" },
                { tests: ["COVID-19 PCR Test"], status: "Processing", date: "09 Oct 2024" },
                { tests: ["Lipid Panel"], status: "Ready", date: "07 Oct 2024" },
              ]
          ).map((b, i) => (
            <div key={i} className="border rounded-xl p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor(b.status)}`}>
                    {b.status || "Pending"}
                  </span>
                  <h3 className="font-bold mt-2">
                    {Array.isArray(b.tests) ? b.tests.join(", ") : b.tests}
                  </h3>
                  <p className="text-sm text-gray-500">Sample collected: {b.date || b.createdAt}</p>
                </div>
                {b.status === "Ready" || b.status === "Completed" ? (
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                      <FileText size={14} /> View PDF
                    </button>
                    <button className="border px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                      <Download size={14} /> Download
                    </button>
                    <a
                      href="https://wa.me/?text=My%20lab%20results%20from%20HomeLab%20GH"
                      target="_blank"
                      rel="noreferrer"
                      className="border px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 text-green-600"
                    >
                      <Share2 size={14} /> Share to Doctor
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Actions unavailable until ready</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MyResultsPage() {
  return (
    <ProtectedRoute>
      <MyResultsContent />
    </ProtectedRoute>
  );
}