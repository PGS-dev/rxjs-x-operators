import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Doesn't emit value if it's truthy (true, {}, [], !0)
 */
export function rejectTruthy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        filter(value => !value)
    );
}
