import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Genre, Currency } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...opts,
  });
}

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function daysUntil(isoDate: string): number {
  const diff = new Date(isoDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function genreColor(genre: Genre): string {
  const map: Record<string, string> = {
    '140': '#7c3aed',
    'UKG': '#0d9488',
    'Jungle': '#c2410c',
    'Industrial': '#6b21a8',
    'Techno': '#1d4ed8',
    'House': '#b45309',
    'Drum & Bass': '#065f46',
    'Grime': '#be123c',
    'Garage': '#0369a1',
    'Afrobeats': '#d97706',
    'Breaks': '#7e22ce',
    'Footwork': '#0f766e',
    'Dubstep': '#1e40af',
    'Ambient': '#374151',
    'Electro': '#4338ca',
  };
  return map[genre] ?? '#374151';
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    Open: '#c6ff00',
    Confirmed: '#00d4ff',
    Shortlisting: '#ffd700',
    Completed: '#888888',
    Cancelled: '#ff4444',
    Draft: '#555555',
    Pending: '#ffd700',
    Shortlisted: '#c6ff00',
    Rejected: '#ff4444',
    Withdrawn: '#555555',
    Sent: '#00d4ff',
    SignedByArtist: '#ffd700',
    SignedByBoth: '#c6ff00',
    Void: '#ff4444',
  };
  return map[status] ?? '#888888';
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
