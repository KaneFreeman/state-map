'use client';

import { type State, STATES } from '@/data/states';
import { useSearchParams } from 'next/navigation';
import { MouseEvent, Suspense, useEffect, useState } from 'react';

function HomePage() {
  const searchParams = useSearchParams();
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  useEffect(() => {
    const statesParam = searchParams.get('states') || '';
    if (statesParam) {
      setSelectedStates(statesParam.split(',').filter(Boolean));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedStates.length) {
      window.history.pushState(null, '', `?states=${selectedStates.join(',')}`);
    } else {
      window.history.pushState(null, '', '');
    }
  }, [selectedStates]);

  const toggleState = (event: MouseEvent, state: State) => {
    event.preventDefault();
    setSelectedStates((prev) => {
      let states: string[];
      if (prev.includes(state.abbreviation)) {
        states = prev.filter((s) => s !== state.abbreviation);
      } else {
        states = [...prev, state.abbreviation];
      }

      states.sort();

      return states;
    });
  };

  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const handleEmbed = () => {
    if (selectedStates.length === 0) {
      return;
    }

    navigator.clipboard.writeText(window.location.href.replace('/?', '/embed?')).then(() => {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 5000);
    });
  };

  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    if (selectedStates.length === 0) {
      return;
    }

    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">State Map</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:py-8 py-6">
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between mb-6">
          <h2 className="sm:text-2xl text-xl font-bold">Click states to select them</h2>
          <div className="relative flex gap-2">
            <button
              onClick={handleEmbed}
              className="inline-flex items-center gap-2 rounded-md border border-indigo-600 px-3 py-1.5 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={selectedStates.length === 0}
            >
              {copiedEmbed ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                  </svg>
                  Embed
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={selectedStates.length === 0}
            >
              {copied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                    />
                  </svg>
                  Share
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="40,0 1000,589">
            {STATES.map((state) => (
              <a
                key={`map-${state.abbreviation}`}
                onClick={($event) => toggleState($event, state)}
                className={`transition-colors duration-[100ms]  ${
                  selectedStates.includes(state.abbreviation)
                    ? 'bg-indigo-600 text-indigo-600 hover:bg-indigo-800 hover:text-indigo-800'
                    : 'bg-white text-white hover:bg-indigo-200 hover:text-indigo-200'
                }`}
              >
                <title>{state.name}</title>
                {state.path}
              </a>
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATES.map((state) => (
            <button
              key={state.abbreviation}
              onClick={($event) => toggleState($event, state)}
              className={`p-4 rounded-lg border ${
                selectedStates.includes(state.abbreviation) ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600">Selected States: {selectedStates.join(', ') || 'None'}</div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
