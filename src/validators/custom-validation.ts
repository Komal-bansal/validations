import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {

  static emailValidator(): any {
    return (c: AbstractControl): ValidationErrors => {
      const regex = /\S+@\S+\.\S+/;
      if (regex.test(c.value)) {
        return null;
      } else {
        return {
          'valid': false
        };
      }
    };
  }


}
