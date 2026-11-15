import React from 'react';
import AppIcon from './AppIcon';
import type { StageIcon } from '../lib/stageIcons';

// Fixed positions, as percentages of the box, for the static ring of icons.
const SLOTS = [
  { x: 6, y: 18, z: 60 },
  { x: 70, y: 10, z: 20 },
  { x: 76, y: 56, z: 80 },
  { x: 10, y: 62, z: 40 },
  { x: 40, y: 80, z: 90 },
  { x: 42, y: 2, z: -40 },
];

/**
 * The hero poster: a phone and a ring of app icons placed with CSS 3D, no WebGL.
 * It shows first, and stays when 3D is unavailable. Decorative, so hidden from screen readers.
 */
const IconCluster: React.FC<{ icons: StageIcon[] }> = ({ icons }) => {
  const shown = icons.filter((icon) => !icon.inProgress).slice(0, SLOTS.length);
  const [lead, ...rest] = shown;
  const rows = rest.slice(0, 3);

  return (
    <div aria-hidden="true" className="css3d-stage absolute inset-0 flex items-center justify-center">
      <div className="css3d-ring relative aspect-square w-[min(84%,36rem)] sm:w-[min(100%,36rem)]">
        <div
          className="absolute left-1/2 top-1/2 aspect-[1/2.1] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-[14%] border border-line-strong bg-device shadow-float"
        >
          <div
            className="absolute inset-[4%] overflow-hidden rounded-[11%] bg-surface"
            style={{ containerType: 'inline-size' }}
          >
            {/* App UI in cqw units, so it scales with the phone like the 3D screen texture does. */}
            <div className="flex items-center justify-between px-[11cqw] pt-[7cqw] text-ink">
              <span className="text-[8cqw] font-semibold leading-none">9:41</span>
              <span className="h-[5cqw] w-[10cqw] rounded-full bg-ink" />
              <span className="h-[4cqw] w-[9cqw] rounded-[1cqw] bg-ink" />
            </div>
            {lead && (
              <div className="mt-[14cqw] flex flex-col items-center">
                <AppIcon src={lead.icon} name={lead.name} className="aspect-square w-[40cqw] shrink-0" />
                <span className="mt-[6cqw] max-w-[88cqw] truncate text-[9cqw] font-bold leading-none text-ink">{lead.name}</span>
                <span className="mt-[5cqw] h-[2.5cqw] w-[20cqw] rounded-full bg-tint" />
              </div>
            )}
            <div className="mt-[10cqw] space-y-[3cqw] px-[7cqw]">
              {rows.map((row) => (
                <div key={row.id} className="flex items-center gap-[3cqw] rounded-[5cqw] bg-raised p-[3cqw]">
                  <AppIcon src={row.icon} name={row.name} className="aspect-square w-[12cqw] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[5.5cqw] font-semibold leading-none text-ink">{row.name}</span>
                    <span className="mt-[2cqw] block h-[2cqw] w-[28cqw] rounded-full bg-ink-3 opacity-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {shown.map((icon, index) => {
          const slot = SLOTS[index];
          return (
            <div
              key={icon.id}
              className="absolute w-[19%]"
              style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: `translateZ(${slot.z}px)` }}
            >
              <AppIcon src={icon.icon} name={icon.name} className="aspect-square w-full shadow-float" muted={icon.inProgress} priority />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconCluster;
