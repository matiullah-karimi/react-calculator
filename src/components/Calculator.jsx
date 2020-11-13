import React, { Component } from 'react';
import './calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: [
                { id: 'dot', value: '.', className: 'button' },
                { id: 'zero', value: 0, className: 'button zero-button' },
                { id: 'one', value: 1, className: 'button' },
                { id: 'two', value: 2, className: 'button' },
                { id: 'three', value: 3, className: 'button' },
                { id: 'four', value: 4, className: 'button' },
                { id: 'five', value: 5, className: 'button' },
                { id: 'six', value: 6, className: 'button' },
                { id: 'seve', value: 7, className: 'button' },
                { id: 'eight', value: 8, className: 'button' },
                { id: 'nine', value: 9, className: 'button' }
            ],
            operands: [
                { id: 'multiply', value: 'X', className: "button" },
                { id: 'subtract', value: '-', className: "button" },
                { id: 'add', value: '+', className: "button" },
                { id: 'equals', value: '=', className: "button equals-button" },
            ],
            lastValue: '0',
            operations: [],
            operationsText: ''
        }
    }

    render() {
        return (<div className="container">
            <div className="flex text-align-right flex-column header">
                <span className="expression">{this.state.operationsText}</span>
                <span className="result"> {this.state.lastValue} </span>
            </div>

            <div className="flex mt-10">
                <div>
                    <div className="flex">
                        <button className="button ac-button" onClick={this.clear}>AC</button>
                        <button className="button" id="divide" onClick={() => this.calculate('/')}>/</button>
                    </div>
                    <div className="flex">
                        <div className="nums-container">
                            {this.state.numbers.reverse().map(n => (
                                <button key={n.id} className={n.className} onClick={() => this.calculate(n.value)}>
                                    {n.value}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="operands">
                    {
                        this.state.operands.map(o => (<button key={o.id} className={o.className} onClick={() => this.calculate(o.value)}>
                            {o.value}
                        </button>))
                    }
                </div>
            </div>
        </div>);
    }

    clear = () => {
        this.setState({ operations: [], operationsText: '0', lastValue: '0' });
    }

    calculate = (value) => {
        try {
            let lastValue = value;
            let operations = [...this.state.operations];

            // First values must be numbers
            if (this.state.operations.length == 0 && this.getOperands().includes(value)) {
                return;
            }

            // First value must not be decimal point
            if (this.state.operations.length == 0 && value == '.') {
                return;
            }

            // Decimal point only once
            if (this.state.operations.includes('.') && value == '.') {
                return;
            }

            if (this.getOperands().includes(value)) {
                if (this.getOperands().includes(this.state.operations[this.state.operations.length - 1])) return;

                if (value == '=') {
                    lastValue = eval(this.state.operationsText.replace('X', '*'), this.state.operationsText);

                    operations = [lastValue];
                } else {
                    operations.push(value)
                }
            } else {
                operations.push(value)
            }

            let operationsText = operations.join('');

            this.setState({
                operations,
                operationsText,
                lastValue
            });
        } catch (error) {
            this.setState({
                operations: [],
                operationsText: '0',
                lastValue: '0'
            });
        }
    }

    getOperands() {
        return [...this.state.operands.map(o => o.value), '/']
    }
}

export default Calculator;