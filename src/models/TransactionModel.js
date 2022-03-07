import { TransactionConst } from "../consts/TransactionConst";

export default class TransactionModel {
  id;
  transactionType;
  amount;
  note;
  inserted;
  insertedBy;

  constructor() {
    this.id = null;
    this.transactionType = TransactionConst.DEDUCT;
    this.amount = 0;
    this.note = "";
    this.inserted = new Date();
    this.insertedBy = null;
  }
}
