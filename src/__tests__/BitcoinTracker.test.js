import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';
import CoinList from '../components/CoinList';
import ControlPanel from '../components/ControlPanel';

jest.mock('../request');
import * as getCoins from '../getCoins';
const app = shallow(<BitcoinTracker />);

describe("Bitcoin Tracker app", () => {
  
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("shows CoinList component", () => {
    expect(app.find(CoinList).length).toBe(1);
  });
  
  it("shows ControlPanel component", () => {
    expect(app.find(ControlPanel).length).toBe(1);
  });

  describe('#getPrice() using Promises', () => {
    it('should load price', () => {
      return getCoins.getPrice('BTC')
        .then(data => {
          expect(data).toBeDefined()
          expect(data.GBP).toEqual(6249.91)
        })
    })
  })
  
});