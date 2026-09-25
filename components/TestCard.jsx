"use client";

export default function TestCard({ test, isSelected, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            test.fasting
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {test.fasting ? `Fasting Required • ${test.hours}` : "No Fasting Required"}
        </span>
      </div>
      <h3 className="font-bold text-navy text-lg">{test.name}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-3">{test.desc}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-primary">GH₵ {test.price}</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(test)}
            className="w-4 h-4 text-primary rounded"
          />
          <span className="text-sm">Add to cart</span>
        </label>
      </div>
    </div>
  );
}