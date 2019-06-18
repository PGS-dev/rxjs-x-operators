import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Doesn't emit value if value of given path equals restricted.
 * @param path keys split by dots
 * @example 'a.b.c' for {a: {b: {c: 5}}} returns 5, as well as '[0].a.b.c' for [{a: {b: {c: 5}}}]
 * @param forValue restricted value
 */
export function rejectFor<T>(path: string, forValue: any): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        filter(value => path
            .replace(/\[(\w+)\]/g, '$1')
            .split('.')
            .reduce((accumulator, key) => accumulator[key], value) === forValue
        )
    );
}
