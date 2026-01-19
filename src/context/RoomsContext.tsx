import React, { createContext, useContext, useEffect, useState } from "react";
import type { Room } from "../types";
import { fetchAllRooms } from "../api";

interface RoomsContextProps {
  rooms: Room[];
  refresh: () => Promise<void>;
  addRoom: (room: Omit<Room, "id">) => Promise<Room | null>;
}

const RoomsContext = createContext<RoomsContextProps | undefined>(undefined);

export const useRooms = () => {
  const ctx = useContext(RoomsContext);
  if (!ctx) throw new Error("useRooms must be used within RoomsProvider");
  return ctx;
};

export const RoomsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

  const refresh = async () => {
    const data = await fetchAllRooms();
    setRooms(data);
  };

  const addRoom = async (room: Omit<Room, "id">) => {
    try {
      const res = await fetch(`${API_BASE}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const created = await res.json();
      if (created?.id) {
        setRooms((prev) => [...prev, created]);
        return created as Room;
      }
      return null;
    } catch (error) {
      console.error("Error adding room:", error);
      throw error;
    }
  };

  // Load rooms on mount
  useEffect(() => {
    refresh();
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, refresh, addRoom }}>
      {children}
    </RoomsContext.Provider>
  );
};
