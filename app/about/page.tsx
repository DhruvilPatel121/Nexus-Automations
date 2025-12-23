import Image from "next/image";
import { Target, Users, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <div className="bg-gradient-to-r from-[#009999] to-[#007373] text-white py-20"> */}
      <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            About Pix Technology
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
            Leading the future of industrial automation with innovation and
            excellence
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Pix Technology is a leading technology company focused on
              industry, infrastructure, and automation. Our purpose is to create
              technology to transform industrial operations, making them more
              efficient, sustainable, and intelligent.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              By combining cutting-edge automation systems with real-world
              industrial expertise, we empower customers to accelerate their
              digital transformation. We make factories more efficient,
              production lines more reliable, and operations more sustainable.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              As a leader in industrial automation, we leverage our deep domain
              knowledge to deliver innovative solutions that drive productivity
              and efficiency. Our comprehensive portfolio makes advanced
              automation accessible and impactful for customers across diverse
              industries.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/modern-industrial-building-headquarters.jpg"
              alt="Pix Technology headquarters"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-600 leading-relaxed">
              Pioneering next-generation automation technologies for tomorrow's
              challenges
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
            <p className="text-gray-600 leading-relaxed">
              Building lasting partnerships through exceptional service and
              support
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              Worldwide presence with local expertise in over 50 countries
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#009999]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-[#009999]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-gray-600 leading-relaxed">
              Uncompromising quality in every product and service we deliver
            </p>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="bg-gradient-to-br from-[#009999] to-[#007373] rounded-lg p-12 text-white mb-20"> */}
        <div className="bg-gradient-to-br from-[#002B5C] to-[#003a7a] rounded-lg p-12 text-white mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <div className="text-white/80 text-lg">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80 text-lg">Countries Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-white/80 text-lg">Installations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-lg">Global Support</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="space-y-12 max-w-4xl mx-auto">
            {[
              {
                year: "2000",
                title: "Foundation",
                description:
                  "Pix Technology founded with a vision to revolutionize industrial automation",
              },
              {
                year: "2005",
                title: "Global Expansion",
                description:
                  "Opened offices in Europe and Asia, establishing worldwide presence",
              },
              {
                year: "2010",
                title: "Innovation Award",
                description:
                  "Received prestigious industry award for breakthrough automation technology",
              },
              {
                year: "2015",
                title: "10,000th Installation",
                description:
                  "Reached milestone of 10,000 successful system installations globally",
              },
              {
                year: "2020",
                title: "Digital Transformation",
                description:
                  "Launched next-generation IoT-enabled automation platform",
              },
              {
                year: "2024",
                title: "Sustainability Leader",
                description:
                  "Recognized as industry leader in sustainable automation solutions",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-3xl font-bold text-[#009999]">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-[#009999] rounded-full mt-2" />
                <div className="flex-1 pb-8 border-b border-gray-200">
                  <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
