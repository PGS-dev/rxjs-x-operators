import { Observable, MonoTypeOperatorFunction } from 'rxjs';

import { castArray } from '../shared/utils/cast-array';
import { Operators } from '../shared/types/operators';

/**
 * applies truthyOperators to the pipe if condition is met. Otherwise applies falsyOperators
 */
export function applyIf<T>(condition: boolean, truthyOperators: Operators, falsyOperators: Operators): MonoTypeOperatorFunction<T> {
    // @ts-ignore
    return (source: Observable<T>): Observable<T> => source.pipe(...castArray(condition ? truthyOperators : falsyOperators))
}