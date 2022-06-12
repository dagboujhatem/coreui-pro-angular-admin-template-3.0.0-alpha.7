import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  simpleForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private translate:TranslateService) {
    this.createForm();
    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      translate.use(lang);
    }
    else{
      translate.use(languages[0]);
    }
   }
  createForm() {
    this.simpleForm = this.fb.group(
      {
        oldpassword: [
          '',
          [
            Validators.required
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: confirmPasswordValidator }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.simpleForm.status === 'VALID';
  }

  onSubmit() {
    console.warn(this.onValidate(), this.simpleForm.value);

    if (this.onValidate()) {
      // TODO: Use EventEmitter with form value
      console.warn(this.simpleForm.value);
      alert('SUCCESS!');
    }
  }
}
