import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore/lite";
import TotalBalances from "./TotalBalances";
import TransactionModifier from "./TransactionModifier";
import Label from "../../components/Label";
import TransactionList from "./TransactionList";

const TransactionContainer = (props) => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const addNewTransaction = async (model) => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "transactions"), model);
      alert("Document written with ID: " + docRef.id);
      loadData();
    } catch (e) {
      alert("Error adding document: " + e);
    }
  };

  const loadData = () => {
    const db = getFirestore();
    const ref = collection(db, "transactions");
    const q = query(ref, orderBy("inserted", "desc"));
    setLoading(true);
    getDocs(q).then((snapshot) => {
      const transactionsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const result = { ...data, ...{ id: doc.id } };
        return result;
      });
      setTransactionsList(transactionsList);
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="mt-4 mb-4">
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="notification is-primary  is-light p-4">
              <Label name="Add new transaction" />
              <TransactionModifier onSubmitForm={addNewTransaction} />
            </div>
          </div>
          <div className="column is-6">
            <div className="has-text-centered">
              <TotalBalances transactionsList={transactionsList} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <div className="notification is-info is-light p-4">
          <div className="mb-4">
            <Label name="Transaction List" />
          </div>
          <div>
            <TransactionList
              transactionsList={transactionsList}
              loading={loading}
              loadData={loadData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionContainer;
