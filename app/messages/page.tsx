'use client';
import { useAuth } from '@/hooks/useAuth';
import { useConversations, getOrCreateConversation } from '@/hooks/useMessages';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function MessagesPage() {
  const { profile, loading } = useAuth();
  const { conversations } = useConversations(profile?.id ?? '');
  const router = useRouter();

  if (loading) return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;
  if (!profile) { router.push('/auth/login'); return null; }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={20} className="text-[#c6ff00]" />
        <h1 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Messages</h1>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No conversations yet</p>
          <p className="text-xs mt-1">Message an artist or promoter from their profile</p>
        </div>
      ) : (
        <div className="space-y-1">
          {conversations.map(convo => {
            const other = convo.participant_a === profile.id
              ? convo.participant_b_profile
              : convo.participant_a_profile;
            return (
              <Link key={convo.id} href={`/messages/${convo.id}`}
                className="flex items-center gap-3 p-4 bg-[#141414] border border-[#252525] rounded-md hover:border-[#3a3a3a] transition-colors">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#252525] flex-shrink-0">
                  {other?.profile_photo
                    ? <Image src={other.profile_photo} alt={other.display_name} width={40} height={40} className="object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[#555] text-sm font-bold">{other?.display_name?.[0]}</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#ededed] truncate">{other?.display_name}</p>
                  <p className="text-xs text-[#555]">{other?.role}</p>
                </div>
                {convo.last_message_at && (
                  <p className="text-xs text-[#444] flex-shrink-0">{formatDate(convo.last_message_at)}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
