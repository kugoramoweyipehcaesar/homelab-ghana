"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, MapPin, Eye, EyeOff } from "lucide-react";
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              HL
            </div>
            <span className="font-bold text-xl text-navy">HomeLab GH</span>
          </div>
          <h1 className="text-2xl font-bold text-navy">Create Account</h1>
          <p className="text-sm text-gray-500 mb-6">Join thousands across Ghana for home lab tests.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative mt-1 flex">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-lg bg-gray-50 text-sm">
                  🇬🇭 +233
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="20 000 0000"
                  className="flex-1 px-3 py-2.5 border rounded-r-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Create Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Home Location</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg appearance-none"
                >
                  <option>Accra</option>
                  <option>Tema</option>
                  <option>Kumasi</option>
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              I agree to the <span className="text-primary">Terms & Privacy Policy</span>
            </label>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>

        <div className="bg-primary text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Why choose HomeLab GH?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">🏠</div>
              <div>
                <h3 className="font-bold">Home Collection</h3>
                <p className="text-sm text-blue-100">We come to you — blood draw & samples collected at your home.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">⏱️</div>
              <div>
                <h3 className="font-bold">Fast Results 24hrs</h3>
                <p className="text-sm text-blue-100">Receive your test results within 24 hours securely online.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">🛡️</div>
              <div>
                <h3 className="font-bold">Trusted Labs</h3>
                <p className="text-sm text-blue-100">Partnered with certified labs across Ghana for reliable, accurate results.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-blue-200">🔒 Secure • HIPAA-compliant • Licensed in Ghana</p>
        </div>
      </div>
    </div>
  );
}