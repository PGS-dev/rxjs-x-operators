import { Observable } from 'rxjs';

import { castArray } from '../shared/utils/cast-array';
import { Operators } from '../shared/types/operators';

export function applyIf(condition: boolean, truthyOperators: Operators, falsyOperators: Operators) {
    // @ts-ignore
    return (source: Observable<any>) => source.pipe(...castArray(condition ? truthyOperators : falsyOperators))
}