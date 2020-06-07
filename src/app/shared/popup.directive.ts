import { Directive, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[bgPopup]'
})
export class PopupDirective {
  @HostBinding('class.active') isActive = false;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  @HostListener('document:click', ['$event']) toggleOpen($event) {
    this.isActive = this.elementRef.nativeElement.contains($event.target) ? !this.isActive : false;
  }

}
