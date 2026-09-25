"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, FlaskConical } from "lucide-react";
import { getLocal } from "@/lib/utils";

export default function Header() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const update = () => {
      const cart = getLocal("cart", []);
      setCartCount(cart.length);
      setUser(getLocal("currentUser"));
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("cartUpdated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cartUpdated", update);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <FlaskConical className="text-white" size={20} />
          </div>
          <div>
            <span className="font-bold text-navy text-lg">HomeLab GH</span>
            <p className="text-xs text-gray-500 -mt-1">lab service</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/tests" className="hover:text-primary">Tests</Link>
          <Link href="/book-test" className="hover:text-primary">Book Appointment</Link>
          {user && <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>}
          {user && <Link href="/my-results" className="hover:text-primary">My Results</Link>}
          {isAdmin && <Link href="/admin" className="hover:text-primary">Admin</Link>}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/tests" className="relative p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary">
              <User size={18} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}