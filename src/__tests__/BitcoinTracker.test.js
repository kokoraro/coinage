import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';
import CoinList from '../components/CoinList';

const app = shallow(<BitcoinTracker />)

describe("Bitcoin Tracker app", () => {
  const getCoins = () => {};
  
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("shows coin list component", () => {
    expect(app.find(CoinList).length).toBe(1);
  });
});