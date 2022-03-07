import React, { useEffect, useState } from "react";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import TransactionModifier from "./TransactionModifier";
import Label from "../../components/Label";

const Transaction = (props) => {
  const [transaction, setTransaction] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setTransaction(props.transaction);
  }, [props.transaction]);

  const editTransaction = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const updateTransaction = async (model) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "transactions", model.id);
      await updateDoc(docRef, model);
      setEditMode(false);
      alert("Document updated with ID: " + docRef.id);
      props.onUpdate();
    } catch (e) {
      alert("Error updating document: " + e);
    }
  };

  const deleteTransaction = async (e) => {
    try {
      e.preventDefault();
      const db = getFirestore();
      const docRef = doc(db, "transactions", transaction.id);
      await deleteDoc(docRef);
      alert("Document deleted with ID: " + docRef.id);
      props.onUpdate();
    } catch (e) {
      alert("Error deleting document: " + e);
    }
  };

  return (
    <div className="Transaction">
      {transaction && (
        <div className="">
          <div className="is-flex">
            <span className="pr-1">
              <button className="button is-small" onClick={editTransaction}>
                Mod
              </button>
              <button className="button is-small" onClick={deleteTransaction}>
                Del
              </button>
            </span>
            <span>
              <Label
                name={dayjs(transaction.inserted.toDate()).format("DD MMM YY")}
              />
              <span className="pr-1"></span>
              <Label name={transaction.note} />
            </span>
            <span className="ml-auto">
              <Label name={`${transaction.amount} THB`} />
            </span>
          </div>
        </div>
      )}
      {editMode && (
        <div className="notification p-4 is-info is-light">
          <TransactionModifier
            transaction={transaction}
            onSubmitForm={updateTransaction}
          />
        </div>
      )}
    </div>
  );
};

export default Transaction;
