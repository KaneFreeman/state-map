'use client';

import { STATES } from '@/data/states';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EmbeddedMapPage() {
  const searchParams = useSearchParams();
  const statesParam = searchParams.get('states') || '';
  const selectedStates = statesParam.split(',').filter(Boolean);

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex sm:flex-row flex-col gap-4 items-center justify-center">
        <h2 className="text-2xl font-bold">
          Visited: {selectedStates.length} / {STATES.length}
        </h2>
      </div>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="40 0 1000 589"
          className="max-w-full h-auto"
          aria-label="US States Map"
          role="img"
        >
          {STATES.map((state) => (
            <g
              key={`map-embed-${state.abbreviation}`}
              className={
                selectedStates.includes(state.abbreviation) ? 'bg-indigo-600 text-indigo-600' : 'bg-white text-white'
              }
              strokeWidth={1}
            >
              <title>{state.name}</title>
              {state.path}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function EmbeddedMap() {
  return (
    <Suspense>
      <EmbeddedMapPage />
    </Suspense>
  );
}
