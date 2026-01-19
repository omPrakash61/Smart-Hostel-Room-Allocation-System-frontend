import type { Room } from "../types";

/**
 * Returns the *smallest* room that satisfies the given constraints.
 * If none match, returns undefined.
 *
 * @param rooms          List of all rooms (already fetched)
 * @param minCapacity    Minimum capacity required
 * @param needsAC        true => must have AC, false => any
 * @param needsWash      true => must have attached washroom, false => any
 */
export function allocateRoom(
  rooms: Room[],
  minCapacity: number,
  needsAC: boolean,
  needsWash: boolean
): Room | undefined {
  // Filter rooms that meet all requirements
  const candidates = rooms.filter((r) => {
    if (r.capacity < minCapacity) return false;
    if (needsAC && !r.hasAC) return false;
    if (needsWash && !r.hasAttachedWashroom) return false;
    return true;
  });

  // Sort by capacity ascending → smallest possible room first
  candidates.sort((a, b) => a.capacity - b.capacity);

  // Return the first (smallest) candidate or undefined
  return candidates[0];
}