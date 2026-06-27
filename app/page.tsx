"use client";

import { useState } from "react";

type Stage = "landing" | "vibe" | "discover" | "summary";

const vibes = [
  "🌙 Late Night",
  "🚗 Road Trip",
  "🏋️ Gym",
  "📚 Study",
  "😌 Chill",
  "🎉 Party",
];

const songs = [
  {
    title: "Midnight Drive",
    artist: "Nova Lane",
    genre: "Synth Pop",
    year: "2024",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    title: "Golden Hour",
    artist: "Luna Park",
    genre: "Indie Pop",
    year: "2023",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    title: "No Signal",
    artist: "The Static",
    genre: "Alternative",
    year: "2025",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
  {
    title: "Afterglow",
    artist: "Mira Voss",
    genre: "R&B",
    year: "2024",
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
  },
];

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  const [addedSongs, setAddedSongs] = useState(0);
  const [superLikes, setSuperLikes] = useState(0);

  const currentSong = songs[songIndex];

  function nextSong(action: "add" | "skip" | "superlike" | "save") {
    if (action === "add") {
      setAddedSongs((count) => count + 1);
    }

    if (action === "superlike") {
      setAddedSongs((count) => count + 1);
      setSuperLikes((count) => count + 1);
    }

    if (songIndex === songs.length - 1) {
      setStage("summary");
    } else {
      setSongIndex((index) => index + 1);
    }
  }

  function resetDemo() {
    setStage("landing");
    setSelectedVibe("");
    setSongIndex(0);
    setAddedSongs(0);
    setSuperLikes(0);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {stage === "landing" && (
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
            <button
              onClick={() => setStage("vibe")}
              className="rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400"
            >
              Start Discovering
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 py-4 text-lg font-semibold text-white transition hover:bg-white/10">
              Continue with Spotify
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 py-4 text-lg font-semibold text-white transition hover:bg-white/10">
              Continue with Google
            </button>
          </div>
        </section>
      )}

      {stage === "vibe" && (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
            Discovery Session
          </p>

          <h2 className="text-center text-4xl font-black">
            What vibe are we making?
          </h2>

          <p className="mt-4 max-w-md text-center text-zinc-400">
            Pick a mood and SwipeTune will start building a playlist around it.
          </p>

          <div className="mt-10 grid w-full max-w-lg grid-cols-2 gap-4">
            {vibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => setSelectedVibe(vibe)}
                className={`rounded-2xl border p-5 text-left text-lg font-semibold transition ${
                  selectedVibe === vibe
                    ? "border-green-500 bg-green-500/15 text-green-400"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>

          <button
            onClick={() => selectedVibe && setStage("discover")}
            className="mt-10 w-full max-w-sm rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            disabled={!selectedVibe}
          >
            Start Swiping
          </button>

          <button
            onClick={() => setStage("landing")}
            className="mt-5 text-sm text-zinc-500 transition hover:text-white"
          >
            Back
          </button>
        </section>
      )}

      {stage === "discover" && (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center py-10">
          <div className="mb-6 text-center">
            <p className="text-sm text-zinc-500">Building playlist for</p>
            <h2 className="text-2xl font-bold">{selectedVibe}</h2>
          </div>

          <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur">
            <div
              className="flex aspect-square items-center justify-center rounded-[1.5rem] shadow-xl"
              style={{ background: currentSong.gradient }}
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/80 ring-[18px] ring-black/30">
                <div className="h-5 w-5 rounded-full bg-green-500" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl font-black">{currentSong.title}</h3>
              <p className="mt-1 text-lg text-zinc-400">{currentSong.artist}</p>
              <p className="mt-2 text-sm text-zinc-500">
                {currentSong.genre} • {currentSong.year}
              </p>
            </div>

            <button className="mt-6 w-full rounded-full bg-white py-3 font-bold text-black transition hover:bg-zinc-200">
              ▶ Play 30 sec preview
            </button>

            <div className="mt-6 grid grid-cols-4 gap-3">
              <button
                onClick={() => nextSong("skip")}
                className="rounded-2xl bg-red-500/15 py-4 text-xl transition hover:bg-red-500/25"
              >
                🚫
              </button>

              <button
                onClick={() => nextSong("save")}
                className="rounded-2xl bg-white/5 py-4 text-xl transition hover:bg-white/10"
              >
                💾
              </button>

              <button
                onClick={() => nextSong("add")}
                className="rounded-2xl bg-green-500/20 py-4 text-xl transition hover:bg-green-500/30"
              >
                ➕
              </button>

              <button
                onClick={() => nextSong("superlike")}
                className="rounded-2xl bg-yellow-500/20 py-4 text-xl transition hover:bg-yellow-500/30"
              >
                ⭐
              </button>
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Song {songIndex + 1} of {songs.length}
          </p>

          <div className="mt-3 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${((songIndex + 1) / songs.length) * 100}%`,
              }}
            />
          </div>
        </section>
      )}

      {stage === "summary" && (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
            Session Complete
          </p>

          <h2 className="text-5xl font-black">Nice discoveries.</h2>

          <p className="mt-5 max-w-md text-zinc-400">
            You just finished your first SwipeTune discovery session.
          </p>

          <div className="mt-10 grid w-full max-w-sm grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-4xl font-black text-green-500">{addedSongs}</p>
              <p className="mt-2 text-sm text-zinc-400">Songs Added</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-4xl font-black text-yellow-400">
                {superLikes}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Super Likes</p>
            </div>
          </div>

          <button
            onClick={resetDemo}
            className="mt-10 w-full max-w-sm rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400"
          >
            Start Over
          </button>
        </section>
      )}
    </main>
  );
}