import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Doesn't emit value if it's falsy (null, 0, false, undefined)
 */
export function rejectFalsy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        filter(value => !!value)
    );
}
