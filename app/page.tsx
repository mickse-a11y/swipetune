export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-6xl font-bold text-green-500 mb-4">
        🎵 SwipeTune
      </h1>

      <p className="text-xl text-gray-300 mb-10 text-center max-w-md">
        Discover music one swipe at a time.
      </p>

      <button className="w-80 rounded-full bg-green-500 py-4 text-lg font-semibold text-black hover:bg-green-400 transition">
        Continue with Spotify
      </button>

      <button className="w-80 rounded-full border border-gray-600 py-4 text-lg mt-4 hover:bg-gray-900 transition">
        Continue with Google
      </button>

      <button className="mt-8 text-gray-400 hover:text-white transition">
        Create Account
      </button>

      <button className="mt-3 text-gray-500 hover:text-white transition">
        Already have an account? Log In
      </button>
    </main>
  );
}