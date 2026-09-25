"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, MapPin, Eye, EyeOff, FlaskConical } from "lucide-react";
import { getLocal, setLocal } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    location: "Accra",
    terms: false,
  });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.terms) {
      showToast("Please agree to Terms & Privacy Policy", "error");
      return;
    }
    const users = getLocal("users", []);
    if (users.find((u) => u.email === form.email || u.phone === form.phone)) {
      showToast("Account already exists", "error");
      return;
    }
    const user = { ...form, id: Date.now() };
    users.push(user);
    setLocal("users", users);
    setLocal("currentUser", user);
    localStorage.removeItem("isAdmin");
    showToast("Account created successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2 border border-gray-100">
        {/* Left - Form */}
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-[#0D6EFD] rounded-xl flex items-center justify-center">
              <FlaskConical className="text-white" size={22} />
            </div>
            <span className="font-bold text-xl text-[#0A1931]">HomeLab GH</span>
          </div>

          <h1 className="text-2xl font-bold text-[#0A1931]">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Join thousands across Ghana for home lab tests.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center gap-1.5 px-3 border border-r-0 border-gray-200 rounded-l-xl bg-[#E8F0FE] text-sm font-medium text-gray-700">
                  🇬🇭 +233
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="20 000 0000"
                  className="flex-1 px-3 py-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-[#0D6EFD] outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Home Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] outline-none text-sm appearance-none bg-white"
                >
                  <option>Accra</option>
                  <option>Tema</option>
                  <option>Kumasi</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#0D6EFD]"
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <span className="text-[#0D6EFD] font-medium">Terms & Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white py-3.5 rounded-xl font-semibold text-sm transition shadow-md shadow-blue-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-5 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0D6EFD] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right - Benefits Panel */}
        <div className="bg-[#0B3EBE] text-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-6xl">🧪</div>
            <div className="absolute bottom-20 left-10 text-5xl">🩺</div>
            <div className="absolute top-1/2 right-1/4 text-4xl">💉</div>
          </div>

          <h2 className="text-2xl font-bold mb-8 relative z-10">Why choose HomeLab GH?</h2>

          <div className="space-y-7 relative z-10">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Home Collection</h3>
                <p className="text-sm text-blue-100 mt-0.5 leading-relaxed">
                  We come to you — blood draw & samples collected at your home.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
                <span className="text-xl">⏱️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Fast Results 24hrs</h3>
                <p className="text-sm text-blue-100 mt-0.5 leading-relaxed">
                  Receive your test results within 24 hours securely online.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Trusted Labs</h3>
                <p className="text-sm text-blue-100 mt-0.5 leading-relaxed">
                  Partnered with certified labs across Ghana for reliable, accurate results.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-xs text-blue-200 relative z-10 flex items-center gap-2">
            🔒 Secure • HIPAA-compliant • Licensed in Ghana
          </p>
        </div>
      </div>
    </div>
  );
}