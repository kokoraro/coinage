import React from 'react';
import { shallow } from 'enzyme';
import AddCoinListItem from '../components/AddCoinListItem';

const app = shallow(<addCoinListItem />);

describe('AddCoinsListItem component', () => {
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  xit("selecting coin adds styling changes", () => {
    // controlPanel.find()
    // expect(...).toHaveProperty(...)
  });
});