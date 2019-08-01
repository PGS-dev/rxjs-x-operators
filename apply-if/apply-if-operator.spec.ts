import { Observable, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { applyIf } from './apply-if.operator';

function getObs$(value: boolean): Observable<string> {
    return of('input')
        .pipe(
            applyIf(
                value,
                mapTo('truthy'),
                mapTo('falsy')
            )
        )
}

describe('apply-if operator',  () => {
    it('should map value to \'truthy\' if condition is met',  () => {
        getObs$(true).subscribe((value: string) => {
            expect(value).toEqual('truthy');
        });
    });

    it('should map value to \'falsy\' if condition is not met',  () => {
        getObs$(false).subscribe((value: string) => {
            expect(value).toEqual('falsy');
        });
    });
});