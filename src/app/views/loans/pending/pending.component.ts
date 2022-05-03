import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  formSent = false;
  willApprove = true;
  loanInMemory = {
    key: '',
    denied: false,
    active: false,
    completed: false,
    amount: 0,
    totalToPay: 0,
    expectedEarnings: 0,
    totalPaid: 0,
    firstname:  '',
    lastname: '',
    cedula:  0,
    phone:  0,
    address: '',
    durationMonths: 0,   
    monthlyInterestRate: 0,
    monthlyInterestAmount: 0,
    paymentFrequencyInDays: 0,
    cuota: 0,
    warranty: '',
    startDate: '',
    endDate: '',
    payments: []
  }
  pendingLoans: any = [];
  constructor(private _LoanService: LoanService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }
  retrieveAll(){
    this._LoanService.getAll().snapshotChanges().pipe(
      map(changes => changes.map( c =>
        ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe (data => {
      var toFilter = data;
      //only show the requests which arent active and arent denied
      var filtered = toFilter.filter(a => a.active == false && a.denied == false);
      //console.log(filtered);
      this.pendingLoans = filtered;
    });
  }
  preApprove(loan:any){
    this.willApprove = true;
    this.formSent = false;
    //select clicked-on loan to show it on the modal for confirmation
    this.loanInMemory = loan;
    //assign a start date in memory
    this.loanInMemory.startDate = new Date().toLocaleDateString();
    //set status as active
    this.loanInMemory.active = true;
    //console.log(this.loanInMemory);
  }
  approve(){
    this._LoanService.update(this.loanInMemory.key, this.loanInMemory);
    console.log(this.loanInMemory.key);
    this.formSent = true;
  }
  preDeny(loan:any){
   this.willApprove = false;
   this.formSent = false;
    //select clicked-on loan to show it on the modal for confirmation
    this.loanInMemory = loan;
    //assign a deny date in memory
    this.loanInMemory.startDate = new Date().toLocaleDateString();
    //set status as inactive
    this.loanInMemory.active = false;
    this.loanInMemory.denied = true;
    //console.log(this.loanInMemory);
  }
  deny(){
    this._LoanService.update(this.loanInMemory.key, this.loanInMemory);
    console.log(this.loanInMemory.key);
    this.formSent = true;
  }
}
