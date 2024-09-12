import React from 'react';
import { shallow } from 'enzyme';
import ControlPanel from '../components/ControlPanel';

const controlPanel = shallow(<ControlPanel />);

describe("ControlPanel component", () => {
  it("renders correctly", () => {
    expect(controlPanel).toMatchSnapshot();
  });
});