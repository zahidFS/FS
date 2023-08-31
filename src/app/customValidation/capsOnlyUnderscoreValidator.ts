import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capsOnlyUnderscoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
  
      // Check for uppercase letters, underscores, and length
      if (!/^[A-Z_]+$/.test(value) || value.includes(' ') || value.includes('_') && value.charAt(0) === '_') {
        return { capsOnlyUnderscore: true };
      }
  
      // Check for duplicates
      const uniqueChars = new Set(value);
      if (uniqueChars.size !== value.length) {
        return { capsOnlyUnderscore: true };
      }
  
      return null;
    };
  }
  