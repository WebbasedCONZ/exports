'use client';

import { setCollection, getCollection, KEYS } from './storage';
import artistsData from '@/data/artists.json';
import promotersData from '@/data/promoters.json';
import venuesData from '@/data/venues.json';
import eventsData from '@/data/events.json';
import applicationsData from '@/data/applications.json';
import contractsData from '@/data/contracts.json';

export function hydrateSeedData(): void {
  if (typeof window === 'undefined') return;
  if (getCollection(KEYS.seeded).length > 0) return;

  setCollection(KEYS.artists, artistsData);
  setCollection(KEYS.promoters, promotersData);
  setCollection(KEYS.venues, venuesData);
  setCollection(KEYS.events, eventsData);
  setCollection(KEYS.applications, applicationsData);
  setCollection(KEYS.contracts, contractsData);
  setCollection(KEYS.seeded, [{ id: '1' }]);

  // Set default current user (artist - SHIRIN)
  if (!localStorage.getItem('exports:currentUser')) {
    localStorage.setItem(
      'exports:currentUser',
      JSON.stringify({
        role: 'artist',
        profileId: 'artist-001',
        displayName: 'SHIRIN',
        profilePhoto: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
      })
    );
  }
}
