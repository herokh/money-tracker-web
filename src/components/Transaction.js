import React, { Component } from "react";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import TransactionModifier from "./TransactionModifier";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: null,
      editMode: false
    };
  }

  componentDidMount() {
    this.setState({
      transaction: this.props.transaction,
    });
  }

  editTransaction(e) {
    e.preventDefault();
    this.setState({...this.state, ...{editMode: !this.state.editMode}});
  }

  async updateTransaction(model) {
    try {
      const db = getFirestore();
      const docRef = doc(db, "transactions", model.id);
      await updateDoc(docRef, model);
      this.setState({...this.state, ...{editMode: false}});
      alert("Document updated with ID: " + docRef.id);
      this.props.onUpdate();
    } catch (e) {
      alert("Error updating document: " + e);
    }
  }

  async deleteTransaction(e) {
    try {
      e.preventDefault();
      const db = getFirestore();
      const docRef = doc(db, "transactions", this.state.transaction.id);
      await deleteDoc(docRef);
      alert("Document deleted with ID: " + docRef.id);
      this.props.onUpdate();
    } catch (e) {
      alert("Error deleting document: " + e);
    }
  }

  render() {
    return (
      <div className="Transaction">
        {this.state.transaction ? (
            <div className="card">
            <header className="card-header">
              <p className="card-header-title">
              {this.state.transaction.note}
              </p>
              <button className="card-header-icon" aria-label="more options">
                <span className="icon">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
            <div className="card-content">
              <div className="content">
                {this.state.transaction.amount} THB
                <br/>
                <time >{dayjs(this.state.transaction.inserted.toDate()).format('DD MMMM YYYY HH:mm')}</time>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item" onClick={e => this.editTransaction(e)}>Edit</a>
              <a href="#" className="card-footer-item" onClick={e => this.deleteTransaction(e)}>Delete</a>
            </footer>

            {(this.state.editMode) ? (
              <TransactionModifier transaction={this.state.transaction} onSubmitForm={model => this.updateTransaction(model)} />
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default Transaction;
