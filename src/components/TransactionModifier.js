import React, { Component } from "react";
import InputNumber from "rc-input-number";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAuth } from "firebase/auth";

class TransactionModifier extends Component {
  DEDUCT = "DEDUCT";
  TRANSFER = "TRANSFER";

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      transactionType: this.DEDUCT,
      amount: 0,
      note: "",
      inserted: new Date(),
      insertedBy: null,
    };
  }

  componentDidMount() {
    if (this.props.transaction) {
      let t = {...this.props.transaction};
      let amount = t.amount.toString();
      t.transactionType = amount.indexOf('-') !== -1 ? this.DEDUCT : this.TRANSFER;
      t.amount = amount.replace("-", "");
      t.inserted = t.inserted.toDate();
      this.setState({...this.state,...t});
    }
  }

  setTransactionType(transactionType) {
    this.setState({ ...this.state, ...{ transactionType: transactionType } });
  }

  setAmount(amount) {
    this.setState({ ...this.state, ...{ amount: amount } });
  }

  setNote(note) {
    this.setState({ ...this.state, ...{ note: note } });
  }

  setStartDate(date) {
    this.setState({ ...this.state, ...{ inserted: date } });
  }

  submitTransaction(e) {
    e.preventDefault();
    const auth = getAuth();
    const model = {
      id: this.state.id,
      amount:
        this.state.transactionType === this.DEDUCT
          ? -this.state.amount
          : this.state.amount,
      note: this.state.note,
      inserted: this.state.inserted,
      insertedBy: auth.currentUser.uid,
    }
    this.props.onSubmitForm(model);
    this.setState({...this.state, ...{ amount: 0, note: "" }});
  }

  render() {
    return (
      <div className="TransactionModifier">
        <form onSubmit={(e) => this.submitTransaction(e)}>
          <div>
            <select
              name="transactionType"
              value={this.state.transactionType}
              onChange={(e) => this.setTransactionType(e.target.value)}
            >
              <option value={this.DEDUCT}>DEDUCT</option>
              <option value={this.TRANSFER}>TRANSFER</option>
            </select>
          </div>
          <div>
            <InputNumber
              name="amount"
              defaultValue={this.state.amount}
              value={this.state.amount}
              onChange={(value) => this.setAmount(value)}
            />
          </div>
          <div>
            <input
              name="note"
              type={"text"}
              value={this.state.note}
              onChange={(e) => this.setNote(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <DatePicker
              name="inserted"
              selected={this.state.inserted}
              onChange={(date) => this.setStartDate(date)}
            />
          </div>
          <div>
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TransactionModifier;
