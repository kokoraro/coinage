import React from 'react';
import { shallow } from 'enzyme';
import CoinList from '../components/CoinList';
import Coin from '../components/Coin'

const minProps = [{ id: 1, name: "Bitcoin", price: 2000 }];
const app = shallow(<CoinList coinData={minProps} />);

describe("Coin list component", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("shows a coin component", () => {
    expect(app.find(Coin).length).toBe(1);
  });
});