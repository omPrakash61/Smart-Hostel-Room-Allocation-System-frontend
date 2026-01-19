import type { Room } from "./types";

const API_BASE = import.meta.env.VITE_BACKEND_URL || ""; // empty → same origin

export const fetchAllRooms = async (): Promise<Room[]> => {
  const res = await fetch(`${API_BASE}/api/rooms`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
};

export const searchRooms = async (
  capacity: number,
  ac: boolean | null,
  wash: boolean | null
): Promise<Room[]> => {
  const params = new URLSearchParams();
  if (capacity) params.append("capacity", capacity.toString());
  if (ac !== null) params.append("ac", ac ? "true" : "false");
  if (wash !== null) params.append("wash", wash ? "true" : "false");

  const res = await fetch(`${API_BASE}/api/rooms?${params}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};