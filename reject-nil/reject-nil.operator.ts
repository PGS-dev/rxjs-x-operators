import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Doesn't emit value if it's null or undefined
 */
export function rejectNil<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        filter(value => value !== null && value !== undefined)
    );
}