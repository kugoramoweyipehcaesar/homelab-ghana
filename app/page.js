"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Home, FileText, CheckCircle, Shield, Award, Users } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm mb-4 shadow-sm">
              <span>🇬🇭</span>
              <span>Serving Ghana | Accra • Kumasi • Tema</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
              We Come To You<br />Sample to Result
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Professional medical sample collection at your home or office. Trusted, safe, and reliable lab testing across Ghana. Results delivered in 24–48 hours via our secure app.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/book-test")}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600"
              >
                <Calendar size={18} /> Book Now
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-blue-50"
              >
                Learn How It Works
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Ghana Health Service Licensed</span>
              <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Certified Labs</span>
              <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Secure & Confidential</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-2">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl h-72 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl mb-3">👩‍⚕️</div>
                  <p className="font-medium text-navy">Certified Phlebotomist</p>
                  <p className="text-sm text-gray-500">Ready to visit your home</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1 rounded-full shadow text-sm flex items-center gap-1">
              🇬🇭 Now available across Ghana
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy">How It Works</h2>
          <p className="text-gray-600 mt-2">Get tested from the comfort of your home in 3 simple steps</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-lg">1. Book Appointment</h3>
              <p className="text-sm text-gray-600 mt-2">Choose your test and schedule a visit online or via phone. We confirm instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-lg">2. Home Visit & Sample</h3>
              <p className="text-sm text-gray-600 mt-2">Our certified phlebotomist visits your home, collects the sample safely & hygienically.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-lg">3. Results via App</h3>
              <p className="text-sm text-gray-600 mt-2">Lab analyzes your sample & results are delivered securely to your phone within 24–48hrs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Shield size={18} className="text-primary" /> Licensed by Ghana Health Service
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Award size={18} className="text-primary" /> ISO 15189 Certified Lab
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Shield size={18} className="text-primary" /> Secure, Confidential Results
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Users size={18} className="text-primary" /> 5000+ Samples Collected
          </div>
        </div>
      </section>
    </div>
  );
}