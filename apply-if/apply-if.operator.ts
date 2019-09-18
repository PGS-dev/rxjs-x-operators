import { Observable, MonoTypeOperatorFunction } from 'rxjs';

import { castArray } from '../shared/utils/cast-array';
import { Operators } from '../shared/types/operators';

/**
 * applies truthyOperators to the pipe if condition is met. Otherwise applies falsyOperators
 * @param condition condition that decides whether truthyOperators or falsyOperators will be applied to pipe
 * @param truthyOperators operator, or array of operators that will be applied to pipe if condition is truthy
 * @param falsyOperators operator, or array of operators that will be applied to pipe if condition is falsy
 */
export function applyIf<T>(condition: boolean, truthyOperators: Operators, falsyOperators: Operators): MonoTypeOperatorFunction<T> {
    // @ts-ignore
    return (source: Observable<T>): Observable<T> => source.pipe(...castArray(condition ? truthyOperators : falsyOperators))
}