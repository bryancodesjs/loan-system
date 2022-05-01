import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  formSent = false;
  activeLoans:any = [];
  loanInMemory = {
    key: '',
    denied: false,
    active: false,
    amount: 0,
    totalToPay: 0,
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
  }
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
      var filtered = toFilter.filter(a => a.active == true && a.denied == false);
      //console.log(filtered);
      this.activeLoans = filtered;
    });
  }
}
