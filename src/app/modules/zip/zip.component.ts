import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Component } from '@angular/core';
import { ScanComponent } from '@app/modules/scan/scan.component';
import type { TDishItem } from '@app/types';
import type { Observable } from 'rxjs';
import { filter } from 'rxjs';
import { BehaviorSubject, tap, zip } from 'rxjs';

@Component({
  selector: 'app-zip',
  imports: [ScanComponent, AsyncPipe],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.scss',
})
export class ZipComponent implements OnInit {
  userWithPermissions$: Observable<unknown> | undefined;
  dishes = signal<TDishItem[]>([
    { name: 'coffee', count$: new BehaviorSubject(0) },
    { name: 'soda', count$: new BehaviorSubject(0) },
    { name: 'mat-cha', count$: new BehaviorSubject(0) },
    { name: 'tea', count$: new BehaviorSubject(0) },
  ]);

  ngOnInit() {
    this.userWithPermissions$ = zip(
      ...this.dishes().map((i) => i.count$.pipe(filter((val) => !!val))),
    ).pipe(
      tap((data) => {
        console.log(data);
      }),
    );
  }
}
