import React from "react";
import Enzyme, { shallow } from "enzyme";
import Page, { fetchArticles } from "./components/Page";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Page Component", () => {
	it("renders", () => {
		const wrapper = shallow(<Page />);
		expect(wrapper.exists()).toBe(true);
	});

	it("fetches data from server when server returns a successful response", async () => {
		await expect(fetchArticles()).resolves.toHaveProperty("articles");
	});
});
