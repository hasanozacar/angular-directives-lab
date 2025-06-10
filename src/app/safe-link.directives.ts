import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmationClick($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  private hostElemment = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  queryParam = input('myAppQueryParam');
  constructor() {
    console.log('SafeLinkDirective initialized');
  }
  onConfirmationClick(event: MouseEvent) {
    const wantToConfirm = confirm('Are you sure you want to leave the app?');

    if (!wantToConfirm) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log(this.hostElemment.nativeElement.href, 'href updated');
      // const address = this.hostElemment.nativeElement.href;
      const address = (event.target as HTMLAnchorElement).href;
      (
        event.target as HTMLAnchorElement
      ).href = `${address}?${this.queryParam()}`;
    }
  }
}
