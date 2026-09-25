"use client";

import { useRouter } from "next/navigation";
import { Calendar, Home, FileText, CheckCircle, Shield, Award, Users } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      {/* Hero Section - matches image exactly */}
      <section className="bg-gradient-to-br from-[#E8F0FE] via-blue-50 to-teal-50 py-14 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full text-sm mb-5 shadow-sm border border-gray-100">
              <span className="text-base">🇬🇭</span>
              <span className="font-medium text-gray-700">Serving Ghana | Accra • Kumasi • Tema</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A1931] leading-[1.15] tracking-tight">
              We Come To You<br />
              <span className="text-[#0A1931]">Sample to Result</span>
            </h1>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-lg">
              Professional medical sample collection at your home or office. Trusted, safe, and reliable lab testing across Ghana. Results delivered in 24–48 hours via our secure app.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/book-test")}
                className="bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2.5 shadow-lg shadow-blue-200 transition"
              >
                <Calendar size={18} /> Book Now
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-[#0D6EFD] text-[#0D6EFD] px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2"
              >
                ▶ Learn How It Works
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-green-500" /> Ghana Health Service Licensed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-green-500" /> Certified Labs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-green-500" /> Secure & Confidential
              </span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 h-80 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-28 h-28 bg-[#0D6EFD] rounded-full mx-auto flex items-center justify-center text-5xl mb-4 shadow-lg">
                    👩‍⚕️
                  </div>
                  <p className="font-semibold text-[#0A1931] text-lg">Certified Phlebotomist</p>
                  <p className="text-sm text-gray-500 mt-1">Ready to visit your home</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-2 bg-white px-3.5 py-1.5 rounded-full shadow-md text-sm font-medium flex items-center gap-1.5 border border-gray-100">
              🇬🇭 Now available across Ghana
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0A1931]">How It Works</h2>
          <p className="text-gray-500 mt-2">Get tested from the comfort of your home in 3 simple steps</p>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8F0FE] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[#0D6EFD]" size={28} />
              </div>
              <h3 className="font-bold text-lg text-[#0A1931]">1. Book Appointment</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Choose your test and schedule a visit online or via phone. We confirm instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8F0FE] rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-[#0D6EFD]" size={28} />
              </div>
              <h3 className="font-bold text-lg text-[#0A1931]">2. Home Visit & Sample</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Our certified phlebotomist visits your home, collects the sample safely & hygienically.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8F0FE] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-[#0D6EFD]" size={28} />
              </div>
              <h3 className="font-bold text-lg text-[#0A1931]">3. Results via App</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Lab analyzes your sample & results are delivered securely to your phone within 24–48hrs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted & Certified */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-500 mb-5 uppercase tracking-wide">Trusted & Certified</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <Shield size={16} className="text-[#0D6EFD]" /> Licensed by Ghana Health Service
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <Award size={16} className="text-[#0D6EFD]" /> ISO 15189 Certified Lab
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <Shield size={16} className="text-[#0D6EFD]" /> Secure, Confidential Results
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <Users size={16} className="text-[#0D6EFD]" /> 5000+ Samples Collected
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}