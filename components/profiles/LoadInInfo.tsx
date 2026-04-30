import { Clock, SquareParking, MoveVertical, Info } from 'lucide-react';
import type { Venue } from '@/types';

export default function LoadInInfo({ info }: { info: Venue['loadInInfo'] }) {
  return (
    <div className="space-y-4 text-sm">
      <div className="flex gap-3">
        <Clock size={15} className="text-[#c6ff00] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wide font-medium mb-1">Access Time</p>
          <p className="text-[#ccc]">{info.accessTime}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Info size={15} className="text-[#00d4ff] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wide font-medium mb-1">Load-In Instructions</p>
          <p className="text-[#ccc] leading-relaxed">{info.instructions}</p>
        </div>
      </div>
      <div className="flex gap-4 pt-1">
        <div className={`flex items-center gap-1.5 text-xs ${info.parkingAvailable ? 'text-[#c6ff00]' : 'text-[#444]'}`}>
          <SquareParking size={13} />
          Parking {info.parkingAvailable ? 'available' : 'unavailable'}
        </div>
        <div className={`flex items-center gap-1.5 text-xs ${info.elevatorAccess ? 'text-[#c6ff00]' : 'text-[#444]'}`}>
          <MoveVertical size={13} />
          Elevator {info.elevatorAccess ? 'available' : 'unavailable'}
        </div>
      </div>
      {info.additionalNotes && (
        <div className="bg-[#1a1a1a] border border-[#252525] rounded-sm p-3 text-xs text-[#888] leading-relaxed">
          {info.additionalNotes}
        </div>
      )}
    </div>
  );
}
