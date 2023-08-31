import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.trim().length < minLength) {
        return { minLength: true };
      }
      return null;
    };
  }
  