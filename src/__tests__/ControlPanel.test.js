import React from 'react';
import { shallow } from 'enzyme';
import ControlPanel from '../components/ControlPanel';

const controlPanel = shallow(<ControlPanel />);

describe("ControlPanel component", () => {
  it("renders correctly", () => {
    expect(controlPanel).toMatchSnapshot();
  });

  it("add click shows input", () => {
    expect(controlPanel.find('input').length).toBe(0);
    controlPanel.find('.add-button').simulate('click');
    expect(controlPanel.find('input').length).toBe(1);
  });

});