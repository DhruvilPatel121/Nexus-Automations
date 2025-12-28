"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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

  const toggleNode = (nodeId: string, parentNode?: ProductNode) => {
    const newExpanded = new Set(expandedNodes);
    
    // If this is a top-level category (level 0), close all other top-level categories
    if (!parentNode) {
      // Get all top-level category IDs
      const topLevelIds = allCategories.map(cat => cat.id);
      
      // Remove all top-level categories from expanded set
      topLevelIds.forEach(id => {
        if (id !== nodeId) {
          newExpanded.delete(id);
          // Also recursively remove all children
          removeChildrenFromExpanded(allCategories.find(c => c.id === id), newExpanded);
        }
      });
    }
    
    // Toggle the clicked node
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
      // Remove all children when collapsing
      const node = findNodeById(nodeId, allCategories);
      if (node) {
        removeChildrenFromExpanded(node, newExpanded);
      }
    } else {
      newExpanded.add(nodeId);
    }
    
    setExpandedNodes(newExpanded);
  };

  // Helper function to recursively remove all children from expanded set
  const removeChildrenFromExpanded = (node: ProductNode | undefined, expandedSet: Set<string>) => {
    if (!node || !node.children) return;
    node.children.forEach(child => {
      expandedSet.delete(child.id);
      removeChildrenFromExpanded(child, expandedSet);
    });
  };

  // Helper function to find a node by ID
  const findNodeById = (nodeId: string, nodes: ProductNode[]): ProductNode | undefined => {
    for (const node of nodes) {
      if (node.id === nodeId) return node;
      if (node.children) {
        const found = findNodeById(nodeId, node.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleNodeClick = (node: ProductNode, parentNode?: ProductNode) => {
    // Check if this is a product with details (leaf node)
    const isProduct =
      node.type === "product" ||
      (!!node.details && (!node.children || node.children.length === 0));

    if (isProduct) {
      // If it's a product, show detail view
      setBreadcrumb([...breadcrumb, node]);
      return;
    }

    // For categories/subcategories, toggle expansion
    toggleNode(node.id, parentNode);
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
      return allCategories;
    }

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

  // Recursive component to render accordion items
  const AccordionItem = ({ 
    node, 
    level = 0, 
    parentNode 
  }: { 
    node: ProductNode; 
    level?: number;
    parentNode?: ProductNode;
  }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isProduct = node.type === "product" || (!!node.details && !hasChildren);

    return (
      <div className="w-full">
        <button
          onClick={() => handleNodeClick(node, parentNode)}
          className={`
            w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between
            touch-manipulation
            ${level === 0 ? "bg-white/5 hover:bg-white/10 mb-2" : "hover:bg-white/5"}
            text-white/90 hover:text-white
          `}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
        >
          <span className="font-medium">{node.name}</span>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown size={16} className="text-white/50" />
            ) : (
              <ChevronRight size={16} className="text-white/50" />
            )
          )}
          {isProduct && <ChevronRight size={16} className="text-white/50" />}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="ml-0">
            {node.children!.map((child) => (
              <AccordionItem 
                key={child.id} 
                node={child} 
                level={level + 1}
                parentNode={node}
              />
            ))}
          </div>
        )}
      </div>
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
        <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-6 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb - More visible on mobile */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 mb-4 inline-flex items-center gap-2 flex-wrap text-sm">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="hover:text-[#009999] transition-colors flex items-center gap-1 touch-manipulation"
              >
                <Home size={18} />
                <span className="font-medium">Products</span>
              </button>
              {breadcrumb.slice(0, -1).map((item, idx) => (
                <div key={item.id} className="flex items-center gap-2">
                  <ChevronRight size={16} className="text-white/70" />
                  <button
                    onClick={() => handleBreadcrumbClick(idx)}
                    className="hover:text-[#009999] transition-colors touch-manipulation font-medium"
                  >
                    {item.name}
                  </button>
                </div>
              ))}
              <ChevronRight size={16} className="text-white/70" />
              <span className="text-[#009999] font-semibold">{currentProduct.name}</span>
            </div>

            <button
              onClick={() => setBreadcrumb(breadcrumb.slice(0, -1))}
              className="flex items-center gap-2 mb-4 hover:text-[#009999] transition-colors group touch-manipulation"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back</span>
            </button>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {currentProduct.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {currentProduct.description}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Product Images and Overview */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
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
                className="inline-flex items-center justify-center gap-2 bg-[#009999] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#007a7a] transition-all transform hover:scale-105 shadow-lg touch-manipulation w-full sm:w-auto"
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
                            <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-[#002B5C] border-r border-gray-200 w-1/3 text-sm sm:text-base">
                              {key}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{value}</td>
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
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#002B5C]">
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

          {/* Related Products Section */}
          {breadcrumb.length > 1 && (() => {
            // Get the parent category (second to last in breadcrumb)
            const parentCategory = breadcrumb[breadcrumb.length - 2];
            
            // Get sibling products (other products in the same parent category)
            const relatedProducts = parentCategory?.children?.filter(
              (product) => product.id !== currentProduct.id
            ) || [];

            // Only show if there are related products
            if (relatedProducts.length === 0) return null;

            return (
              <div className="mt-16 pt-16 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-[#002B5C]">
                  Related Products
                </h2>
                <p className="text-gray-600 mb-8">
                  Other products in {parentCategory.name}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {relatedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        // Navigate to this product
                        const newBreadcrumb = breadcrumb.slice(0, -1);
                        setBreadcrumb([...newBreadcrumb, product]);
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group bg-white rounded-xl border-2 border-gray-200 hover:border-[#009999] hover:shadow-xl transition-all duration-300 overflow-hidden text-left"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-bold text-lg">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-[#009999] font-semibold group-hover:gap-3 transition-all">
                          <span>View Details</span>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </main>
    );
  }

  // Multi-column Navigation View (Desktop) / Accordion View (Mobile)
  const columnsToShow = Math.min(breadcrumb.length + 1, 4);

  return (
    <main className="min-h-screen bg-[#002B5C]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#002B5C] to-[#003a7a] text-white py-6 lg:py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm flex-wrap">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="hover:text-[#009999] transition-colors flex items-center gap-1 text-white/70 touch-manipulation"
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

          {/* Title and Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Products & Services
              </h1>
              <p className="text-xs sm:text-sm text-white/80">
                Explore our comprehensive portfolio of industrial automation
                solutions
              </p>
            </div>
            
            {/* Search Bar - Responsive */}
            <div className="relative w-full sm:w-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009999] focus:border-[#009999] text-white placeholder-white/50 w-full sm:w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white touch-manipulation"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop: Multi-column, Mobile: Accordion */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Accordion View */}
        <div className="lg:hidden">
          <div className="space-y-2">
            {allCategories.map((category) => (
              <AccordionItem key={category.id} node={category} />
            ))}
          </div>
        </div>

        {/* Desktop Multi-column View */}
        <div className="hidden lg:flex gap-0 min-h-[600px] overflow-x-auto">
          {Array.from({ length: columnsToShow }).map((_, columnIndex) => {
            const columnChildren = getColumnChildren(columnIndex);
            const columnTitle = getColumnTitle(columnIndex);

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
                    const hasChildren = node.children && node.children.length > 0;
                    const hasDetails = !!node.details;
                    const showChevron = hasChildren || hasDetails;

                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          if (columnIndex === 0) {
                            setBreadcrumb([node]);
                          } else {
                            const newBreadcrumb = breadcrumb.slice(0, columnIndex);
                            setBreadcrumb([...newBreadcrumb, node]);
                          }
                        }}
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
      </div>
    </main>
  );
}
