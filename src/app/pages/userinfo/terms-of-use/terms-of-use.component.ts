import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {
  pdfSource = "/assets/data/terms-of-use.pdf"; 
  constructor() { }

  ngOnInit(): void {
  }

}
