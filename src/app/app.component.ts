import { Component } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loan-system';
  constructor(public print: NgxPrintElementService) {}
}
