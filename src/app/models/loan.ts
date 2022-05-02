export class Loan {
    key?: string | null;
    denied?: boolean;
    active?:boolean;
    completed?:boolean;
    amount?:number;
    totalToPay?:number;
    totalPaid?:number;
    expectedEarnings?:number;
    firstname?: string;
    lastname?:string;
    cedula?: number;
    phone?: number;
    address?:string;
    durationMonths?: number;    
    monthlyInterestRate?:number;
    monthlyInterestAmount?:number;
    paymentFrequencyInDays?:number;
    cuota?:number;
    warranty?:string;
    startDate?:string;
    payments?:any;
}