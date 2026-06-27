"use client";

import { useRef, useState } from "react";

type Stage =
  | "landing"
  | "home"
  | "vibe"
  | "discover"
  | "summary"
  | "library"
  | "profile";

type SwipeAction = "add" | "skip" | "superlike" | "save";
type CardMotion = "idle" | "left" | "right" | "up" | "down";

const vibes = [
  "🌙 Late Night",
  "🚗 Road Trip",
  "🏋️ Gym",
  "📚 Study",
  "😌 Chill",
  "🎉 Party",
];

const quickVibes = vibes.slice(0, 6);

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

function SwipeTuneLogo() {
  return (
    <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
      <div className="absolute h-28 w-28 rounded-full bg-green-500/20 blur-xl" />

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 via-zinc-950 to-black shadow-2xl ring-1 ring-white/10">
        <div className="absolute h-20 w-20 rounded-full border border-white/10" />
        <div className="absolute h-14 w-14 rounded-full border border-white/10" />
        <div className="absolute h-8 w-8 rounded-full bg-black ring-8 ring-zinc-800" />
        <div className="relative h-3 w-3 rounded-full bg-green-500" />
      </div>

      <svg
        className="absolute -right-3 top-1 h-12 w-12 rotate-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M7 28C13 12 30 8 40 18"
          stroke="#1ED760"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M36 9L42 18L31 20"
          stroke="#1ED760"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  const [addedSongs, setAddedSongs] = useState(0);
  const [savedSongs, setSavedSongs] = useState(0);
  const [superLikes, setSuperLikes] = useState(0);
  const [playlistSongs, setPlaylistSongs] = useState<string[]>([]);
  const [savedSongTitles, setSavedSongTitles] = useState<string[]>([]);
  const [superLikedSongs, setSuperLikedSongs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [cardMotion, setCardMotion] = useState<CardMotion>("idle");
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const previewTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const currentSong = songs[songIndex];
  function stopPreview() {
  setIsPreviewPlaying(false);

  if (previewTimeout.current) {
    clearTimeout(previewTimeout.current);
    previewTimeout.current = null;
  }
}

function togglePreview() {
  if (isPreviewPlaying) {
    stopPreview();
    return;
  }

  setIsPreviewPlaying(true);

  previewTimeout.current = setTimeout(() => {
    setIsPreviewPlaying(false);
    previewTimeout.current = null;
  }, 5000);
}

  function getCardMotionStyles() {
    if (cardMotion === "left") {
      return "-translate-x-[120%] -rotate-12 opacity-0";
    }

    if (cardMotion === "right") {
      return "translate-x-[120%] rotate-12 opacity-0";
    }

    if (cardMotion === "up") {
      return "-translate-y-[120%] scale-105 opacity-0";
    }

    if (cardMotion === "down") {
      return "translate-y-20 scale-95 opacity-0";
    }

    return "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100";
  }

  function startDiscovery(vibe: string) {
    setSelectedVibe(vibe);
    setSongIndex(0);
    setAddedSongs(0);
    setSavedSongs(0);
    setSuperLikes(0);
    setFeedback("");
    setCardMotion("idle");
    stopPreview();
    setStage("discover");
  }

  function nextSong(action: SwipeAction) {
    if (cardMotion !== "idle") {
      return;
    }
    
    stopPreview();
    
    const songLabel = `${currentSong.title} — ${currentSong.artist}`;

    const messages = {
      add: "✅ Added to playlist",
      skip: "🚫 Not interested",
      superlike: "⭐ Super liked",
      save: "💾 Saved for later",
    };

    const motions = {
      add: "right",
      skip: "left",
      superlike: "up",
      save: "down",
    } as const;

    setFeedback(messages[action]);
    setCardMotion(motions[action]);

    if (action === "add") {
      setAddedSongs((count) => count + 1);
      setPlaylistSongs((songs) => [...songs, songLabel]);
    }

    if (action === "save") {
      setSavedSongs((count) => count + 1);
      setSavedSongTitles((songs) => [...songs, songLabel]);
    }

    if (action === "superlike") {
      setSuperLikes((count) => count + 1);
      setSuperLikedSongs((songs) => [...songs, songLabel]);
    }

    setTimeout(() => {
      setFeedback("");
      setCardMotion("idle");

      if (songIndex === songs.length - 1) {
        setStage("summary");
      } else {
        setSongIndex((index) => index + 1);
      }
    }, 650);
  }

  function resetDemo() {
    setStage("landing");
    setSelectedVibe("");
    setSongIndex(0);
    setAddedSongs(0);
    setSavedSongs(0);
    setSuperLikes(0);
    setPlaylistSongs([]);
    setSavedSongTitles([]);
    setSuperLikedSongs([]);
    setFeedback("");
    setCardMotion("idle");
    stopPreview();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {stage === "landing" && (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          <SwipeTuneLogo />

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
              onClick={() => setStage("home")}
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

      {stage === "home" && (
        <section className="relative z-10 flex min-h-screen flex-col justify-center py-10">
          <div className="mx-auto w-full max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
              Home
            </p>

            <h2 className="mt-3 text-4xl font-black">Good evening, Michael</h2>

            <p className="mt-4 text-zinc-400">
              Ready to discover something new?
            </p>

            <button
              onClick={() => setStage("vibe")}
              className="mt-8 w-full rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400"
            >
              Start Discovery Session
            </button>

            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Quick Vibes</h3>

                <button
                  onClick={() => setStage("vibe")}
                  className="text-sm text-green-500 transition hover:text-green-400"
                >
                  See all
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {quickVibes.map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => startDiscovery(vibe)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-lg font-semibold transition hover:border-green-500/60 hover:bg-green-500/10"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold">Recent Sessions</h3>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold">🌙 Late Night Drive</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    18 songs discovered
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold">🏋️ Gym Mix</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    12 songs discovered
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold">😌 Chill Finds</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    9 songs discovered
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-4 rounded-3xl border border-white/10 bg-white/5 p-2 text-center text-xs text-zinc-400">
              <button className="rounded-2xl bg-green-500/15 px-2 py-3 text-green-400">
                <div className="text-xl">🏠</div>
                Home
              </button>

              <button
                onClick={() => setStage("vibe")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">🎵</div>
                Discover
              </button>

              <button
                onClick={() => setStage("library")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">📚</div>
                Library
              </button>

              <button
                onClick={() => setStage("profile")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">👤</div>
                Profile
              </button>
            </div>

            <button
              onClick={() => setStage("landing")}
              className="mt-8 text-sm text-zinc-500 transition hover:text-white"
            >
              Back to Landing
            </button>
          </div>
        </section>
      )}

      {stage === "library" && (
        <section className="relative z-10 flex min-h-screen flex-col justify-center py-10">
          <div className="mx-auto w-full max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
              Library
            </p>

            <h2 className="mt-3 text-4xl font-black">Your music library</h2>

            <p className="mt-4 text-zinc-400">
              Songs you add, save, or super like during discovery will show up
              here.
            </p>

            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">➕ Added to playlist</p>
                  <p className="text-sm text-green-400">
                    {playlistSongs.length}
                  </p>
                </div>

                {playlistSongs.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {playlistSongs.map((song, index) => (
                      <div
                        key={`${song}-${index}`}
                        className="rounded-2xl bg-black/30 p-4"
                      >
                        <p className="font-semibold">{song}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500">
                    No added songs yet. Add songs during discovery and they will
                    appear here.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">💾 Saved for later</p>
                  <p className="text-sm text-white">
                    {savedSongTitles.length}
                  </p>
                </div>

                {savedSongTitles.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {savedSongTitles.map((song, index) => (
                      <div
                        key={`${song}-${index}`}
                        className="rounded-2xl bg-black/30 p-4"
                      >
                        <p className="font-semibold">{song}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500">
                    No saved songs yet. Save songs during discovery and they
                    will appear here.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">⭐ Super likes</p>
                  <p className="text-sm text-yellow-400">
                    {superLikedSongs.length}
                  </p>
                </div>

                {superLikedSongs.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {superLikedSongs.map((song, index) => (
                      <div
                        key={`${song}-${index}`}
                        className="rounded-2xl bg-black/30 p-4"
                      >
                        <p className="font-semibold">{song}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-500">
                    No super liked songs yet. Star songs during discovery and
                    they will appear here.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-4 rounded-3xl border border-white/10 bg-white/5 p-2 text-center text-xs text-zinc-400">
              <button
                onClick={() => setStage("home")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">🏠</div>
                Home
              </button>

              <button
                onClick={() => setStage("vibe")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">🎵</div>
                Discover
              </button>

              <button className="rounded-2xl bg-green-500/15 px-2 py-3 text-green-400">
                <div className="text-xl">📚</div>
                Library
              </button>

              <button
                onClick={() => setStage("profile")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">👤</div>
                Profile
              </button>
            </div>
          </div>
        </section>
      )}

      {stage === "profile" && (
        <section className="relative z-10 flex min-h-screen flex-col justify-center py-10">
          <div className="mx-auto w-full max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-500">
              Profile
            </p>

            <h2 className="mt-3 text-4xl font-black">Michael’s stats</h2>

            <p className="mt-4 text-zinc-400">
              Track your music discovery progress as you build playlists.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-green-500">
                  {playlistSongs.length + savedSongTitles.length + superLikedSongs.length}
                </p>
                <p className="mt-2 text-sm text-zinc-400">Songs Collected</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-yellow-400">
                  {superLikedSongs.length}
                </p>
                <p className="mt-2 text-sm text-zinc-400">Super Likes</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-black text-white">
                  {playlistSongs.length}
                </p>
                <p className="mt-2 text-sm text-zinc-400">Playlist Songs</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-black text-purple-400">
                  {selectedVibe || "None"}
                </p>
                <p className="mt-2 text-sm text-zinc-400">Last Vibe</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="font-bold">Favorite discovery mode</p>
              <p className="mt-2 text-sm text-zinc-400">
                Keep swiping and SwipeTune will learn what kind of music you
                like most.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-4 rounded-3xl border border-white/10 bg-white/5 p-2 text-center text-xs text-zinc-400">
              <button
                onClick={() => setStage("home")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">🏠</div>
                Home
              </button>

              <button
                onClick={() => setStage("vibe")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">🎵</div>
                Discover
              </button>

              <button
                onClick={() => setStage("library")}
                className="rounded-2xl px-2 py-3 transition hover:bg-white/10 hover:text-white"
              >
                <div className="text-xl">📚</div>
                Library
              </button>

              <button className="rounded-2xl bg-green-500/15 px-2 py-3 text-green-400">
                <div className="text-xl">👤</div>
                Profile
              </button>
            </div>
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
            onClick={() => selectedVibe && startDiscovery(selectedVibe)}
            className="mt-10 w-full max-w-sm rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            disabled={!selectedVibe}
          >
            Start Swiping
          </button>

          <button
            onClick={() => setStage("home")}
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

          <div className="mb-4 flex w-full max-w-sm justify-between text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <span>← Skip</span>
            <span>Right adds →</span>
          </div>

          <div className="relative w-full max-w-sm">
            {feedback && (
              <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 px-5 py-2 text-sm font-bold text-white shadow-xl backdrop-blur">
                {feedback}
              </div>
            )}

            <div
              className={`rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur transition-all duration-500 ease-out ${getCardMotionStyles()}`}
            >
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
                <p className="mt-1 text-lg text-zinc-400">
                  {currentSong.artist}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  {currentSong.genre} • {currentSong.year}
                </p>
              </div>

              <button
                type="button"
                onClick={togglePreview}
  className={`mt-6 w-full rounded-full py-3 font-bold transition ${
    isPreviewPlaying
      ? "bg-green-500 text-black hover:bg-green-400"
      : "bg-white text-black hover:bg-zinc-200"
  }`}
>
  {isPreviewPlaying ? "⏸ Playing preview..." : "▶ Play 30 sec preview"}
</button>

              <div className="mt-6 grid grid-cols-4 gap-3">
                <button
                  onClick={() => nextSong("skip")}
                  className="rounded-2xl bg-red-500/15 py-4 text-xl transition hover:bg-red-500/25"
                  title="Not Interested"
                >
                  🚫
                </button>

                <button
                  onClick={() => nextSong("save")}
                  className="rounded-2xl bg-white/5 py-4 text-xl transition hover:bg-white/10"
                  title="Save for Later"
                >
                  💾
                </button>

                <button
                  onClick={() => nextSong("add")}
                  className="rounded-2xl bg-green-500/20 py-4 text-xl transition hover:bg-green-500/30"
                  title="Add to Playlist"
                >
                  ➕
                </button>

                <button
                  onClick={() => nextSong("superlike")}
                  className="rounded-2xl bg-yellow-500/20 py-4 text-xl transition hover:bg-yellow-500/30"
                  title="Super Like"
                >
                  ⭐
                </button>
              </div>
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
            You just finished your SwipeTune discovery session.
          </p>

          <div className="mt-10 grid w-full max-w-sm grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-black text-green-500">{addedSongs}</p>
              <p className="mt-2 text-xs text-zinc-400">Added</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-black text-white">{savedSongs}</p>
              <p className="mt-2 text-xs text-zinc-400">Saved</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-black text-yellow-400">
                {superLikes}
              </p>
              <p className="mt-2 text-xs text-zinc-400">Stars</p>
            </div>
          </div>

          <button
            onClick={() => setStage("library")}
            className="mt-8 w-full max-w-sm rounded-full bg-white py-4 text-lg font-bold text-black transition hover:bg-zinc-200"
          >
            View Library
          </button>

          <button
            onClick={resetDemo}
            className="mt-4 w-full max-w-sm rounded-full bg-green-500 py-4 text-lg font-bold text-black transition hover:bg-green-400"
          >
            Start Over
          </button>
        </section>
      )}
    </main>
  );
}