import { Color, colors } from '@/data/colors';
import React, { useEffect, useRef, useState } from 'react';

interface ColorPickerProps {
  value: Color;
  onChange: (value: Color) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const colorOptions = Object.keys(colors) as Color[];

  const selected = colorOptions.find((o) => o === value) ?? 'purple';

  return (
    <div className="relative w-10 h-10 flex flex-col" ref={ref}>
      <div
        className={`capitalize w-full flex-grow rounded-md border ${colors[selected].border[600].base} ${colors[selected].text[600].base} focus:outline-none focus:ring-2 ${colors[selected].ring[500].focus} ${colors[selected].background[500].base}`}
        onClick={() => setOpen(!open)}
      ></div>

      {open && (
        <div className="absolute mt-1 w-15 border border-gray-300 rounded bg-white max-h-80 overflow-auto z-10">
          {colorOptions.map((option) => (
            <div
              key={option}
              className={`capitalize w-full h-10 text-black ${colors[option].background[500].base} ${colors[option].background[500].hover} ${colors[option].background[500].focus}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {' '}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
