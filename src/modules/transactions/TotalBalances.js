import React, { useEffect, useState } from "react";

const TotalBalances = (props) => {
  const [transactionsList, setTransactionsList] = useState([]);
  useEffect(() => {
    setTransactionsList(props.transactionsList);
  }, [props.transactionsList]);

  const balances = transactionsList.reduce((initial, t) => {
    return initial + +t.amount;
  }, 0);

  var totalBalancesStyled = {
    balances: {
      fontSize: "3rem",
      borderRadius: "10px",
      padding: ".5rem",
      color: "#fff",
    },
  };

  return (
    <section class="hero">
      <div class="hero-body">
        <p class="title">{`Total Remaining Balances`}</p>
        <p class="subtitle">
          <span
            className={
              balances > 0 ? "has-background-success" : "has-background-danger"
            }
            style={totalBalancesStyled.balances}
          >
            {balances.toFixed(2)} THB
          </span>
        </p>
      </div>
    </section>
  );
};

export default TotalBalances;
