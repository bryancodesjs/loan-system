import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.scss']
})
export class PaidComponent implements OnInit {
  paidLoans:any = [];
  constructor(private _LoanService: LoanService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  //retrieve all paid records
  retrieveAll(){
    this._LoanService.getAll().snapshotChanges().pipe(
      map(changes => changes.map( c =>
        ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe (data => {
      var toFilter = data;
      //only show the requests which arent active and arent denied
      var filtered = toFilter.filter(a => a.active == true && a.denied == false && a.completed == true);
      //console.log(filtered);
      this.paidLoans = filtered;
      //console.log(this.paidLoans);
    });
  }
}
