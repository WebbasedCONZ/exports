'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useEvent } from '@/hooks/useEvents';
import { useApplications } from '@/hooks/useApplications';
import { useArtists } from '@/hooks/useArtists';
import { getShortlist } from '@/lib/matching';
import { formatCurrency, statusColor } from '@/lib/utils';
import { upsert, KEYS } from '@/lib/storage';
import Avatar from '@/components/ui/Avatar';
import GenreTagList from '@/components/profiles/GenreTagList';
import Button from '@/components/ui/Button';
import { Eye, EyeOff, CheckCircle, XCircle, Star } from 'lucide-react';
import type { Application } from '@/types';
import Link from 'next/link';

export default function ApplicantsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { event } = useEvent(slug);
  const { applications, saveApplication, refresh } = useApplications(event?.id);
  const { artists } = useArtists();
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  if (!event) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;

  const reveal = (appId: string) => setRevealedIds((prev) => new Set([...prev, appId]));

  const updateStatus = (app: Application, status: Application['status']) => {
    const updated: Application = { ...app, status, updatedAt: new Date().toISOString() };
    upsert(KEYS.applications, updated);
    refresh();
  };

  const getArtist = (artistId: string) => artists.find((a) => a.id === artistId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href={`/events/${slug}`} className="text-xs text-[#555] hover:text-[#888] mb-2 block">← Back to event</Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{event.title}</h1>
          <p className="text-[#555] text-sm mt-1">Applicant Shortlists</p>
        </div>
        {event.blindApplications && (
          <div className="flex items-center gap-2 text-xs text-[#888] border border-[#333] px-3 py-1.5 rounded-sm">
            <EyeOff size={12} /> Blind mode active
          </div>
        )}
      </div>

      <div className="space-y-10">
        {event.slots.map((slot) => {
          const shortlist = getShortlist(applications, slot.id, 5);
          const allSlotApps = applications.filter((a) => a.slotId === slot.id);

          return (
            <section key={slot.id}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a1a1a]">
                <div>
                  <h2 className="font-semibold text-base">{slot.slotType} — {slot.startTime}–{slot.endTime}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <GenreTagList genres={slot.genres} size="sm" />
                    <span className="text-xs text-[#555]">{formatCurrency(slot.fee, slot.currency)}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-[#555]">
                  <p>{allSlotApps.length} application{allSlotApps.length !== 1 ? 's' : ''}</p>
                  <p className="text-[#c6ff00]">Top {Math.min(shortlist.length, 5)} shown</p>
                </div>
              </div>

              {shortlist.length === 0 ? (
                <p className="text-sm text-[#444] py-6 text-center">No applications yet for this slot.</p>
              ) : (
                <div className="space-y-3">
                  {shortlist.map((app, rank) => {
                    const artist = getArtist(app.artistId);
                    const revealed = revealedIds.has(app.id) || !event.blindApplications;
                    const sColor = statusColor(app.status);

                    return (
                      <div key={app.id} className="bg-[#141414] border border-[#252525] rounded-md p-4 hover:border-[#3a3a3a] transition-colors">
                        <div className="flex items-start gap-4">
                          {/* Rank */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center bg-[#1a1a1a] text-xs font-bold text-[#555]">
                            {rank === 0 ? <Star size={14} className="text-[#ffd700]" /> : `#${rank + 1}`}
                          </div>

                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {revealed && artist ? (
                              <Avatar src={artist.profilePhoto} name={artist.displayName} size={44} />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-[#252525] flex items-center justify-center text-[#444]">
                                <EyeOff size={14} />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">
                                {revealed && artist ? artist.displayName : `Applicant #${rank + 1}`}
                              </span>
                              <span
                                className="text-[10px] px-1.5 py-0.5 rounded-sm border"
                                style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}
                              >
                                {app.status}
                              </span>
                              <span className="text-[10px] text-[#555]">Match: {app.matchScore}%</span>
                            </div>
                            {revealed && artist && (
                              <div className="flex items-center gap-2 mb-2">
                                <GenreTagList genres={artist.genres} size="sm" />
                                <span className="text-[10px] text-[#555]">{artist.experienceLevel}</span>
                              </div>
                            )}
                            <p className="text-xs text-[#666] leading-relaxed line-clamp-2">{app.coverNote}</p>
                            {app.mixUrl && revealed && (
                              <a href={app.mixUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00d4ff] hover:underline mt-1 inline-block">
                                Mix link →
                              </a>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            {event.blindApplications && !revealedIds.has(app.id) && (
                              <button
                                onClick={() => reveal(app.id)}
                                className="flex items-center gap-1 text-xs text-[#555] hover:text-[#ededed] transition-colors"
                              >
                                <Eye size={12} /> Reveal
                              </button>
                            )}
                            {app.status === 'Pending' && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updateStatus(app, 'Shortlisted')}
                                  className="p-1.5 rounded-sm border border-[#c6ff00]/20 text-[#c6ff00] hover:bg-[#c6ff00]/10 transition-colors"
                                  title="Shortlist"
                                >
                                  <CheckCircle size={14} />
                                </button>
                                <button
                                  onClick={() => updateStatus(app, 'Rejected')}
                                  className="p-1.5 rounded-sm border border-[#ff4444]/20 text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors"
                                  title="Reject"
                                >
                                  <XCircle size={14} />
                                </button>
                              </div>
                            )}
                            {app.status === 'Shortlisted' && (
                              <Button size="sm" onClick={() => updateStatus(app, 'Confirmed')}>Confirm</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
