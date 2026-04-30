'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const { profile, loading } = useAuth();
  const { messages, sendMessage } = useMessages(id);
  const router = useRouter();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) return null;
  if (!profile) { router.push('/auth/login'); return null; }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    await sendMessage(profile.id, text.trim());
    setText('');
    setSending(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 py-4 border-b border-[#252525]">
        <Link href="/messages" className="text-[#555] hover:text-[#ededed] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <p className="text-sm font-medium text-[#ededed]">Conversation</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map(msg => {
          const isMe = msg.sender_id === profile.id;
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-[#252525] flex-shrink-0 overflow-hidden">
                  {msg.sender?.profile_photo
                    ? <Image src={msg.sender.profile_photo} alt="" width={28} height={28} className="object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-[10px] text-[#555]">{msg.sender?.display_name?.[0]}</div>
                  }
                </div>
              )}
              <div className={`max-w-[75%] px-3 py-2 rounded-md text-sm ${isMe ? 'bg-[#c6ff00] text-black' : 'bg-[#1a1a1a] border border-[#252525] text-[#ededed]'}`}>
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="py-4 border-t border-[#252525] flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#c6ff00]"
        />
        <button type="submit" disabled={!text.trim() || sending}
          className="px-3 py-2 bg-[#c6ff00] text-black rounded-sm hover:bg-[#b5ee00] transition-colors disabled:opacity-40">
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
