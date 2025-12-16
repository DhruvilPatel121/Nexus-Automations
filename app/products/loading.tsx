export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-[#009999] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    </div>
  )
}
