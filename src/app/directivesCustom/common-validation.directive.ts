import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCommonValidation]'
})
export class CommonValidationDirective {

  constructor(private el:ElementRef) { 
    this.el.nativeElement.style.backgroundColor='red';
    console.log('hello')
  }

}
