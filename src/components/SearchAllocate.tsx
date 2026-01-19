import React, { useState } from "react";
import { searchRooms } from "../api";
import { allocateRoom } from "../utils/allocator";
import type { Room } from "../types";

export const SearchAllocate: React.FC = () => {
  const [minCap, setMinCap] = useState(1);
  const [needsAC, setNeedsAC] = useState<null | boolean>(null);
  const [needsWash, setNeedsWash] = useState<null | boolean>(null);
  const [results, setResults] = useState<Room[]>([]);
  const [allocation, setAllocation] = useState<Room | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setMsg("");
    setIsSearching(true);
    try {
      const rooms = await searchRooms(minCap, needsAC, needsWash);
      setResults(rooms);
      setAllocation(null);
      if (rooms.length === 0) {
        setMsg("❌ No rooms match your criteria");
      }
    } catch (err) {
      setMsg(`❌ Search failed: ${String(err)}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAllocate = () => {
    const room = allocateRoom(
      results,
      minCap,
      needsAC ?? false,
      needsWash ?? false,
    );
    if (room) {
      setAllocation(room);
      setMsg(`✅ Allocated Room ${room.roomNo}`);
    } else {
      setAllocation(null);
      setMsg("❌ No room available");
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 h-fit sticky top-24 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-3 mr-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Search & Allocate</h2>
      </div>

      <div className="space-y-5">
        {/* Capacity */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Min. Capacity
          </label>
          <input
            type="number"
            min={1}
            max={6}
            value={minCap}
            onChange={(e) => setMinCap(parseInt(e.target.value, 10))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          />
        </div>

        {/* AC */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Air Conditioning
          </label>
          <select
            value={needsAC === null ? "" : needsAC ? "yes" : "no"}
            onChange={(e) => {
              const v = e.target.value;
              setNeedsAC(v === "" ? null : v === "yes");
            }}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
          >
            <option value="">Any</option>
            <option value="yes">Required ✓</option>
            <option value="no">Not needed</option>
          </select>
        </div>

        {/* Washroom */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Attached Washroom
          </label>
          <select
            value={needsWash === null ? "" : needsWash ? "yes" : "no"}
            onChange={(e) => {
              const v = e.target.value;
              setNeedsWash(v === "" ? null : v === "yes");
            }}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
          >
            <option value="">Any</option>
            <option value="yes">Required ✓</option>
            <option value="no">Not needed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSearching ? "Searching..." : "Search Rooms"}
          </button>
          <button
            onClick={handleAllocate}
            disabled={results.length === 0}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            Allocate Room
          </button>
        </div>

        {/* Result message */}
        {msg && (
          <div
            className={
              msg.includes("✅")
                ? "p-4 rounded-lg text-sm font-medium transition-all bg-green-50 text-green-800 border border-green-200"
                : "p-4 rounded-lg text-sm font-medium transition-all bg-red-50 text-red-800 border border-red-200"
            }
          >
            {msg}
          </div>
        )}

        {/* Table of search results */}
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Search Results ({results.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-green-300">
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Room
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-slate-700">
                      Cap
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-slate-700">
                      AC
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-slate-700">
                      Wash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-2 font-medium text-slate-900">
                        {r.roomNo}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded font-semibold text-xs">
                          {r.capacity}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={r.hasAC ? "" : "opacity-30"}>❄️</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={r.hasAttachedWashroom ? "" : "opacity-30"}
                        >
                          🚿
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
