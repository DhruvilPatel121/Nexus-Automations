"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  Download,
  Home,
  Search,
  X,
} from "lucide-react";

interface ProductNode {
  id: string;
  name: string;
  type: "category" | "subcategory" | "product";
  image: string;
  description: string;
  children?: ProductNode[];
  details?: {
    features: string[];
    specs: Record<string, string>;
    downloads: { label: string; file: string }[];
  };
}

interface ProductData {
  products: ProductNode[];
}

export default function ProductsPage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<ProductNode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  const handleNodeClick = (node: ProductNode, columnIndex: number) => {
    // Check if this is a product with details (leaf node)
    const isProduct =
      node.type === "product" ||
      (!!node.details && (!node.children || node.children.length === 0));

    if (isProduct) {
      // If it's a product, add to breadcrumb to show detail view
      setBreadcrumb([...breadcrumb, node]);
      return;
    }

    // If clicking a top-level category (column 0), reset breadcrumb to just that category
    if (columnIndex === 0) {
      setBreadcrumb([node]);
      return;
    }

    // For other columns, replace everything from this column index onwards
    // This ensures clicking a sibling in the same column replaces the previous selection
    const newBreadcrumb = breadcrumb.slice(0, columnIndex);
    setBreadcrumb([...newBreadcrumb, node]);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumb([]);
    } else {
      setBreadcrumb(breadcrumb.slice(0, index + 1));
    }
  };

  const isLeafProduct = (node?: ProductNode) =>
    !!node &&
    (node.type === "product" ||
      (!!node.details && (!node.children || node.children.length === 0)));

  const currentProduct = isLeafProduct(breadcrumb[breadcrumb.length - 1])
    ? breadcrumb[breadcrumb.length - 1]
    : null;

  // Get all categories for left column
  const allCategories = productData?.products || [];

  // Get children for each column based on breadcrumb path
  const getColumnChildren = (columnIndex: number): ProductNode[] => {
    if (columnIndex === 0) {
      // Column 1: Always show all top-level categories
      return allCategories;
    }

    // For other columns, get children from the previous column's selected item
    const parentIndex = columnIndex - 1;
    if (breadcrumb.length > parentIndex) {
      const parent = breadcrumb[parentIndex];
      return parent?.children || [];
    }

    return [];
  };

  // Get column title
  const getColumnTitle = (columnIndex: number): string => {
    if (columnIndex === 0) {
      return "Products & Services";
    }

    const parentIndex = columnIndex - 1;
    if (breadcrumb.length > parentIndex) {
      return breadcrumb[parentIndex].name;
    }

    return "";
  };

  // Check if a node is selected in a specific column
  const isNodeSelected = (node: ProductNode, columnIndex: number): boolean => {
    if (columnIndex === 0) {
      return breadcrumb.length > 0 && breadcrumb[0].id === node.id;
    }

    const selectedIndex = columnIndex;
    return (
      breadcrumb.length > selectedIndex &&
      breadcrumb[selectedIndex].id === node.id
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#002B5C] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#009999] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">Loading products...</p>
        </div>
      </div>
    );
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
                  <button
                    onClick={() => handleBreadcrumbClick(idx)}
                    className="hover:text-[#009999] transition-colors"
                  >
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
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back</span>
            </button>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {currentProduct.name}
            </h1>
            <p className="text-xl text-white/90">
              {currentProduct.description}
            </p>
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
              {Array.isArray(currentProduct.details?.features) &&
                currentProduct.details!.features.length > 0 && (
                  <>
                    <h2 className="text-3xl font-bold mb-6 text-[#002B5C]">
                      Key Features
                    </h2>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 mb-8">
                      <ul className="space-y-3">
                        {currentProduct.details!.features.map(
                          (feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#009999] mt-2 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </>
                )}

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
              <h2 className="text-3xl font-bold mb-8 text-[#002B5C]">
                Technical Specifications
              </h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(currentProduct.details.specs).map(
                        ([key, value], idx) => (
                          <tr
                            key={key}
                            className={
                              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="px-6 py-4 font-semibold text-[#002B5C] border-r border-gray-200 w-1/3 whitespace-nowrap">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-gray-700">{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Downloads */}
          {currentProduct.details?.downloads &&
            currentProduct.details.downloads.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-[#002B5C]">
                  Downloads & Documentation
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentProduct.details.downloads.map((download, idx) => (
                    <a
                      key={idx}
                      href={download.file}
                      className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#009999] hover:shadow-lg transition-all group"
                      download
                    >
                      <div className="w-12 h-12 bg-[#009999]/10 rounded-lg flex items-center justify-center group-hover:bg-[#009999] transition-colors">
                        <Download
                          size={24}
                          className="text-[#009999] group-hover:text-white transition-colors"
                        />
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
    );
  }

  // Multi-column Navigation View
  // Determine how many columns to show based on breadcrumb depth
  // Column 0: Always show (all main categories)
  // Column 1+: Show for each item in breadcrumb that has children
  const columnsToShow = Math.min(breadcrumb.length + 1, 4); // Show max 4 columns

  return (
    <main className="min-h-screen bg-[#002B5C]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="hover:text-[#009999] transition-colors flex items-center gap-1 text-white/70"
              >
                <Home size={16} />
                <span>Products & Services</span>
              </button>
              {breadcrumb.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-white/50" />
                  <button
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={
                      idx === breadcrumb.length - 1
                        ? "text-[#009999] font-semibold"
                        : "hover:text-[#009999] transition-colors text-white/70"
                    }
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Products & Services
              </h1>
              <p className="text-sm text-white/80">
                Explore our comprehensive portfolio of industrial automation
                solutions
              </p>
            </div>
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009999] focus:border-[#009999] text-white placeholder-white/50 w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-column Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-0 min-h-[600px]">
          {/* Render columns dynamically */}
          {Array.from({ length: columnsToShow }).map((_, columnIndex) => {
            const columnChildren = getColumnChildren(columnIndex);
            const columnTitle = getColumnTitle(columnIndex);

            // Don't render empty columns
            if (columnChildren.length === 0 && columnIndex > 0) {
              return null;
            }

            return (
              <div
                key={columnIndex}
                className={`w-64 flex-shrink-0 ${
                  columnIndex < columnsToShow - 1
                    ? "border-r border-white/10 pr-6"
                    : "px-6"
                }`}
              >
                <h2 className="text-[#009999] text-lg font-semibold mb-4 pb-2 border-b border-[#009999]">
                  {columnTitle}
                </h2>
                <div className="space-y-1">
                  {columnChildren.map((node) => {
                    const isSelected = isNodeSelected(node, columnIndex);
                    const hasChildren =
                      node.children && node.children.length > 0;
                    const hasDetails = !!node.details;
                    const showChevron = hasChildren || hasDetails;

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node, columnIndex)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#003a7a] text-white"
                            : "text-white/90 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="font-medium">{node.name}</span>
                        {showChevron && (
                          <ChevronRight size={16} className="text-white/50" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Results or Empty State */}
        {searchQuery && (
          <div className="mt-8 text-center py-16">
            <p className="text-white/70 text-lg">
              Search functionality - filter results based on current view
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
