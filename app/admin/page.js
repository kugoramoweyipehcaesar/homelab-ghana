"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, Users, TestTube, Upload, CreditCard,
  UserCog, Settings, Search, Bell, Plus, Edit2, UserPlus, Check
} from "lucide-react";
import { checkAdmin } from "@/lib/auth";
import { getLocal, setLocal } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

export default function AdminPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [prices, setPrices] = useState({
    CBC: 50,
    "Lipid Panel": 80,
    "COVID-19 PCR": 120,
    HbA1c: 60,
  });
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") === "true") {
      setIsLoggedIn(true);
    }
    const b = getLocal("bookings", []);
    setBookings(
      b.length
        ? b
        : [
            { id: 1, clientName: "Kwame Oppong", address: "Accra, East Legon", tests: ["CBC", "Lipid Panel"], time: "09:30 AM", status: "Pending" },
            { id: 2, clientName: "Abena Serwaa", address: "Kumasi, KNUST Campus", tests: ["COVID-19 PCR"], time: "10:15 AM", status: "Confirmed" },
            { id: 3, clientName: "Ibrahim Musa", address: "Tema, Community 11", tests: ["HbA1c"], time: "11:00 AM", status: "Awaiting Sample" },
            { id: 4, clientName: "Grace Boateng", address: "Cape Coast, Victoria Park", tests: ["Malaria Test"], time: "11:42 AM", status: "Pending" },
          ]
    );
    const saved = getLocal("testPrices", {});
    if (Object.keys(saved).length) setPrices((prev) => ({ ...prev, ...saved }));
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (checkAdmin(email, password)) {
      localStorage.setItem("isAdmin", "true");
      setLocal("currentUser", { email, fullName: "Dr. Ama Mensah", role: "admin" });
      setIsLoggedIn(true);
      showToast("Admin access granted");
    } else {
      showToast("Invalid admin credentials", "error");
    }
  };

  const updatePrices = () => {
    const current = getLocal("testPrices", {});
    const updated = { ...current, ...prices };
    setLocal("testPrices", updated);
    showToast("Test prices updated successfully");
  };

  const updateStatus = (id, status) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    setLocal("bookings", updated);
    showToast(`Booking ${status}`);
  };

  const uploadResults = () => {
    if (!bookings.length) {
      showToast("No bookings to update", "error");
      return;
    }
    const updated = bookings.map((b, i) => (i === 0 ? { ...b, status: "Ready" } : b));
    setBookings(updated);
    setLocal("bookings", updated);
    showToast("Results uploaded & client notified");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-navy text-center mb-6">Admin Login</h1>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 mt-1"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-medium">
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "bookings", icon: Calendar, label: "Bookings" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "catalog", icon: TestTube, label: "Test Catalog" },
    { id: "upload", icon: Upload, label: "Results Upload" },
    { id: "payments", icon: CreditCard, label: "Payments" },
    { id: "staff", icon: UserCog, label: "Staff" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-navy text-white flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-gray-700">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center font-bold">HL</div>
          <div>
            <p className="font-bold">HomeLab GH</p>
            <p className="text-xs text-gray-400">Laboratory Service</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                activeTab === item.id ? "bg-primary" : "hover:bg-gray-800"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center text-sm">AM</div>
          <div>
            <p className="text-sm font-medium">Dr. Ama Mensah</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of today&apos;s laboratory operations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                placeholder="Search bookings, clients, tests..."
                className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64"
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1">
              <Plus size={16} /> New Booking
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Today&apos;s Bookings</p>
            <p className="text-3xl font-bold text-navy">12</p>
            <p className="text-xs text-green-600">+2 from yesterday ↑ 16.7%</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Revenue in GHC</p>
            <p className="text-3xl font-bold text-navy">3,240</p>
            <p className="text-xs text-green-600">+GHC 420 today ↑ 12.9%</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Pending Samples</p>
            <p className="text-3xl font-bold text-navy">8</p>
            <p className="text-xs text-orange-500">⚠ urgent samples 3</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Pending Results</p>
            <p className="text-3xl font-bold text-navy">5</p>
            <p className="text-xs text-gray-500">Avg. turnaround: 4h 12m</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-navy">New Bookings</h2>
              <button className="text-sm text-primary">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Client Name</th>
                    <th className="pb-2">Address</th>
                    <th className="pb-2">Tests</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{b.clientName}</td>
                      <td className="py-3 text-gray-600">{b.address}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(b.tests) ? b.tests : [b.tests]).map((t) => (
                            <span key={t} className="bg-blue-50 text-primary text-xs px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3">{b.time}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            b.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : b.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button onClick={() => showToast("Edit mode")} className="p-1.5 hover:bg-gray-100 rounded">
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, "Confirmed")}
                            className="p-1.5 hover:bg-gray-100 rounded text-blue-600"
                          >
                            <UserPlus size={14} />
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, "Approved")}
                            className="p-1.5 hover:bg-gray-100 rounded text-green-600"
                          >
                            <Check size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <Edit2 size={16} /> Edit Test Prices
              </h3>
              {Object.entries(prices).map(([name, price]) => (
                <div key={name} className="flex items-center justify-between mb-2">
                  <span className="text-sm">{name}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrices((prev) => ({ ...prev, [name]: Number(e.target.value) }))
                      }
                      className="w-16 border rounded px-2 py-1 text-sm text-right"
                    />
                    <span className="text-xs text-gray-500">GHC</span>
                  </div>
                </div>
              ))}
              <button onClick={updatePrices} className="w-full mt-3 bg-primary text-white py-2 rounded-lg text-sm">
                Update Prices
              </button>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <Upload size={16} /> Upload Results PDF
              </h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500 mb-3">
                Drag & drop PDF here<br />or click to browse • Max 10MB
              </div>
              <button onClick={uploadResults} className="w-full bg-primary text-white py-2 rounded-lg text-sm">
                Upload & Notify Client
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}