import Image from 'next/image';

export default function PhotoGrid({ photos }: { photos: string[] }) {
  if (!photos?.length) return null;
  return (
    <div className="grid grid-cols-3 gap-1">
      {photos.map((src, i) => (
        <div key={i} className="aspect-square relative overflow-hidden bg-[#1a1a1a]">
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
