import { useState, useEffect } from 'react';

type StateTuple<T, E> = [T | undefined, Error | E | undefined, number];

export type ResultTuple<T, E = void> = [T | undefined, Error | E | undefined, boolean];

function usePromise<T, E = void>(promise?: Promise<T>): ResultTuple<T, E> {
  const [[value, error, pending], setResult] = useState<StateTuple<T, E>>([
    undefined,
    undefined,
    0,
  ]);

  useEffect(() => {
    if (!promise) {
      setResult(([, , pending]) => [undefined, undefined, pending]);
      return;
    }

    setResult(([value, error, pending]) => [value, error, pending + 1]);

    promise.then(
      x => setResult(([, , pending]) => [x, undefined, pending - 1]),
      e => setResult(([, , pending]) => [undefined, e, pending - 1])
    );
  }, [promise]);

  return [value, error, pending > 0];
}

export default usePromise;
