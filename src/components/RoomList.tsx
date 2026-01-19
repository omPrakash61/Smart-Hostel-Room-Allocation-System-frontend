import React from "react";
import { useRooms } from "../context/RoomsContext";

export const RoomList: React.FC = () => {
  const { rooms } = useRooms();

  if (rooms.length === 0)
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">🛏️</div>
        <p className="text-2xl font-semibold text-slate-700 mb-2">
          No Rooms Yet
        </p>
        <p className="text-slate-500">Add your first room to get started</p>
      </div>
    );

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center">
          <span className="text-3xl mr-3">📋</span> Room Inventory
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Total Rooms: {rooms.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="px-6 py-4 text-left font-semibold">Room No.</th>
              <th className="px-6 py-4 text-center font-semibold">Capacity</th>
              <th className="px-6 py-4 text-center font-semibold">AC</th>
              <th className="px-6 py-4 text-center font-semibold">Washroom</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg inline-block">
                    {r.roomNo}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full font-semibold">
                    {r.capacity}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-lg ${r.hasAC ? "" : "opacity-30"}`}>
                    ❄️
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-lg ${r.hasAttachedWashroom ? "" : "opacity-30"}`}
                  >
                    🚿
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
