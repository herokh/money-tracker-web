import React from "react";
import TotalBalances from "./TotalBalances";
import TransactionModifier from "./TransactionModifier";
import Label from "../../components/Label";
import TransactionList from "./TransactionList";
import useTransaction from "../../hooks/useTransaction";
import Button from "../../components/Button";
import TransactionContext from "../../contexts/TransactionContext";

const TransactionContainer = (props) => {
  const [
    transactionsView,
    totalBalances,
    loading,
    updateView,
    updateTotalBalances,
    addNewTransaction,
    updateTransaction,
    deleteTransaction,
  ] = useTransaction();

  const handleAddNewTransaction = async (model) => {
    try {
      const docRef = await addNewTransaction(model);
      await updateTotalBalances();
      updateView();
      alert("Document written with ID: " + docRef.id);
    } catch (e) {
      alert("Error adding document: " + e);
    }
  };

  const handleUpdateTotalBalances = async () => {
    try {
      const docRef = await updateTotalBalances();
      console.log(docRef);
    } catch (e) {
      alert("Error update total balances: " + e);
    }
  };

  return (
    <TransactionContext.Provider
      value={[
        updateTotalBalances,
        updateView,
        updateTransaction,
        deleteTransaction,
      ]}
    >
      <div>
        <Button
          name="Re-Calculate Total Balances"
          onClick={handleUpdateTotalBalances}
        />
        <div className="mt-4 mb-4">
          <div className="columns is-multiline">
            <div className="column is-6">
              <div className="notification is-primary  is-light p-4">
                <Label name="Add new transaction" />
                <TransactionModifier onSubmitForm={handleAddNewTransaction} />
              </div>
            </div>
            <div className="column is-6">
              <div className="has-text-centered">
                <TotalBalances totalBalances={totalBalances} />
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
                transactionsList={transactionsView}
                loading={loading}
                loadData={updateView}
              />
            </div>
          </div>
        </div>
      </div>
    </TransactionContext.Provider>
  );
};

export default TransactionContainer;
