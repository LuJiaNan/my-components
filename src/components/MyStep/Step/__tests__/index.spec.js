import * as React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { renderHook, act } from "@testing-library/react-hooks";
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
    },
    history: {
      push: jest.fn()
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

describe("全方法覆盖", () => {
  // const props = {
  //   steps: [
  //     {
  //       text: "第一步",
  //       description: "我是第一步",
  //       path: "first",
  //       component: "div"
  //     },
  //     {
  //       text: "第二步",
  //       description: "我是第二步",
  //       path: "second",
  //       component: "div"
  //     }
  //   ],
  //   location: {
  //     pathname: "/first"
  //   },
  //   history: {
  //     push: jest.fn((a) => {})
  //   }
  // };

  // it("useEffect hook 测试", async () => {
  //   // jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  //   const { findByTestId } = render(<Step {...props}/>);
  //   const $currentIndex = await findByTestId('currentIndex');
  //   expect($currentIndex).toHaveTextContent(props.steps[0].text);
  //   expect($currentIndex).toHaveTextContent(props.steps[0].description);
  //   expect($currentIndex).toHaveTextContent(props.steps[1].text);
  //   expect($currentIndex).toHaveTextContent(props.steps[1].description);
  // });

  const props = {}
  it("useEffect hook 测试", () => {
    const { wrapper } = setup(props)
    console.log(wrapper.debug())
    const { result, rerender } = renderHook(Step(props));
    console.log(result.current)
  })
});
