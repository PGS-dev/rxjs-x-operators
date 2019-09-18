import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { toggleStatus } from './toggle-status.operator';
import { TogglableStatus } from '../shared/types/togglable-status';

describe('toggle-status operator', () => {
  it('should toggle status values to busy=true and done=false while observable is pending', (done) => {

    const status: TogglableStatus = <TogglableStatus>{};

    const request = of('value').pipe(delay(200));

    request
      .pipe(
          toggleStatus(status),
      )
      .subscribe();

    setTimeout(() => {
      expect(status.busy).toEqual(true);
      expect(status.done).toEqual(false);
    }, 100);

    setTimeout(() => {
      expect(status.busy).toEqual(false);
      expect(status.done).toEqual(true);
      done();
    }, 250);
  });
});