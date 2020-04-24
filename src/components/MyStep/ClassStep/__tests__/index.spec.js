import React from "react";
import { shallow } from "enzyme";
import Step from "../index.tsx";

function setup(props, options) {
  const defaultProps = {
    steps: [
      {
        text: "第一步",
        description: "我是第一步",
        path: "first",
        component: "div"
      },
      {
        text: "第二步",
        description: "我是第二步",
        path: "second",
        component: "div"
      }
    ],
    location: {
      pathname: "/first"
    }
  };
  const wrapper = shallow(
    <Step {...Object.assign({}, defaultProps, props)} />,
    options
  );
  return {
    wrapper
  };
}

describe("快照测试", () => {
  const props = {};
  it("step 组件快照", () => {
    const { wrapper } = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("方法测试全覆盖", () => {
  const props = {};
  it("goRoutes 方法测试", () => {
    // const { wrapper } = setup(props, { disableLifecycleMethods: true });
    const { wrapper } = setup(props);
    const instance = wrapper.instance();
    // console.log(instance.state) //{ currentIndex: 0, step: 1 }
    instance.goRoutes(2)
    expect(instance.state).toEqual({ currentIndex: 1, step: 2 })
  });

  it("getCurrentStep 方法测试", () => {
      const { wrapper } = setup(props)
      const instance = wrapper.instance()
      expect(instance.getCurrentStep()).toBe(1)
      instance.goRoutes(2)
      expect(instance.getCurrentStep()).toBe(2)
  })
});
