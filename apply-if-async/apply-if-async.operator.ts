import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Operators } from '../shared/types/operators';
import { castArray } from '../shared/utils/cast-array';

/**
 * Applies truthyOperators to the pipe if observable returns true. Otherwise applies falsyOperators
 * @param condition observable that returns boolean value, depending on which, truthy or falsy operators will be applied to pipe.
 * @param truthyOperators operator, or array of operators that will be applied to pipe if observable returns true
 * @param falsyOperators operator, or array of operators that will be applied to pipe if observable returns false
 */
export function applyIfAsync<T>(observable: Observable<boolean>, truthyOperators: Operators = [], falsyOperators: Operators = []): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => observable.pipe(
        /**
         * To avoid adding unnecessary code, the ts-ignore was added.
         * Actually you CAN pass operators in array to .pipe() ;).
         * See the source file linked below.
         * This bug is already reported.
         * 
         * https://github.com/ReactiveX/rxjs/issues/3989#issuecomment-410585808
         * https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/pipe.ts
         */

        //@ts-ignore
        concatMap((condition: boolean): Observable<T> => source.pipe(...castArray(condition ? truthyOperators : falsyOperators))
    ));
}