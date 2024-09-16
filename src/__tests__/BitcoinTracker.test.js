import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';
import CoinList from '../components/CoinList';
import ControlPanel from '../components/ControlPanel';

jest.mock('../request');
import { getPrice } from '../getCoins';
jest.mock('../requestData');
import { getData } from '../getCoinData';

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

  describe('get price using promises', () => {
    it('should load price', () => {
      expect.assertions(1)

      return Promise.resolve(getPrice('BTC'))
        .then(data => expect(data.GBP).toEqual(6249.91))
    });
  });

  describe("get coin data using promises", () => {
    it("fetches coin id", () => {
      expect.assertions(1)

      return Promise.resolve(getData(['BTC']))
        .then(data => expect(data[0].Id).toEqual("1182"))
    });
  });
  
});