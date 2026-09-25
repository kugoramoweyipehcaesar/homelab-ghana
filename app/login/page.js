"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { checkAdmin } from "@/lib/auth";
import { getLocal, setLocal } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (checkAdmin(emailOrPhone, password)) {
      localStorage.setItem("isAdmin", "true");
      setLocal("currentUser", {
        email: emailOrPhone,
        fullName: "Dr. Ama Mensah",
        role: "admin",
      });
      showToast("Admin login successful");
      router.push("/admin");
      return;
    }

    const users = getLocal("users", []);
    const user = users.find(
      (u) =>
        (u.email === emailOrPhone || u.phone === emailOrPhone) &&
        u.password === password
    );

    if (user) {
      setLocal("currentUser", user);
      localStorage.removeItem("isAdmin");
      showToast("Login successful");
      router.push("/dashboard");
    } else {
      showToast("Invalid credentials", "error");
    }
  };

  return (
    <div className="min-h-screen auth-bg auth-pattern flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative medical icons in background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <div className="absolute top-20 left-10 text-6xl">🧪</div>
        <div className="absolute top-40 right-20 text-5xl">🩺</div>
        <div className="absolute bottom-32 left-1/4 text-5xl">💉</div>
        <div className="absolute bottom-20 right-1/3 text-6xl">🧬</div>
        <div className="absolute top-1/3 left-1/2 text-4xl">💊</div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] p-8 relative z-10 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#0D6EFD] to-[#0B3EBE] mb-3 shadow-lg">
            <Shield className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1931]">HomeLab GH</h1>
          <h2 className="text-xl font-semibold text-[#0A1931] mt-3">Welcome Back</h2>
          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-sm text-gray-500">
            <span className="text-base">🇬🇭</span>
            <span>Ghana • Home Collection Service</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email or Phone +233
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email or +233 24 000 0000"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent outline-none text-sm bg-gray-50/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent outline-none text-sm bg-gray-50/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#0D6EFD] focus:ring-[#0D6EFD]"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-[#0D6EFD] hover:underline font-medium">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white py-3.5 rounded-xl font-semibold text-sm transition shadow-md shadow-blue-200"
          >
            Login
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400 font-medium">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2.5 hover:bg-gray-50 transition text-sm font-medium text-gray-700">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#0D6EFD] font-semibold hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-8 flex justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-[#0D6EFD]" /> Secure & Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-[#0D6EFD]" /> Ghana Health Service Certified
          </span>
        </div>
      </div>
    </div>
  );
}