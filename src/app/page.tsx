"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type RemoteGame = {
  name: string;
  identifier: string;
  thumbnail: string;
  active: boolean;
  order?: number;
};

export default function GamingAppInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<RemoteGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/external-user/games", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to fetch games: ${res.status}`);
        }
        const json = await res.json();
        if (isMounted) {
          const list: RemoteGame[] = Array.isArray(json?.data) ? json.data : [];
          // Only active games, sort by order if provided
          const normalized = list
            .filter((g) => g.active)
            .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
          setGames(normalized);
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <main className="container mx-auto px-2 md:px-6 pb-10">
        {/* Header */}
        <header className="flex flex-col items-center justify-center py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-2">
            Stock Games
          </h1>
          <p className="text-lg text-gray-200 font-medium">
            Play, Predict, and Win on Live Markets!
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mx-auto mb-10">
          <Input
            className="w-full bg-[#23272f] border-2 border-[#3a4256] ring-0 focus:bg-[#23272f]/90 focus:border-yellow-400 text-white placeholder:text-gray-400 h-14 pl-12 rounded-xl shadow-lg transition-all"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
            size={24}
          />
        </div>

        {/* Game Grid */}
        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <p className="text-gray-300 text-xl font-semibold">Loading games…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64">
              <p className="text-red-300 text-xl font-semibold">{error}</p>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <p className="text-gray-300 text-xl font-semibold">
                No games found
              </p>
              <span className="mt-2 text-4xl animate-bounce">😢</span>
            </div>
          ) : (
            <div className="grid xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredGames.map((game) => (
                <Link
                  key={game.identifier}
                  href={`/games/${game.identifier}`}
                  className="w-full group"
                >
                  <Card
                    className="overflow-hidden rounded-2xl relative shadow-2xl border-0 bg-gradient-to-br from-[#23272f] to-[#1a1d23] hover:scale-105 hover:shadow-yellow-400/30 transition-transform duration-200 ease-in-out cursor-pointer"
                    style={{ aspectRatio: "170/240" }}
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={game.thumbnail}
                        alt={game.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        width={500}
                        height={320}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <h2 className="text-lg font-bold text-yellow-300 group-hover:text-pink-400 transition-colors truncate">
                        {game.name}
                      </h2>
                      <p className="text-sm text-gray-300 line-clamp-2">&nbsp;</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-yellow-400/90 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      Play Now
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
