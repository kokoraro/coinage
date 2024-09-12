import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';
import CoinList from '../components/CoinList';

jest.mock('../request');
import * as coins from '../coins';
const app = shallow(<BitcoinTracker />);



describe("Bitcoin Tracker app", () => {
  
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  // A simple example test
  describe('#getPrice() using Promises', () => {
    
    it('should load price', () => {
      return coins.getPrice('btc')
      .then(data => {
          expect(data).toBeDefined()
          expect(data).toEqual("8598.21572928")
        })
    })
  })

  it("shows coin list component", () => {
    expect(app.find(CoinList).length).toBe(1);
  });
});