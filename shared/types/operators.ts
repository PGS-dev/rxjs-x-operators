import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';

export type Operators = OperatorFunction<any, any> | OperatorFunction<any, any>[] | MonoTypeOperatorFunction<any> | MonoTypeOperatorFunction<any>[];