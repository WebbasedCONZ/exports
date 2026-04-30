'use client';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: Props) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141414] border border-[#252525] rounded-sm pl-9 pr-4 py-2 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#3a3a3a] transition-colors"
      />
    </div>
  );
}
