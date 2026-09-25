export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">HomeLab GH</h3>
          <p className="text-sm text-gray-300">
            Reliable lab testing services in Ghana. Licensed & accredited by GHS.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>About Us</li>
            <li>How It Works</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <p className="text-sm text-gray-300">help@homelabgh.com</p>
          <p className="text-sm text-gray-300">+233 30 234 5678</p>
          <p className="text-sm text-gray-300">Accra, Ghana</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Opening Hours</h4>
          <p className="text-sm text-gray-300">Mon – Sat: 7:00am – 6:00pm</p>
          <p className="text-sm text-gray-300">Sunday: 9:00am – 4:00pm</p>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        © 2024 HomeLab GH. All rights reserved. • Privacy Policy • Terms & Conditions
      </div>
    </footer>
  );
}