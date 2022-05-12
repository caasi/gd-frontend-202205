import { useState, useEffect } from 'react';

type StateTuple<T> = [T | undefined, Error | undefined, number];

type ResultTuple<T> = [T | undefined, Error | undefined, boolean];

function usePromise<T>(promise?: Promise<T>): ResultTuple<T> {
  const [[value, error, pending], setResult] = useState<StateTuple<T>>([
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
