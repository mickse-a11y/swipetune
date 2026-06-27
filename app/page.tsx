export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-black shadow-2xl ring-1 ring-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black ring-8 ring-zinc-800">
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        <p className="mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
          Swipe. Discover. Build your playlist.
        </p>

        <h1 className="text-center text-6xl font-black tracking-tight text-white">
          Swipe<span className="text-green-500">Tune</span>
        </h1>

        <p className="mt-5 max-w-md text-center text-lg leading-8 text-zinc-400">
          Discover new music one swipe at a time and build playlists faster
          than ever.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-4">
          <button className="rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400">
            Continue with Spotify
          </button>

          <button className="rounded-full border border-white/15 bg-white/5 py-4 text-lg font-semibold text-white transition hover:bg-white/10">
            Continue with Google
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-sm">
          <button className="text-zinc-400 transition hover:text-white">
            Create Account
          </button>

          <button className="text-zinc-500 transition hover:text-white">
            Already have an account? Log In
          </button>
        </div>
      </section>
    </main>
  );
}