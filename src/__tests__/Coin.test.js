import React from 'react';
import { shallow } from 'enzyme';
import Coin from '../components/Coin';

const app = shallow(<Coin />);

describe("Coin Component", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});