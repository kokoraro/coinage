import React, { Component } from 'react';
import AddCoinListItem from './AddCoinListItem';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectCoins: null,
        };
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
    }

    componentDidMount() {
        const { selectCoins } = this.props;
        this.setState({ selectCoins });
    }

    componentWillReceiveProps(nextProps) {
        const { selectCoins } = this.props;
        if (nextProps.selectCoins !== selectCoins) {
            this.setState({ selectCoins });
        }
    }

    handleAddCoinClick(id) {
        const { selectCoins } = this.state;
        const newSelectCoins = selectCoins.map(c => (
            c.id === id ? { ...c, showing: !c.showing } : c
        ));
        this.setState({ selectCoins: newSelectCoins });
    }

    handleAddSubmit() {
        const { selectCoins } = this.state;
        const { handleAddCoins } = this.props;
        const newSelectCoins = selectCoins
            .filter(c => c.showing)
            .map(c => c.id);
        handleAddCoins(newSelectCoins);
    }

    render() {
        const {
            addOpen,
            toggleAddOpen,
            handleCurrency,
            handleRefresh,
        } = this.props;
        const { selectCoins } = this.state;
        const form = addOpen ? (
            <div>
                <h4>choose coins to add...</h4>
                <button
                    type="button"
                    onClick={this.handleAddSubmit}
                    className="add-coins-submit"
                >
                    Submit
                </button>
                <div className="add-coins">
                    {selectCoins.map(c => (
                        <AddCoinListItem
                            handleAddCoinClick={() => this.handleAddCoinClick(c.id)}
                            key={c.id}
                            data={c}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={this.handleAddSubmit}
                    className="add-coins-submit"
                >
                    Submit
                </button>
            </div>
        ) : null;

        return (
            <div>
                <div className="control-panel">
                    <button
                        type="button"
                        className="add-button"
                        onClick={toggleAddOpen}
                    >
                        Edit
                    </button>
                    <button type="button" onClick={handleCurrency}>Currency</button>
                    <button type="button" onClick={handleRefresh}>Refresh</button>
                </div>
                {form}
            </div>
        );
    }
}

export default ControlPanel;
