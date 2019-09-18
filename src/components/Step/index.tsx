import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Steps } from "antd";

interface ISettingProps{
  steps: any[];
  history?: any;
  location?: any;
  showCancel?: boolean;
  cancelText?: string;
  finishText?: string;
  backPath?: string;
  showFinalLastStep?: boolean;
  finalSubmitFunctionName?: string;
}

const defaultProps: ISettingProps = {
  steps: [],
  cancelText: '取消',
  finishText: '完成',
  showFinalLastStep: true,
  showCancel: true,
};

const ref: any = React.createRef();

const Step: React.FC<ISettingProps> = (props) => {
  // 根据路由初始化步骤
  props = Object.assign({}, defaultProps, props);
  const currentStepRoute = props.location.pathname.slice(1);

  let currentStepNum = 0;
  props.steps.map((v,index) => {
    if(currentStepRoute.indexOf(v.path) > -1){
      currentStepNum = index + 1
    }
  })
  const [step, goRoutes] = useState(currentStepNum);

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

      <renderDom.component ref={ref} {...props} goRoutes={goRoutes} />

      <Button.Group>
        {(() => {
          switch (step) {
            case 1: return ''
            case steps.length: return props.showFinalLastStep ? <Button onClick={() => goRoutes(step - 1)}>{"上一步"}</Button> : ''
            default: return <Button onClick={() => goRoutes(step - 1)}>{"上一步"}</Button>
          }
        })()}
        {step !== steps.length ? (
          <Button onClick={() => ref.current.onSubmit("handleSubmit")}>
            {"下一步"}
          </Button>
        ) : (
          ""
        )}
        {(step !== steps.length && props.showCancel) ? (
          <Button onClick={() => props.history.push(props.backPath || "/")}>
            {props.cancelText}
          </Button>
        ) : (
          ""
        )}
        {step === steps.length ? (
          <Button
            onClick={() =>
              props.finalSubmitFunctionName
                ? ref.current && ref.current[props.finalSubmitFunctionName]()
                : ref.current.onSubmit("handleSubmit")
            }
          >
            {props.finishText}
          </Button>
        ) : (
          ""
        )}
      </Button.Group>
    </React.Fragment>
  );
};

Step.defaultProps = defaultProps;

export default Step;
