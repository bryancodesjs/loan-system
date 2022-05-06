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
  formConfirmed = false;
  activeLoans:any = [];
  validPayment = true;
  negativePayment = false;
  emptyPayment = false;
  showAlert = false;
  loanProgress = 0;
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
    payments: [{}],
  }
  paymentsInMemory: any[] = [];
  newPayment = {
    amount: 0,
    date: ''
  }
  amountOnForm:any = undefined;
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
      var filtered = toFilter.filter(a => a.active == true && a.denied == false && a.completed == false);
      //console.log(filtered);
      this.activeLoans = filtered;
    });
  }
  receiveFrom(loan:any) {
    this.validPayment = true;
    this.negativePayment = false;
    this.emptyPayment = false;
    this.amountOnForm = undefined;
    this.formConfirmed = false;
    this.formSent = false;
    this.loanInMemory = loan;
    this.paymentsInMemory = this.loanInMemory.payments;
    //console.log(this.loanInMemory);
  }
  viewHistory(loan:any){
    this.loanInMemory = loan;
    this.paymentsInMemory = this.loanInMemory.payments;
    //calculate progress
    var multiplier = 100 / this.loanInMemory.expectedEarnings;
    var percentage = multiplier * this.loanInMemory.totalPaid;
    this.loanProgress = Math.ceil(percentage);
  }
  confirmPayment(){
    this.newPayment.amount = this.amountOnForm;
    this.newPayment.date = new Date().toLocaleString();
    var paymentIsValid = this.validatePayment();
    var paymentIsNegative = this.validateNegative();
    var paymentIsEmpty = this.validateEmpty();
    if(paymentIsEmpty){
      this.emptyPayment = true;
    } else {
      if(paymentIsNegative){
        this.negativePayment = true;
      } else {
        if(paymentIsValid) {
          //add new single payment to loan record
          this.loanInMemory.payments.push(this.newPayment);
          this.loanInMemory.totalPaid += this.newPayment.amount;
          this.loanInMemory.totalToPay -= this.newPayment.amount;
          this._LoanService.update(this.loanInMemory.key, this.loanInMemory);
          this.formSent = true;
        } else {
          this.validPayment = false;
          console.log('error: payment amount is invalid');
        }
      }
    }
  }
  refreshScreen(){
    window.location.reload();
  }
  
  validatePayment(){
    if(this.newPayment.amount > this.loanInMemory.totalToPay) {
      return false;
    } else {
      return true;
    }
  }
  validateNegative(){
    if(this.newPayment.amount < 0){
      return true;
    } else {
      return false;
    }
  }
  validateEmpty(){
    if(this.newPayment.amount == undefined || this.newPayment.amount == null){
      return true;
    } else {
      return false;
    }
  }
  moveToCompleted(loan: any){
    this.loanInMemory = loan;
    this.loanInMemory.completed = true;
    this.loanInMemory.endDate = new Date().toLocaleString();
    this._LoanService.update(this.loanInMemory.key, this.loanInMemory);
    //trigger a notification
    this.showAlertSuccess();
  }

  showAlertSuccess(){
    this.showAlert = true;
    setTimeout( () => {
      this.showAlert = false;
    }, 3000);
  }
}
