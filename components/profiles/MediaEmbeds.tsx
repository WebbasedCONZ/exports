'use client';

interface Embed {
  type: 'soundcloud' | 'mixcloud';
  url: string;
  label: string;
}

function getSoundCloudUrl(url: string) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23c6ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
}

function getMixcloudUrl(url: string) {
  const feed = url.replace('https://www.mixcloud.com', '');
  return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(feed)}&light=0`;
}

export default function MediaEmbeds({ embeds }: { embeds: Embed[] }) {
  if (!embeds?.length) return null;
  return (
    <div className="space-y-4">
      {embeds.map((embed, i) => (
        <div key={i} className="rounded-md overflow-hidden border border-[#252525]">
          <div className="px-3 py-2 bg-[#1a1a1a] border-b border-[#252525] flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-medium text-[#555]">
              {embed.type === 'soundcloud' ? '◉ SoundCloud' : '◈ Mixcloud'}
            </span>
            <span className="text-xs text-[#555] truncate">{embed.label}</span>
          </div>
          <iframe
            src={embed.type === 'soundcloud' ? getSoundCloudUrl(embed.url) : getMixcloudUrl(embed.url)}
            className="w-full"
            height={embed.type === 'soundcloud' ? 166 : 120}
            frameBorder="0"
            allow="autoplay"
            title={embed.label}
          />
        </div>
      ))}
    </div>
  );
}
