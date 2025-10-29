'use client';

import { useEffect, useState } from 'react';

type CounterState = {
  current: number;
  history: number[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function Home() {
  const [state, setState] = useState<CounterState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadState = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/counter`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data: CounterState = await response.json();
      setState(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load counter');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = async () => {
    try {
      const response = await fetch(`${API_BASE}/counter/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data: CounterState = await response.json();
      setState(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update counter');
    }
  };

  useEffect(() => {
    void loadState();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4">
      <main className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-center text-2xl font-semibold text-slate-900">Super Simple Counter</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Click the button below to increase the count by 1. The backend keeps a simple history for you.
        </p>
        <section className="mt-6 text-center">
          {isLoading ? (
            <p className="text-slate-500">Loading counter…</p>
          ) : errorMessage ? (
            <p className="text-red-600">{errorMessage}</p>
          ) : (
            <>
              <p className="text-5xl font-bold text-slate-900" data-testid="counter-value">
                {state?.current ?? 0}
              </p>
              <button
                type="button"
                onClick={handleIncrement}
                className="mt-4 w-full rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Increase by 1
              </button>
              <div className="mt-6 text-left">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  History
                </h2>
                {state && state.history.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {state.history.map((value, index) => (
                      <li key={`${value}-${index}`}>{value}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">No increments yet.</p>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
