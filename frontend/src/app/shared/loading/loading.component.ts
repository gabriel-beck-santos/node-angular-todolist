import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
  constructor() {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
