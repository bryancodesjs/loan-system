import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  title = "Prestamos";
  constructor() { }
  showPending = true;
  showActive = false;
  showAll = false;
  showPaid = false;

  ngOnInit(): void {
  }

  resetTabs(){
    this.showPending = false;
    this.showActive = false;
    this.showAll = false;
    this.showPaid = false;
  }

  switchTab(str:any) {
    switch(str){
      case 'pending':
        this.resetTabs();
        this.showPending = true;
        break;
      case 'active':
        this.resetTabs();
        this.showActive = true;
        break;
      case 'paid':
        this.resetTabs();
        this.showPaid = true;
        break;
      case 'all':
        this.resetTabs();
        this.showAll = true;
        break;
      default:
        this.resetTabs();
        this.showActive = true;
        break;
    }
  }
}
