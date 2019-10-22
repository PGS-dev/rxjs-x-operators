import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { switchMap } from 'rxjs/operators';

/**
 * Handle response and performs given callbacks if callbacks param exists and returns final callback function
 * @param finalCallback function that will be returned
 * @param callbacks optional array of functions that will be performed if response exists
 */
export function switchAndCall<T>(finalCallback: Function, callbacks?: Function[]): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(
    switchMap((response: T) => {
      if(callbacks) {
        callbacks.forEach((callback: Function) => callback(response));
      }

      return finalCallback(response) as Function;
    }),
  )
}
