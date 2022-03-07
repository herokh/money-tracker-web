import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import TransactionModifier from "./TransactionModifier";
import Label from "../../components/Label";
import TransactionContext from "../../contexts/TransactionContext";

const Transaction = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [
    updateTotalBalances,
    updateView,
    updateTransaction,
    deleteTransaction,
  ] = useContext(TransactionContext);

  const editTransaction = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const handleUpdateTransaction = async (model) => {
    try {
      const docRef = await updateTransaction(model);
      await updateTotalBalances();
      updateView();
      console.log(docRef);
      props.onUpdate();
    } catch (e) {
      alert("Error updating document: " + e);
    }
    setEditMode(false);
  };

  const handleDeleteTransaction = async (e) => {
    try {
      e.preventDefault();
      const docRef = await deleteTransaction(props.transaction.id);
      await updateTotalBalances();
      updateView();
      console.log(docRef);
      props.onUpdate();
    } catch (e) {
      alert("Error deleting document: " + e);
    }
  };

  return (
    <div className="Transaction">
      {props.transaction && (
        <div className="">
          <div className="is-flex">
            <span className="pr-1">
              <button className="button is-small" onClick={editTransaction}>
                Mod
              </button>
              <button
                className="button is-small"
                onClick={handleDeleteTransaction}
              >
                Del
              </button>
            </span>
            <span>
              <Label
                name={dayjs(props.transaction.inserted.toDate()).format(
                  "DD MMM YY"
                )}
              />
              <span className="pr-1"></span>
              <Label name={props.transaction.note} />
            </span>
            <span className="ml-auto">
              <Label name={`${props.transaction.amount} THB`} />
            </span>
          </div>
        </div>
      )}
      {editMode && (
        <div className="notification p-4 is-info is-light">
          <TransactionModifier
            transaction={props.transaction}
            onSubmitForm={handleUpdateTransaction}
          />
        </div>
      )}
    </div>
  );
};

export default Transaction;
