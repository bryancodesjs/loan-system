import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = "Panel Administrativo";
  activeLoans = 0;
  totalToCollect = 0;
  expectedEarnings = 0;

  loans:any = [];
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
      this.loans = filtered;
      //console.log(filtered);
      this.assignValues();
    });
  }
  assignValues(){
    this.activeLoans = this.loans.length;
      for(let i = 0; i < this.activeLoans ; i++){
        var pending = this.loans[i].totalToPay;
        var earnings = this.loans[i].expectedEarnings;
        if(this.loans[i].totalToPay != undefined){
          this.totalToCollect += pending;
          this.expectedEarnings += earnings;
        }
      }
  }
}
