"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* <div className="bg-gradient-to-r from-[#009999] to-[#007373] text-white py-20"> */}
      <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Get in touch with our team of industrial automation experts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#009999] hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mb-6">
              <Phone size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Phone</h3>
            <p className="text-gray-600 mb-4">
              Call us directly for immediate assistance
            </p>
            <a
              href="tel:+15551234567"
              className="text-[#009999] font-semibold text-lg hover:text-[#007373] transition-colors"
            >
              +91 8460464710
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Monday - Friday: 8:00 AM - 6:00 PM EST
            </p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#009999] hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mb-6">
              <Mail size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Email</h3>
            <p className="text-gray-600 mb-4">
              Send us an email for detailed inquiries
            </p>
            <a
              href="mailto:info@pixtechnology.com"
              className="text-[#009999] font-semibold text-lg hover:text-[#007373] transition-colors block mb-2"
            >
              info@pixtechnology.com
            </a>
            <a
              href="mailto:support@pixtechnology.com"
              className="text-[#009999] font-semibold text-lg hover:text-[#007373] transition-colors block"
            >
              support@pixtechnology.com
            </a>
          </div>

          {/* Address */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#009999] hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mb-6">
              <MapPin size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
            <p className="text-gray-600 mb-4">Our corporate headquarters</p>
            <address className="not-italic text-gray-700 leading-relaxed">
              <strong>Pix Technology Inc.</strong>
              <br />
              Samrat Industrial Area
              <br />
              Technology Park, Gondal Road
              <br />
              Rajkot-360003, Gujarat
              <br />
              India
            </address>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-br from-[#009999]/5 to-[#007373]/5 rounded-lg p-12 text-center">
          <Clock size={48} className="text-[#009999] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Business Hours</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-lg">Sales Department</h4>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">
                  Technical Support
                </h4>
                <p className="text-gray-600">
                  Monday - Friday: 7:00 AM - 8:00 PM
                </p>
                <p className="text-gray-600">
                  24/7 Emergency Support Available
                </p>
                <p className="text-[#009999] font-semibold mt-2">
                  Call: +91 8460464710
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
