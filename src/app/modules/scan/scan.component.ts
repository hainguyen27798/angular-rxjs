import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import type { ElementRef, OnInit } from '@angular/core';
import { Component, input, viewChild } from '@angular/core';
import type { TDishItem } from '@app/types';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { startWith } from 'rxjs';
import { fromEvent, scan } from 'rxjs';

@Component({
  selector: 'app-scan',
  imports: [NgOptimizedImage, AsyncPipe],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent implements OnInit {
  readonly btn = viewChild.required<ElementRef>('increaseBtn');
  dish = input.required<TDishItem>();
  count$: Observable<number> | undefined;

  ngOnInit() {
    this.count$ = fromEvent<number>(this.btn().nativeElement, 'click').pipe(
      startWith(0),
      scan((acc) => acc + 1),
      tap((value) => this.dish().count$.next(value)),
    );
  }
}
