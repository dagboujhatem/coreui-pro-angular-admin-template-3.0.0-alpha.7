import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.css']
})
export class CustomsComponent{
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
        nature:['', [Validators.required]],
        description: ['', []],
        code: ['', [Validators.required]],
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