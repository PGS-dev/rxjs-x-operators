import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { DoWhenPredicate } from './do-when-predicate.type';


/**
 * Performs given task if value that is about to be emitted passes given predicate.
 * @param task function that will be performed if predicate meets its requirements
 * @param predicate condition that needs to be meet in order to perform given task
 */
export function doWhen<T>(task: Function, predicate: DoWhenPredicate): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => source.pipe(
        tap(value => {
            let condition: boolean;

            switch(predicate) {
                case 'truthy':
                    condition = !value;
                    break;
                case 'falsy':
                    condition = !!value;
                    break;
                default:
                    condition = predicate(value)
            }

            if(condition) {
                task(value);
            }
        })
    );
}