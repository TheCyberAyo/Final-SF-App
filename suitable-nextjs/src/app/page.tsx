import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-12">
            Suitable Focus
          </h1>
          
          <div className="flex justify-center items-center">
            <Link href="/auth/sign-in">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-lg shadow-lg shadow-yellow-500/30 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
