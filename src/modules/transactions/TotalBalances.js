import React from "react";

const TotalBalances = (props) => {
  var totalBalancesStyled = {
    balances: {
      fontSize: "3rem",
      borderRadius: "10px",
      padding: ".5rem",
      color: "#fff",
    },
  };

  return (
    <section className="hero">
      <div className="hero-body">
        <p className="title">{`Total Remaining Balances`}</p>
        <p className="subtitle">
          <span
            className={
              props.totalBalances > 0
                ? "has-background-success"
                : "has-background-danger"
            }
            style={totalBalancesStyled.balances}
          >
            {props.totalBalances.toFixed(2)} THB
          </span>
        </p>
      </div>
    </section>
  );
};

export default TotalBalances;
