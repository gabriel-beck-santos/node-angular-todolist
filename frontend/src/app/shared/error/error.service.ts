import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { ErrorComponent } from './error.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) {}

  showError(errorMessage: string): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      const injector = this.getInjector(errorMessage, this.overlayRef);
      this.overlayRef.attach(
        new ComponentPortal(ErrorComponent, null, injector)
      );
    });
  }

  getInjector(data: string, overlayRef: OverlayRef): Injector {
    const tokens = new WeakMap();

    tokens.set(Error, new Error(data));
    tokens.set(OverlayRef, overlayRef);

    return Injector.create({
      providers: [
        { provide: Error, useValue: new Error(data) },
        { provide: OverlayRef, useValue: overlayRef },
      ],
    });
  }
}
