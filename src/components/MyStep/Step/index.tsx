import * as React from "react";
import { useState, useEffect } from "react";
import { Steps } from "antd";
import StepProps from "../index";

const defaultProps: StepProps = {
  steps: [],
  location: {
    pathname: ""
  },
  history: {
    push() {}
  }
};

const ref: any = React.createRef();

const Step: React.FC<StepProps> = props => {
  // 根据路由初始化步骤
  props = Object.assign({}, defaultProps, props);
  const currentStepRoute = props.location.pathname.slice(1);

  let currentStepNum = 0;
  props.steps.map((v, index) => {
    if (currentStepRoute.indexOf(v.path) > -1) {
      currentStepNum = index + 1;
    }
  });
  const [step, goRoutes] = useState(currentStepNum);
  const getCurrentStep = () => step;

  const currentIndex = step - 1;
  const { steps } = props;
  const renderDom = props.steps[currentIndex];
  useEffect(() => {
    props.history.push(steps[currentIndex].path);
  }, [step]);

  return (
    <React.Fragment>
      <Steps current={currentIndex}>
        {steps.map((item: { text: string; description: string }) => (
          <Steps.Step
            key={item.text}
            title={item.text}
            description={item.description}
          />
        ))}
      </Steps>

      {React.createElement(renderDom.component, {
        ...props,
        ref,
        goRoutes,
        getCurrentStep
      })}
    </React.Fragment>
  );
};

Step.defaultProps = defaultProps;

export default Step;
