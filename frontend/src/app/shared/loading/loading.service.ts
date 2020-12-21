import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) {}

  startLoading(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(LoadingComponent));
    });
  }

  stopLoading(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }
}
