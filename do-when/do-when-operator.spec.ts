import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { doWhen } from './do-when.operator';
import { DoWhenPredicate } from './do-when-predicate.type';

let counter = 0;

function getObs$(value: any, predicate: DoWhenPredicate): Observable<any> {
    return of(value).pipe(
        first(),
        doWhen(() => ++counter, predicate)
    );
}

describe('do-when operator',  () => {
    afterEach(() => counter = 0);

    it('should increment counter if given value passes given predicate',  () => {
        getObs$('abc', (value: string) => value.length === 3).subscribe();

        expect(counter).toEqual(1);
    });

    it('should not increment counter if given value does not pass given predicate',  () => {
        getObs$(20, (value: number) => value%2 === 1).subscribe();

        expect(counter).toEqual(0);
    });
});