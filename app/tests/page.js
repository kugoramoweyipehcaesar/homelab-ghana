"use client";

import { useState, useEffect } from "react";
import TestCard from "@/components/TestCard";
import { Search } from "lucide-react";
import { getLocal, setLocal } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

const DEFAULT_TESTS = [
  { id: 1, name: "Full Blood Count", desc: "Red & white blood cells, hemoglobin, platelets, WBC differential", price: 120, fasting: true, hours: "8–12 hrs" },
  { id: 2, name: "Malaria Test", desc: "Rapid diagnostic test for malaria parasites", price: 45, fasting: false },
  { id: 3, name: "Liver Function Test (LFT)", desc: "ALT, AST, ALP, Bilirubin, Total Protein, Albumin", price: 150, fasting: true, hours: "8–10 hrs" },
  { id: 4, name: "Kidney Function Test (KFT)", desc: "Creatinine, Urea, Electrolytes, eGFR", price: 130, fasting: true, hours: "8–10 hrs" },
  { id: 5, name: "Diabetes Panel", desc: "Comprehensive diabetes screening — Fasting Glucose + HbA1c", price: 200, fasting: true, hours: "8–12 hrs", popular: true },
];

export default function TestsPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    setCart(getLocal("cart", []));
    const saved = getLocal("testPrices", {});
    setPrices(saved);

    if (!localStorage.getItem("testPrices")) {
      const defaults = {
        "Full Blood Count": 120,
        "Malaria Test": 45,
        "Liver Function Test (LFT)": 150,
        "Kidney Function Test (KFT)": 130,
        "Diabetes Panel": 200,
        CBC: 50,
        "Lipid Panel": 80,
        "COVID-19 PCR": 120,
        HbA1c: 60,
      };
      setLocal("testPrices", defaults);
      setPrices(defaults);
    }
  }, []);

  const tests = DEFAULT_TESTS.map((t) => ({
    ...t,
    price: prices[t.name] || t.price,
  }));

  const filtered = tests.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCart = (test) => {
    let newCart;
    if (cart.find((c) => c.id === test.id)) {
      newCart = cart.filter((c) => c.id !== test.id);
      showToast(`${test.name} removed from cart`);
    } else {
      newCart = [...cart, test];
      showToast(`${test.name} added to cart`);
    }
    setCart(newCart);
    setLocal("cart", newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Lab Test Menu</h1>
          <p className="text-gray-600 mt-1">Browse and book lab tests & wellness packages across Ghana</p>
        </div>
        <div className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          🛡️ Ghana Health Service • Certified
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search tests, panels, or health concerns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            isSelected={!!cart.find((c) => c.id === test.id)}
            onToggle={toggleCart}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No tests match your search.</p>
      )}
    </div>
  );
}