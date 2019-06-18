import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Doesn't emit value if it's one of restricted
 */
export function rejectValues<T>(values: any[]): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        filter(value => values.indexOf(value) === -1)
    );
}
