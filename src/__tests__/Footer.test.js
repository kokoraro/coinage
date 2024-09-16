import React from "react";
import { shallow } from "enzyme";
import Footer from "../components/Footer";

const app = shallow(<Footer />);

describe("Footer", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});
