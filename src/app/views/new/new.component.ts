import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  formSent = false;
  //instance the loan model
  Loan?: Loan[];
  //new loan in memory
  newLoan = {
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
    payments: [
      {
        amount: 0,
        date: ''
      }
    ]
  }
  title = "Nueva Solicitud";
  
  constructor(private _LoanService: LoanService) { }

  ngOnInit(): void {
  }
  calcularCuota(){
    //formula -> (amount + interestAmount) / (durationMonths * 30 / paymentFrequency)
    //calculate the whole amount the client will be paying
    var originalAmount = this.newLoan.amount;
    var interestRate = this.newLoan.monthlyInterestRate / 100;
    var interestAmount = originalAmount * interestRate * this.newLoan.durationMonths;
    // var totalToBePaid = originalAmount + interestAmount; 
    var totalToBePaid = Math.ceil(originalAmount + interestAmount); 
    this.newLoan.totalToPay = totalToBePaid;
    this.newLoan.expectedEarnings = totalToBePaid;
    //calculate the total amount of cuotas
    var durationInDays = this.newLoan.durationMonths * 30;
    var totalCuotas = durationInDays / this.newLoan.paymentFrequencyInDays;
    //divide the total loan amount between the amount of cuotas to know how much each cuota will be
    var singleCuota = totalToBePaid / totalCuotas;
    this.newLoan.cuota = Math.ceil(singleCuota);
  }
  log() {
    //this action resets the modal to its primary render
    this.formSent = false;
    //if the cuota hasn't been calculated, then do it now
    if(this.newLoan.cuota == 0) {
      this.calcularCuota();
    }
  }
  createLoanRecord() {
    //create the record on firebase
    this._LoanService.create(this.newLoan);
    //show success notification
    this.formSent = true;
    //clean form
    this.resetValues();
  }
  resetValues() {
    this.newLoan.active = false;
    this.newLoan.completed = false;
    this.newLoan.amount = 0;
    this.newLoan.totalToPay = 0;
    this.newLoan.expectedEarnings = 0;
    this.newLoan.totalPaid = 0;
    this.newLoan.firstname = '';
    this.newLoan.lastname = '';
    this.newLoan.cedula = 0;
    this.newLoan.phone = 0;
    this.newLoan.address = '';
    this.newLoan.durationMonths = 0;
    this.newLoan.monthlyInterestRate = 0;
    this.newLoan.monthlyInterestAmount = 0;
    this.newLoan.paymentFrequencyInDays = 0;
    this.newLoan.cuota = 0;
    this.newLoan.warranty = '';
    this.newLoan.payments = [];
  }
}
