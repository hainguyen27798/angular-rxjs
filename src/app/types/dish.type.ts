import type { BehaviorSubject } from 'rxjs';

export type TDishItem = {
  name: string;
  count$: BehaviorSubject<number>;
};
