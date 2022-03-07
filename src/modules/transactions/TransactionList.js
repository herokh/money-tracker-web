import React from "react";
import Transaction from "./Transaction";

const TransactionList = (props) => {
  return (
    <div className="TransactionList">
      {props.loading && <div>Loading...</div>}
      {!props.loading && (
        <div>
          <div className="columns is-multiline">
            {props.transactionsList.map((t) => (
              <div key={t.id} className={"column is-12 pt-1 pb-1"}>
                <Transaction transaction={t} onUpdate={props.loadData} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
