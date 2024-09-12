import React from 'react';
import { shallow } from 'enzyme';
import BitcoinTracker from '../components/BitcoinTracker';

const app = shallow(<BitcoinTracker />)

describe("Bitcoin Tracker App", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});