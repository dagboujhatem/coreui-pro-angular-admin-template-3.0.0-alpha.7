import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';
@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  simpleForm: FormGroup;
  submitted = false;

  collapses = [];
  accordion = [];
  custom = [];
  loremText =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.';

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

  ngOnInit(): void {
    this.collapses.length = 8;
    this.collapses = this.collapses.fill(true);
    this.accordion.length = 4;
    this.accordion = this.accordion.fill(false);
    this.accordion[0] = true;
    this.custom.length = 3;
    this.custom = this.custom.fill(false);
    this.custom[0] = true;
  }
  createForm() {
    this.simpleForm = this.fb.group(
      {
        organizationCarrier: ['', []],
        street1Carrier: ['', [Validators.required]],
        street2Carrier: ['', [Validators.required]],
        zipCarrier: ['', [Validators.required]],
        cityCarrier: ['', [Validators.required]],
        countryCarrier: ['', [Validators.required]],
        organizationRecipient: ['', []],
        street1Recipient: ['', [Validators.required]],
        street2Recipient: ['', [Validators.required]],
        zipRecipient: ['', [Validators.required]],
        cityRecipient: ['', [Validators.required]],
        countryRecipient: ['', [Validators.required]],
        organizationShipper: ['', []],
        street1Shipper: ['', [Validators.required]],
        street2Shipper: ['', [Validators.required]],
        zipShipper: ['', [Validators.required]],
        cityShipper: ['', [Validators.required]],
        countryShipper: ['', [Validators.required]],
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



  toggleCollapse(id) {
    this.collapses[id] = !this.collapses[id];
  }

  toggleAccordion(id) {
    this.accordion.forEach((item, idx) => {
      this.accordion[idx] = id === idx ? !item : false;
    });
  }
  toggleCustom(id) {
    this.custom[id] = !this.custom[id];
  }
}
