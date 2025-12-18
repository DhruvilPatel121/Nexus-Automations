import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-industrial-background.jpg"
            alt="Industrial technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B5C]/95 via-[#002B5C]/85 to-[#009999]/70" />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#009999 1px, transparent 1px), linear-gradient(90deg, #009999 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in-up">
              Transforming Industry.
              <br />
              <span className="text-[#009999]">Empowering the Future.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl">
              Innovation automation and control solutions that power the world's
              leading industrial operations with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#009999] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#007a7a] transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Products <ArrowRight size={20} />
              </Link>
              <Link
                href="/industries"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002B5C] transition-all"
              >
                Our Industries
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div> */}
      </section>

      {/* Technologies & Innovations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#002B5C] text-balance">
              Technologies & Innovations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Cutting-edge solutions that drive efficiency, sustainability, and
              digital transformation across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Advanced Automation",
                description:
                  "Industry 4.0 ready automation systems with AI-powered optimization and predictive maintenance capabilities.",
              },
              {
                icon: Shield,
                title: "Safety First",
                description:
                  "Certified safety solutions meeting highest international standards, protecting personnel and equipment.",
              },
              {
                icon: TrendingUp,
                title: "Energy Efficiency",
                description:
                  "Smart energy management reducing consumption by up to 30% while maintaining peak performance.",
              },
              {
                icon: Globe,
                title: "Global Connectivity",
                description:
                  "IIoT-enabled devices with secure cloud connectivity for real-time monitoring from anywhere.",
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description:
                  "ISO certified manufacturing processes ensuring consistent quality and reliability in every product.",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "24/7 technical support and training programs to maximize your investment and operational efficiency.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#009999] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#002B5C] to-[#009999] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#002B5C] group-hover:text-[#009999] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#002B5C] text-balance">
              Product Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Discover our comprehensive portfolio of industrial automation
              solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: "Industrial Automation",
                image: "/images/products/automation.jpg",
                description:
                  "Complete automation solutions from PLCs to system integration",
              },
              {
                name: "Drive Technology",
                image: "/images/products/drives.jpg",
                description:
                  "Precise motor control with energy-efficient operation",
              },
              {
                name: "Safety Technology",
                image: "/images/products/safety.jpg",
                description:
                  "Comprehensive safety solutions for personnel protection",
              },
              {
                name: "Process Instrumentation",
                image: "/images/products/instrumentation.jpg",
                description: "Precision measurement for critical processes",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href="/products"
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#009999] font-semibold mt-4 group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#002B5C] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#003a7a] transition-all transform hover:scale-105 shadow-lg"
            >
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Global Presence
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Serving industries worldwide with local expertise and global
              support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
              <div className="text-5xl font-bold text-[#009999] mb-2">50+</div>
              <div className="text-lg font-semibold mb-2">Countries</div>
              <p className="text-white/70">
                Global operations and distribution
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
              <div className="text-5xl font-bold text-[#009999] mb-2">
                10,000+
              </div>
              <div className="text-lg font-semibold mb-2">Installations</div>
              <p className="text-white/70">Trusted by industry leaders</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10">
              <div className="text-5xl font-bold text-[#009999] mb-2">24/7</div>
              <div className="text-lg font-semibold mb-2">Support</div>
              <p className="text-white/70">Expert technical assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#002B5C] text-balance">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              Stay updated with industry trends, innovations, and technical
              insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Technology",
                title: "The Future of Industrial AI",
                description:
                  "How artificial intelligence is revolutionizing predictive maintenance and process optimization.",
                date: "Dec 2024",
              },
              {
                category: "Sustainability",
                title: "Energy Efficiency in Manufacturing",
                description:
                  "Strategies for reducing energy consumption while maintaining productivity in industrial operations.",
                date: "Nov 2024",
              },
              {
                category: "Innovation",
                title: "Industry 4.0 Implementation",
                description:
                  "Best practices for digital transformation and IIoT integration in modern factories.",
                date: "Nov 2024",
              },
            ].map((insight, idx) => (
              <article
                key={idx}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#009999] hover:shadow-xl transition-all h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Top content */}
                  <div>
                    <div className="text-xs font-semibold text-[#009999] mb-3 uppercase tracking-wider">
                      {insight.category}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-[#002B5C] group-hover:text-[#009999] transition-colors">
                      {insight.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  {/* Bottom aligned row */}
                  <div className="flex items-center justify-between mt-auto pt-6">
                    <span className="text-sm text-gray-500">
                      {insight.date}
                    </span>

                    <Link
                      href="/products"
                      className="text-[#009999] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      Read more <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed">
            Contact our experts to discuss your specific automation needs and
            discover how we can help you achieve operational excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#009999] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#007a7a] transition-all transform hover:scale-105 shadow-lg"
            >
              Get in Touch <ArrowRight size={20} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002B5C] transition-all"
            >
              Browse Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
