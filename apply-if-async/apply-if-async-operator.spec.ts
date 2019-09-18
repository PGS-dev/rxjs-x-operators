import { of, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { applyIfAsync } from './apply-if-async.operator';

function getObs$(value: boolean): Observable<string> {
    return of('input')
        .pipe(
            applyIfAsync<string>(
                of(value),
                mapTo('truthy'),
                mapTo('falsy')
            )
        )
}

describe('apply-if-async operator', () => {
  it('should map value to \'truthy\' if given observable returned true', () => {
    getObs$(true).subscribe((value: string) => {
        expect(value).toEqual('truthy');
      });
  });

  it('should map value to \'falsy\' if given observable returned false', () => {
    getObs$(false).subscribe((value: string) => {
        expect(value).toEqual('falsy');
      });
  });
});