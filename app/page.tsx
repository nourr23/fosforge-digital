import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
        
        <Image
          src="/next.svg"
          alt="Next Logo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Next.js
        </h1>

        <p className="text-gray-600 mb-6">
          Your application is working successfully with Tailwind CSS.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>
    </main>
  );
}