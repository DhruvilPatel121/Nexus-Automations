"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowLeft, Download, Home, Search, X } from "lucide-react"

interface ProductNode {
  id: string
  name: string
  type: "category" | "subcategory" | "product"
  image: string
  description: string
  children?: ProductNode[]
  details?: {
    features: string[]
    specs: Record<string, string>
    downloads: { label: string; file: string }[]
  }
}

interface ProductData {
  products: ProductNode[]
}

export default function ProductsPage() {
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<ProductNode[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Client-side fetch for dynamic JSON loading
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading products:", error)
        setLoading(false)
      })
  }, [])

  const currentLevel =
    breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1].children || [] : productData?.products || []

  // >>> FIX: push the clicked node (including product) to breadcrumb so details open
  const handleNodeClick = (node: ProductNode) => {
    setBreadcrumb([...breadcrumb, node])
  }
  // <<< FIX

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumb([])
    } else {
      setBreadcrumb(breadcrumb.slice(0, index + 1))
    }
  }

  const currentProduct =
    breadcrumb.length > 0 && breadcrumb[breadcrumb.length - 1].type === "product"
      ? breadcrumb[breadcrumb.length - 1]
      : null

  // Filter products based on search
  const filteredLevel = searchQuery
    ? currentLevel.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentLevel

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#009999] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  // Product Detail View
  if (currentProduct) {
    return (
      <main className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="hover:text-[#009999] transition-colors flex items-center gap-1"
              >
                <Home size={16} />
                <span>Products</span>
              </button>
              {breadcrumb.slice(0, -1).map((item, idx) => (
                <div key={item.id} className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-white/50" />
                  <button onClick={() => handleBreadcrumbClick(idx)} className="hover:text-[#009999] transition-colors">
                    {item.name}
                  </button>
                </div>
              ))}
              <ChevronRight size={16} className="text-white/50" />
              <span className="text-[#009999]">{currentProduct.name}</span>
            </div>

            <button
              onClick={() => setBreadcrumb(breadcrumb.slice(0, -1))}
              className="flex items-center gap-2 mb-4 hover:text-[#009999] transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{currentProduct.name}</h1>
            <p className="text-xl text-white/90">{currentProduct.description}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Product Images and Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              {/* >>> Only show features section when present */}
              {Array.isArray(currentProduct.details?.features) && currentProduct.details!.features.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-[#002B5C]">Key Features</h2>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 mb-8">
                    <ul className="space-y-3">
                      {currentProduct.details!.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#009999] mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              {/* <<< Only show features section when present */}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#009999] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#007a7a] transition-all transform hover:scale-105 shadow-lg"
              >
                Request Quote <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* Technical Specifications */}
          {currentProduct.details?.specs && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-[#002B5C]">Technical Specifications</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(currentProduct.details.specs).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-6 py-4 font-semibold text-[#002B5C] border-r border-gray-200 w-1/3 whitespace-nowrap">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-gray-700">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Downloads */}
          {currentProduct.details?.downloads && currentProduct.details.downloads.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#002B5C]">Downloads & Documentation</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProduct.details.downloads.map((download, idx) => (
                  <a
                    key={idx}
                    href={download.file}
                    className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#009999] hover:shadow-lg transition-all group"
                    download
                  >
                    <div className="w-12 h-12 bg-[#009999]/10 rounded-lg flex items-center justify-center group-hover:bg-[#009999] transition-colors">
                      <Download size={24} className="text-[#009999] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#002B5C] group-hover:text-[#009999] transition-colors">
                        {download.label}
                      </p>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    )
  }

  // Product List/Navigation View
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Products & Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Explore our comprehensive portfolio of industrial automation solutions designed to transform your
            operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb and Search */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <button
              onClick={() => handleBreadcrumbClick(-1)}
              className="hover:text-[#009999] transition-colors flex items-center gap-1 text-gray-600"
            >
              <Home size={16} />
              <span>Products</span>
            </button>
            {breadcrumb.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-2">
                <ChevronRight size={16} className="text-gray-400" />
                <button
                  onClick={() => handleBreadcrumbClick(idx)}
                  className={
                    idx === breadcrumb.length - 1
                      ? "text-[#009999] font-semibold"
                      : "hover:text-[#009999] transition-colors text-gray-600"
                  }
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009999] focus:border-transparent w-full sm:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredLevel.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLevel.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={node.image || "/placeholder.svg"}
                    alt={node.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C]/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#009999] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {node.type}
                    </span>
                  </div>
                  {node.children && node.children.length > 0 && (
                    <div className="absolute bottom-4 right-4">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <ChevronRight size={20} className="text-[#002B5C]" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-[#002B5C] group-hover:text-[#009999] transition-colors">
                    {node.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{node.description}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  )
}
