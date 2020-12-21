import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(readonly data: Error, readonly overlayRef: OverlayRef) {}

  ngOnInit(): void {}

  close(): void {
    this.overlayRef.detach();
  }
}
