import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  title = "Prestamos";
  activeLoans = 0;

  constructor(private _LoanService: LoanService) { }
  showPending = true;
  showActive = false;
  showAll = false;
  showPaid = false;

  ngOnInit(): void {
    //if there are no new loan requests, then show the 'active' tab
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
