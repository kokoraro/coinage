import React, { Component } from 'react';
import AddCoinListItem from './AddCoinListItem';
import { Coin } from '../redux/coins/types';

interface ControlPanelProps {
    selectCoins: Coin[];
    handleAddCoins: (coins: number[]) => void;
    addOpen: boolean;
    toggleAddOpen: () => void;
    handleCurrency: () => void;
    handleRefresh: () => void;
}

interface ControlPanelState {
    selectCoins: Coin[];
}

class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {
            selectCoins: [],
        };
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
    }

    componentDidMount() {
        const { selectCoins } = this.props;
        this.setState({ selectCoins });
    }

    componentWillReceiveProps(nextProps: ControlPanelProps) {
        const { selectCoins } = this.props;
        if (nextProps.selectCoins !== selectCoins) {
            this.setState({ selectCoins });
        }
    }

    handleAddCoinClick(id: number) {
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
                {addOpen && (
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
                )}
            </div>
        );
    }
}

export default ControlPanel;
