import React from 'react';
import { shallow } from 'enzyme';
import Coin from '../components/Coin';

const minProps = { 
  coinData: { id: 0, name: "Test", price: {USD: 1, GBP: 1} },
  currDollar: true
};

describe("Coin Component", () => {
  it("renders correctly", () => {
    const coin = shallow(<Coin { ...minProps } />);
    expect(coin).toMatchSnapshot();
  });

  it("has an li element", () => {
    const coin = shallow(<Coin {...minProps} />);
    expect(coin.find('li').length).toBe(1);
  });
  
  it("renders name from props", () => {
    const coin = shallow(<Coin { ...minProps } />);
    expect(coin.find('.coin-name').text()).toBe('Test');
    
    coin.setProps({ coinData: { id: 0, name: "Test Change", price: { USD: 1 } } })
    expect(coin.find('.coin-name').text()).toBe("Test Change");
  });

  it("renders price from props", () => {
    const coin = shallow(<Coin { ...minProps } />);
    expect(coin.find('.coin-price').text()).toBe("$1.00");
    
    coin.setProps({ ...minProps, coinData:{price:{USD:2}} })
    expect(coin.find('.coin-price').text()).toBe("$2.00");
  });

  it("renders currency from props", () => {
    const coin = shallow(<Coin { ...minProps } />);
    expect(coin.find('.coin-price').text()).toBe("$1.00");
    
    coin.setProps({ 
      currDollar: false })
    expect(coin.find('.coin-price').text()).toBe("£1.00");
  });
  
});