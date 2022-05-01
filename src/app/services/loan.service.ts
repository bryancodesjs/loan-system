import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  //Firebase route where info is stored
  private dbPath = '/loans';
  ratesRef: AngularFireList<Loan>;

  constructor(private db: AngularFireDatabase) { 
    this.ratesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Loan> {
    return this.ratesRef;
  }
  create(Loan: Loan): any {
    return this.ratesRef.push(Loan);
  }
  update(key: string, value: any): Promise<void> {
    return this.ratesRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.ratesRef.remove(key);
  }
}
