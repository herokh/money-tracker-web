import React, { Component } from "react";
import { getFirestore, collection, getDocs, orderBy, query, addDoc } from "firebase/firestore/lite";
import Transaction from "./Transaction";
import TotalBalances from "./TotalBalances";
import TransactionModifier from "./TransactionModifier";

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsList: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async addNewTransaction(model) {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "transactions"), model);
      alert("Document written with ID: " + docRef.id);
      this.loadData();
    } catch (e) {
      alert("Error adding document: " + e);
    }
  }

  loadData() {
    const db = getFirestore();
    const ref = collection(db, "transactions");
    const q = query(ref, orderBy('inserted', 'desc'));
    getDocs(q).then((snapshot) => {
      const transactionsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const result = { ...data, ...{ id: doc.id } };
        return result;
      });
      this.setState({
        transactionsList: []
      });
      this.setState({
        transactionsList: transactionsList
      });
    });
  }

  render() {
    return (
      <div className="TransactionList">

        <div className="mb-2">
          <span className="is-size-6">Add new item</span>
        </div>
        <TransactionModifier onSubmitForm={(model) => this.addNewTransaction(model)} />

        <div className="mb-2 has-text-right">
            <TotalBalances transactionsList={this.state.transactionsList} />
        </div>
        
        <div className="columns is-multiline">
            {this.state.transactionsList.map((t) => (
                <div key={t.id} className={"column is-4"}>
                    <Transaction transaction={t} onUpdate={() => this.loadData()} />
                </div>
            ))}
        </div>
      </div>
    );
  }
}

export default TransactionList;
