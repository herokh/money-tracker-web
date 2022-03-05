import React, { Component } from "react";

class TotalBalances extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionsList: []
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.transactionsList !== this.props.transactionsList) {
            this.setState({
                transactionsList: this.props.transactionsList,
            });
        }
    }

    render() {
        return (
                <span>Total Amount : {this.state.transactionsList.reduce((initial, t) => {
                    return initial + t.amount;
                }, 0)}</span>
        )
    }

}

export default TotalBalances;