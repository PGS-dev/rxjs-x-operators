import { of, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { TogglableStatus } from '../shared/types/togglable-status';

/**
 * Toggles status in passed reference while executing subscription.
 * @param statusReference reference to external variable of type TogglableStatus that describes status of observable.
 */
export function toggleStatus<T>(statusReference: TogglableStatus): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => of(null)
    .pipe(
      tap(() => {
        statusReference.done = false;
        statusReference.busy = true;
      }),
      switchMap(() => source),
      finalize(() => {
        statusReference.done = true;
        statusReference.busy = false;
      })
    )
}