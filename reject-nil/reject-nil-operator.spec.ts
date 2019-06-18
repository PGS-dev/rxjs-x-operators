import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { rejectNil } from './reject-nil.operator';

function getObs$(value: any): Observable<any> {
    return of(value).pipe(
        first(),
        rejectNil()
    );
}

describe('reject-nil operator', () => {
    let counter = 0;

    afterEach(() => counter = 0);

    it('should not emit if given value is null', () => {
        getObs$(null).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it('should not emit if given value is undefined', () => {
        getObs$(undefined).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it('should emit if given value is different than null or undefined', () => {
        getObs$(true).subscribe(() => ++counter);

        expect(counter).toEqual(1);
    });
});