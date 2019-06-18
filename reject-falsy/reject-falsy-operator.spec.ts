import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { rejectFalsy } from './reject-falsy.operator';

function getObs$(value: any): Observable<any> {
    return of(value).pipe(
        first(),
        rejectFalsy()
    );
}

describe('reject-falsy operator', () => {
    let counter = 0;

    afterEach(() => counter = 0);

    it('should not emit if given value is falsy', () => {
        getObs$(false).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it('should emit if given value is truthy', () => {
        getObs$(true).subscribe(() => ++counter);

        expect(counter).toEqual(1);
    });
});