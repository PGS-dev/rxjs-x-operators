import { Observable, of } from 'rxjs';
import { switchAndCall } from './switch-and-call.operator';

function getObs$(finalCallback: Function): Observable<any> {
  return of().pipe(
    switchAndCall(finalCallback)
  );
}

describe('switch-and-call operator', () => {
  it('should be truthy', () => {
    const finalCallback = () => of('');

    expect(getObs$(finalCallback)).toBeTruthy();
  });
});
