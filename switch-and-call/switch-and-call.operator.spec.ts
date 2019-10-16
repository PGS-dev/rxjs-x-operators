import { Observable, of } from 'rxjs';
import { switchAndCall } from './switch-and-call.operator';

function getObs$(finalCallback: Function, callbacks?: Function[]): Observable<any> {
  return of().pipe(
    switchAndCall(finalCallback)
  );
}

describe('switch-and-call operator', () => {
  let finalCallback;
  let callback;

  afterEach(() => {
    finalCallback = () => of('');
    callback = () => ({});
  });

  it('should be truthy', () => {
    expect(getObs$(finalCallback)).toBeTruthy();
  });

  it('should not call callback', () => {
    getObs$(finalCallback).subscribe(() => {
      expect(callback).not.toHaveBeenCalled();
    })
  });

  it('should call callback', () => {
    getObs$(finalCallback, [callback]).subscribe(() => {
      expect(callback).toHaveBeenCalled();
    })
  });

  it('should call final callback', () => {
    getObs$(finalCallback).subscribe(() => {
      expect(finalCallback).toHaveBeenCalled();
    })
  });
});
