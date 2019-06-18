import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { rejectFor } from './reject-for.operator';

function getObs$(value: any): Observable<any> {
    return of(value).pipe(
        first(),
        rejectFor('[0].access.isGranted', true)
    );
}

describe('reject-for operator', () => {
    let counter = 0;
    const users = [{
        access: {
            isGranted: false
        }
    }];

    afterEach(() => {
        counter = 0;
        users[0].access.isGranted = false;
    });

    it(`should not emit if value of given path of given value does not equal true`, () => {
        getObs$(users).subscribe(() => ++counter);

        expect(counter).toEqual(0);
    });

    it(`should emit if value of given path of given value equals true`, () => {
        users[0].access.isGranted = true;

        getObs$(users).subscribe(() => ++counter);

        expect(counter).toEqual(1);
    });
});