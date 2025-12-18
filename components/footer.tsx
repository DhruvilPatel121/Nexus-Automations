import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#009999]">
              Nexus Automations
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Leading provider of industrial automation and control solutions
              worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#009999] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#009999] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#009999] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#009999] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#009999] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-gray-400 hover:text-[#009999] transition-colors"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#009999] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-[#009999] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li className="text-gray-400">Automation Controllers</li>
              <li className="text-gray-400">Drive Systems</li>
              <li className="text-gray-400">Safety Solutions</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@nexusautomations.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>24/7 Technical Support</li>
              <li>Emergency: +1 (555) 999-8888</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span>
              © {new Date().getFullYear()} Nexus Automations. All rights
              reserved.
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              Hand Crafted By{" "}
              <a
                href="https://shivvilonsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009999] hover:underline hover:text-[#00cccc] transition-colors font-medium"
              >
                Shivvilon Solutions
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
