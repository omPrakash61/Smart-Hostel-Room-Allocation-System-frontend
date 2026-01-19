import React, { useState } from "react";
import { useRooms } from "../context/RoomsContext";

export const AddRoomForm: React.FC = () => {
  const { addRoom } = useRooms();

  const [roomNo, setRoomNo] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [hasAC, setHasAC] = useState(false);
  const [hasWash, setHasWash] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    setIsLoading(true);
    try {
      const created = await addRoom({
        roomNo,
        capacity,
        hasAC,
        hasAttachedWashroom: hasWash,
      });
      if (created) {
        setStatus({ type: "success", message: "Room added successfully!" });
        setRoomNo("");
        setCapacity(1);
        setHasAC(false);
        setHasWash(false);
        setTimeout(() => setStatus({ type: null, message: "" }), 3000);
      } else {
        setStatus({ type: "error", message: "Failed to add room" });
      }
    } catch (err) {
      setStatus({ type: "error", message: `Error: ${String(err)}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3 mr-4">
          <span className="text-2xl">➕</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Add New Room</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Room Number *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., A101, B202"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Capacity (Students) *
          </label>
          <input
            type="number"
            min={1}
            max={6}
            required
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-blue-600">
              ❄️ Air Conditioning
            </span>
          </label>

          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={hasWash}
              onChange={(e) => setHasWash(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-blue-600">
              🚿 Washroom
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? "Adding..." : "Add Room"}
        </button>

        {status.type && (
          <div
            className={`p-4 rounded-lg text-sm font-medium transition-all ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {status.type === "success" ? "✅" : "❌"} {status.message}
          </div>
        )}
      </form>
    </section>
  );
};
