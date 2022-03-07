import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import TransactionModel from "../../models/TransactionModel";
import { TransactionConst } from "../../consts/TransactionConst";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import DatePickerWrapper from "../../components/DatePickerWrapper";
import Label from "../../components/Label";

const TransactionModifier = (props) => {
  const [transactionModel, setTransactionModel] = useState(
    new TransactionModel()
  );
  useEffect(() => {
    const updateTransactionFromProps = () => {
      if (props.transaction) {
        let existingTransaction = { ...props.transaction };
        let amountValue = existingTransaction.amount.toString();
        existingTransaction.transactionType =
          amountValue.indexOf("-") !== -1
            ? TransactionConst.DEDUCT
            : TransactionConst.TRANSFER;
        existingTransaction.amount = amountValue.replace("-", "");
        existingTransaction.inserted = existingTransaction.inserted.toDate();
        setTransactionModel(existingTransaction);
      }
    };

    updateTransactionFromProps();
  }, [props.transaction]);

  const updateTransactionModel = () => {
    setTransactionModel({ ...transactionModel });
  };

  const submitTransaction = (e) => {
    e.preventDefault();
    const auth = getAuth();
    transactionModel.insertedBy = auth.currentUser.uid;
    transactionModel.amount =
      transactionModel.transactionType === TransactionConst.DEDUCT
        ? -+transactionModel.amount
        : +transactionModel.amount;
    delete transactionModel.transactionType;
    props.onSubmitForm(transactionModel);
    setTransactionModel(new TransactionModel());
  };

  return (
    <div className="TransactionModifier">
      <form onSubmit={submitTransaction}>
        <div>
          <Label name="Type" />
          <Select
            value={transactionModel.transactionType}
            onChange={(e) => {
              transactionModel.transactionType = e.target.value;
              updateTransactionModel();
            }}
          >
            <option value={TransactionConst.DEDUCT}>DEDUCT</option>
            <option value={TransactionConst.TRANSFER}>TRANSFER</option>
          </Select>
        </div>
        <div>
          <Label name="Amount" />
          <Input
            type={"number"}
            value={transactionModel.amount}
            onChange={(e) => {
              transactionModel.amount = e.target.value;
              updateTransactionModel();
            }}
          />
        </div>
        <div>
          <Label name="Note" />
          <Input
            type={"text"}
            value={transactionModel.note}
            onChange={(e) => {
              transactionModel.note = e.target.value;
              updateTransactionModel();
            }}
          />
        </div>
        <div>
          <Label name="Date" />
          <DatePickerWrapper
            selected={transactionModel.inserted}
            onChange={(date) => {
              transactionModel.inserted = date;
              updateTransactionModel();
            }}
          />
        </div>
        <div>
          <div className="mt-2">
            <Button name="Submit" className="is-success" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionModifier;
