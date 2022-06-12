import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        organization: ['', []],
        phone: ['', []],
        email: ['', [Validators.required, Validators.email]],
        regnum: ['', [Validators.required]],
        tax: ['', [Validators.required]],
        street1: ['', [Validators.required]],
        street2: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }
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
