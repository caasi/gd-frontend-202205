import { useState, useEffect, useRef } from "react";
import {StateTuple, ResultTuple} from './usePromise'

const CANCEL = Symbol('cancel')

const createCancelablePromise = <T>(inputPromise: Promise<T>) => {
  let cancel: Function;
  const controller: Promise<void | typeof CANCEL> = new Promise((_, rej) => {
    cancel = () => {
      rej(CANCEL);
    };
  });

  
  const promise: Promise<T> = Promise.race([
    inputPromise,
    controller,
  ]) as Promise<T>; 
  
  return {
    promise,
    cancel: cancel!, // TS do not know the callback of promise been executed, so use assertion
  };
};

type PromiseCreator<T> = (...props: any[]) => Promise<T>;

export default function useCancelablePromise<T>(
  promiseCreator: PromiseCreator<T>,
  ...props: any[]
): ResultTuple<T> {
  const controllerRef = useRef<Function | null>(null);
  const [[value, error, pending], setResult] = useState<StateTuple<T>>([
    undefined,
    undefined,
    0,
  ]);

  useEffect(() => {
    setResult(([value, error, pending]) => [value, error, pending + 1]);
    if (controllerRef.current) {
      controllerRef.current();
    }

    const { promise, cancel } = createCancelablePromise(
      promiseCreator(...props)
    );

    promise
      .then((result) => {
        setResult([result, undefined, 0]);
        controllerRef.current = null;
      })
      .catch((err) => {
        if (err !== CANCEL) {
          setResult([undefined, err, 0]);
        }
      })

    controllerRef.current = cancel;
  }, [...props]);

  
  return [value, error, pending > 0];
}
