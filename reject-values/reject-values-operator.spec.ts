import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { rejectValues } from './reject-values.operator';

function getObs$(value: any): Observable<any> {
    return of(value).pipe(
        first(),
        rejectValues([true, 5, 'rvo'])
    );
}

describe('reject-values operator', () => {
    let counter = 0;

    afterEach(() => counter = 0);

    it('should not emit if given value is true', () => {
        getObs$(true).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it('should not emit if given value is 5', () => {
        getObs$(5).subscribe(() => ++counter);

        expect(counter).toEqual(0);

        getObs$('5').subscribe(() => ++counter);

        expect(counter).toEqual(1);
    });

    it(`should not emit if given value is a string of 'rvo' value`, () => {
        getObs$('rvo').subscribe(() => ++counter);

        expect(counter).toEqual(0);

        getObs$('ovr').subscribe(() => ++counter);

        expect(counter).toEqual(1);
    });
});