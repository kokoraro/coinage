import React from 'react';
import { shallow } from 'enzyme';
import Coin from '../components/Coin';

const minProps = { id: 0, name: "Test", price: 1 };

describe("Coin Component", () => {
  it("renders correctly", () => {
    const coin = shallow(<Coin coinData={minProps} />);
    expect(coin).toMatchSnapshot();
  });

  it("has an li element", () => {
    const coin = shallow(<Coin coinData={minProps} />);
    expect(coin.find('li').length).toBe(1);
  });
  
  it("renders name from props", () => {
    const coin = shallow(<Coin coinData={minProps} />);
    expect(coin.find('.coin-name').text()).toBe('Test');
    
    coin.setProps({ coinData: { id: 0, name: "Test Change", price: 1 } })
    expect(coin.find('.coin-name').text()).toBe("Test Change");
  });

  it("renders price from props", () => {
    const coin = shallow(<Coin coinData={minProps} />);
    expect(coin.find('.coin-price').text()).toBe("$1.00");
    
    coin.setProps({ coinData: { id: 0, name: "Test Change", price: 2 } })
    expect(coin.find('.coin-price').text()).toBe("$2.00");
  });
  
});