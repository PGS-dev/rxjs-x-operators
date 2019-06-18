import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { rejectTruthy } from './reject-truthy.operator';

function getObs$(value: any): Observable<any> {
    return of(value).pipe(
        first(),
        rejectTruthy()
    );
}

describe('reject-truthy operator', () => {
    let counter = 0;

    afterEach(() => counter = 0);

    it('should not emit if given value is truthy', () => {
        getObs$(true).subscribe(() => ++counter);

        expect(counter).toEqual(0);

        getObs$([]).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it('should emit if given value is falsy', () => {
        getObs$(false).subscribe(() => ++counter);

        expect(counter).toEqual(1);

        getObs$(0).subscribe(() => ++counter);

        expect(counter).toEqual(2);
    });
});