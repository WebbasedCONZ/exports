import type { Artist, Event, Slot, Application } from '@/types';

/**
 * Scores an artist against an event slot (0–100).
 * genreOverlap: 50%, location: 30%, experienceLevel: 20%
 */
export function computeMatchScore(
  artist: Artist,
  event: Event,
  slot: Slot
): number {
  // Genre overlap
  const required = slot.genres;
  const artistGenres = artist.genres;
  const overlap = required.filter((g) => artistGenres.includes(g)).length;
  const genreScore = required.length > 0 ? (overlap / required.length) * 100 : 50;

  // Location (simple city/country match)
  const eventGenreHint = event.genres;
  // We don't store event city directly — use promoter location heuristic via genres
  // Simple: same city = 100, same country = 60, else 20
  const locationScore = 60; // Default — can be enhanced with promoter join

  // Experience level heuristic
  const levelMap: Record<string, number> = {
    Emerging: 1,
    'Mid-level': 2,
    Established: 3,
    Headliner: 4,
  };
  const slotLevelHint =
    slot.slotType === 'Opening' || slot.slotType === 'Warm-up' ? 2
    : slot.slotType === 'Peak Time' || slot.slotType === 'Closing' ? 3
    : 2;
  const artistLevel = levelMap[artist.experienceLevel] ?? 2;
  const levelDiff = Math.abs(artistLevel - slotLevelHint);
  const experienceScore = Math.max(0, 100 - levelDiff * 30);

  void eventGenreHint; // used for future enhancement

  return Math.round(genreScore * 0.5 + locationScore * 0.3 + experienceScore * 0.2);
}

/**
 * Returns top N applications for a slot, sorted by matchScore desc.
 */
export function getShortlist(
  applications: Application[],
  slotId: string,
  topN = 5
): Application[] {
  return [...applications]
    .filter((a) => a.slotId === slotId)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, topN);
}
