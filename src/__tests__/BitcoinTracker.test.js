import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';
import CoinList from '../components/CoinList';

jest.mock('../request');
import * as getCoins from '../getCoins';
const app = shallow(<BitcoinTracker />);

describe("Bitcoin Tracker app", () => {
  
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("shows coin list component", () => {
    expect(app.find(CoinList).length).toBe(1);
  });

  describe('#getPrice() using Promises', () => {
    it('should load price', () => {
      return getCoins.getPrice('btc')
      .then(data => {
          expect(data).toBeDefined()
          expect(data).toEqual("8598.21572928")
        })
    })
  })
  
});