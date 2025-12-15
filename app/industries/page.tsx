import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function IndustriesPage() {
  const industries = [
    {
      name: "Automotive Manufacturing",
      description:
        "Advanced automation solutions for automotive production lines, assembly systems, and quality control processes.",
      image: "/automotive-factory-assembly-line.jpg",
    },
    {
      name: "Food & Beverage",
      description:
        "Hygienic automation systems designed for food processing, packaging, and distribution with full traceability.",
      image: "/food-processing-factory.jpg",
    },
    {
      name: "Pharmaceuticals",
      description:
        "Precision control and monitoring systems for pharmaceutical manufacturing with regulatory compliance.",
      image: "/pharmaceutical-manufacturing-facility.png",
    },
    {
      name: "Energy & Utilities",
      description: "Robust solutions for power generation, distribution, and renewable energy management systems.",
      image: "/power-plant-control-room.png",
    },
    {
      name: "Metals & Mining",
      description: "Heavy-duty automation for metal processing, mining operations, and material handling systems.",
      image: "/steel-mill-factory.jpg",
    },
    {
      name: "Chemical Processing",
      description:
        "Safe and reliable control systems for chemical plants with advanced safety and monitoring features.",
      image: "/chemical-plant-facility.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#009999] to-[#007373] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Industries We Serve</h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
            Delivering specialized automation solutions across diverse industrial sectors worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={industry.image || "/placeholder.svg"}
                  alt={industry.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{industry.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">{industry.description}</p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[#009999] font-semibold hover:gap-3 transition-all"
                >
                  Explore Solutions
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Industry?</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We work with businesses across all sectors. Contact us to discuss your specific automation needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#009999] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#007373] transition-colors shadow-lg"
          >
            Contact Our Team
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  )
}
