"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { checkAdmin } from "@/lib/auth";
import { getLocal, setLocal } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
            HL
          </div>
          <h1 className="text-2xl font-bold text-navy">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
            🇬🇭 Ghana • Home Collection Service
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email or Phone +233</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email or +233 24 000 0000"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
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
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button className="w-full border py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src="https://www.google.com/favicon.ico" alt="G" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-6 flex justify-center gap-4 text-xs text-gray-500">
          <span>🔒 Secure & Encrypted</span>
          <span>🛡️ Ghana Health Service Certified</span>
        </div>
      </div>
    </div>
  );
}