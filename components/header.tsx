"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#002B5C] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-xl font-bold group">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center group-hover:bg-[#009999] transition-colors">
              <span className="text-[#002B5C] font-bold group-hover:text-white transition-colors">NA</span>
            </div>
            <span className="hidden sm:inline">Nexus Automations</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="hover:text-[#009999] transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-[#009999] transition-colors font-medium">
              Products & Services
            </Link>
            <Link href="/industries" className="hover:text-[#009999] transition-colors font-medium">
              Industries
            </Link>
            <Link href="/about" className="hover:text-[#009999] transition-colors font-medium">
              Company
            </Link>
            <Link href="/contact" className="hover:text-[#009999] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          {/* <div className="flex items-center gap-4">
            <button className="hidden md:flex p-2 hover:text-[#009999] transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-4 border-t border-white/20 pt-4">
            <Link
              href="/"
              className="hover:text-[#009999] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-[#009999] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products & Services
            </Link>
            <Link
              href="/industries"
              className="hover:text-[#009999] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Industries
            </Link>
            <Link
              href="/about"
              className="hover:text-[#009999] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Company
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#009999] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
