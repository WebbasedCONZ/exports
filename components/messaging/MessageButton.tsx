'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getOrCreateConversation } from '@/hooks/useMessages';
import { MessageSquare } from 'lucide-react';

interface Props {
  recipientProfileId: string;
  label?: string;
}

export default function MessageButton({ recipientProfileId, label = 'Message' }: Props) {
  const { profile } = useAuth();
  const router = useRouter();

  async function handleClick() {
    if (!profile) { router.push('/auth/login'); return; }
    const convoId = await getOrCreateConversation(profile.id, recipientProfileId);
    if (convoId) router.push(`/messages/${convoId}`);
  }

  return (
    <button onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 border border-[#252525] rounded-sm text-sm text-[#555] hover:text-[#ededed] hover:border-[#3a3a3a] transition-colors">
      <MessageSquare size={14} />
      {label}
    </button>
  );
}
