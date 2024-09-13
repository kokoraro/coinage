import React from 'react';
import { shallow } from 'enzyme';
import AddCoinListItem from '../components/AddCoinListItem';

const minProps = { data: { id: 0, name: "Dogecoin", showing: false } }
const app = shallow(<AddCoinListItem { ...minProps } />);

describe('AddCoinsListItem component', () => {
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it("showing add active button color", () => {
    app.setProps({ data: { id: 0, name: "Dogecoin", showing: true }});
    expect(app.find('div').prop('style')).toHaveProperty('color', 'lightgreen');
  });

});