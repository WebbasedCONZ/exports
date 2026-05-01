'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useEvent } from '@/hooks/useEvents';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, statusColor } from '@/lib/utils';
import GenreTagList from '@/components/profiles/GenreTagList';
import FeeNegotiation from '@/components/negotiation/FeeNegotiation';
import EmergencyButton from '@/components/emergency/EmergencyButton';
import { Eye, EyeOff, CheckCircle, XCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ApplicantsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { event, refresh } = useEvent(slug);
  const { profile } = useAuth();
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [expandedNeg, setExpandedNeg] = useState<Set<string>>(new Set());

  if (!event) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;

  const reveal = (appId: string) => setRevealedIds(prev => new Set([...prev, appId]));
  const toggleNeg = (appId: string) => setExpandedNeg(prev => {
    const next = new Set(prev);
    next.has(appId) ? next.delete(appId) : next.add(appId);
    return next;
  });

  async function updateStatus(appId: string, status: string) {
    const supabase = createClient();
    await supabase.from('applications').update({ status }).eq('id', appId);
    refresh();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <Link href={`/events/${slug}`} className="text-xs text-[#555] hover:text-[#888] mb-2 block">← Back to event</Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{event.title}</h1>
          <p className="text-[#555] text-sm mt-1">Applicant Shortlists</p>
        </div>
        <div className="flex items-center gap-2">
          {event.blind_applications && (
            <div className="flex items-center gap-2 text-xs text-[#888] border border-[#333] px-3 py-1.5 rounded-sm">
              <EyeOff size={12} /> Blind mode active
            </div>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {(event.slots ?? []).map((slot: any) => {
          const slotApps = (event as any).applications?.filter((a: any) => a.slot_id === slot.id) ?? [];
          const shortlist = [...slotApps].sort((a: any, b: any) => b.match_score - a.match_score).slice(0, 5);

          return (
            <section key={slot.id}>
              <div className="flex flex-wrap items-center justify-between mb-4 pb-3 border-b border-[#1a1a1a] gap-3">
                <div>
                  <h2 className="font-semibold text-base">{slot.slot_type} — {slot.start_time}–{slot.end_time}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <GenreTagList genres={slot.genres ?? []} size="sm" />
                    <span className="text-xs text-[#555]">{formatCurrency(slot.fee, slot.currency)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-xs text-[#555]">
                    <p>{slotApps.length} application{slotApps.length !== 1 ? 's' : ''}</p>
                    <p className="text-[#3d52ff]">Top {Math.min(shortlist.length, 5)} shown</p>
                  </div>
                  {/* Emergency button per slot */}
                  <EmergencyButton
                    eventId={event.id}
                    slotId={slot.id}
                    slotFee={slot.fee}
                    currency={slot.currency}
                    slotLabel={`${slot.slot_type} ${slot.start_time}–${slot.end_time}`}
                  />
                </div>
              </div>

              {shortlist.length === 0 ? (
                <p className="text-sm text-[#444] py-6 text-center">No applications yet for this slot.</p>
              ) : (
                <div className="space-y-3">
                  {shortlist.map((app: any, rank: number) => {
                    const artist = app.artist;
                    const artistProfile = artist?.profile;
                    const revealed = revealedIds.has(app.id) || !event.blind_applications;
                    const sColor = statusColor(app.status);
                    const negOpen = expandedNeg.has(app.id);

                    return (
                      <div key={app.id} className="bg-[#141414] border border-[#252525] rounded-md p-4 hover:border-[#3a3a3a] transition-colors">
                        <div className="flex items-start gap-4">
                          {/* Rank */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center bg-[#1a1a1a] text-xs font-bold text-[#555]">
                            {rank === 0 ? <Star size={14} className="text-[#ffd700]" /> : `#${rank + 1}`}
                          </div>

                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {revealed && artistProfile?.profile_photo ? (
                              <Image src={artistProfile.profile_photo} alt={artistProfile.display_name} width={44} height={44} className="rounded-full object-cover" />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-[#252525] flex items-center justify-center text-[#444]">
                                {revealed && artistProfile ? (
                                  <span className="text-sm font-bold text-[#555]">{artistProfile.display_name?.[0]}</span>
                                ) : (
                                  <EyeOff size={14} />
                                )}
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-sm">
                                {revealed && artistProfile ? artistProfile.display_name : `Applicant #${rank + 1}`}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded-sm border"
                                style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
                                {app.status}
                              </span>
                              <span className="text-[10px] text-[#555]">Match: {app.match_score}%</span>
                            </div>
                            {revealed && artist && (
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <GenreTagList genres={artist.genres ?? []} size="sm" />
                                <span className="text-[10px] text-[#555]">{artist.experience_level}</span>
                              </div>
                            )}
                            <p className="text-xs text-[#666] leading-relaxed line-clamp-2">{app.cover_note}</p>
                            {app.mix_url && revealed && (
                              <a href={app.mix_url} target="_blank" rel="noopener noreferrer"
                                className="text-xs text-[#00d4ff] hover:underline mt-1 inline-block">
                                Mix link →
                              </a>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            {event.blind_applications && !revealedIds.has(app.id) && (
                              <button onClick={() => reveal(app.id)}
                                className="flex items-center gap-1 text-xs text-[#555] hover:text-[#ededed] transition-colors">
                                <Eye size={12} /> Reveal
                              </button>
                            )}
                            {app.status === 'Pending' && (
                              <div className="flex gap-2">
                                <button onClick={() => updateStatus(app.id, 'Shortlisted')}
                                  className="p-1.5 rounded-sm border border-[#3d52ff]/20 text-[#3d52ff] hover:bg-[#3d52ff]/10 transition-colors"
                                  title="Shortlist">
                                  <CheckCircle size={14} />
                                </button>
                                <button onClick={() => updateStatus(app.id, 'Rejected')}
                                  className="p-1.5 rounded-sm border border-[#ff4444]/20 text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors"
                                  title="Reject">
                                  <XCircle size={14} />
                                </button>
                              </div>
                            )}
                            {app.status === 'Shortlisted' && (
                              <button onClick={() => updateStatus(app.id, 'Confirmed')}
                                className="px-3 py-1.5 bg-[#3d52ff] text-black text-xs font-semibold rounded-sm hover:bg-[#2a3fe0] transition-colors">
                                Confirm
                              </button>
                            )}
                            {/* Fee negotiation toggle */}
                            <button onClick={() => toggleNeg(app.id)}
                              className="flex items-center gap-1 text-xs text-[#555] hover:text-[#3d52ff] transition-colors">
                              {negOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                              Negotiate fee
                            </button>
                          </div>
                        </div>

                        {/* Fee negotiation panel */}
                        {negOpen && (
                          <div className="mt-4 pt-4 border-t border-[#252525]">
                            <FeeNegotiation
                              applicationId={app.id}
                              originalFee={slot.fee}
                              currency={slot.currency}
                            />
                          </div>
                        )}
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
