import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent {

  constructor(private _LoanService: LoanService) { }
  deniedLoans:any = [];
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
      var filtered = toFilter.filter(a => a.active == false && a.denied == true && a.completed == false);
      //console.log(filtered);
      this.deniedLoans = filtered;
    });
  }
}
