import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Operators } from '../shared/types/operators';
import { castArray } from '../shared/utils/cast-array';

export function applyIfAsync<T>(observable: Observable<boolean>, truthyOperators: Operators = [], falsyOperators: Operators = []): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => observable.pipe(
        // @ts-ignore
        concatMap((condition: boolean): Observable<T> => source.pipe(...castArray(condition ? truthyOperators : falsyOperators)))
    );
}