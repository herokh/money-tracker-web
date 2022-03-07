export default class TransactionModel {
  id;
  transactionType;
  amount;
  note;
  inserted;
  insertedBy;

  constructor() {
    this.id = null;
    this.transactionType = this.DEDUCT;
    this.amount = 0;
    this.note = "";
    this.inserted = new Date();
    this.insertedBy = null;
  }
}
