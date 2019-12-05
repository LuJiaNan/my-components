import React, { Component } from "react";
import { Button, Steps } from "antd";
import StepProps, { defaultStepProps } from "../index";

const initialState = {
  currentIndex: 0,
  step: 1
};

type State = typeof initialState;

const ref: any = React.createRef();

export default class Step extends Component<StepProps, State> {
  static defaultProps = defaultStepProps;

  state: State = initialState;

  componentWillMount() {
    const currentStepRoute = this.props.location.pathname.slice(1);

    let currentStepNum = 1;
    this.props.steps.map((v, index) => {
      if (currentStepRoute.indexOf(v.path) > -1) {
        currentStepNum = index + 1;
      }
    });

    this.setState({
      currentIndex: currentStepNum - 1,
      step: currentStepNum
    });
  }

  goRoutes = (step: number) => {
    const {
      props: { steps }
    } = this;
    this.props.history.push(steps[step - 1].path);
    this.setState({
      currentIndex: step - 1,
      step
    });
  };

  getButton = (step: number, steps: any) => {
    const {
      btnType,
      showFinalLastStep,
      showCancel,
      history,
      backPath,
      cancelText,
      finalSubmitFunctionName,
      finishText
    } = this.props;
    return (
      <React.Fragment>
        {(() => {
          switch (step) {
            case 1:
              return "";
            case steps.length:
              return showFinalLastStep ? (
                <Button type={btnType} onClick={() => this.goRoutes(step - 1)}>
                  {"上一步"}
                </Button>
              ) : (
                ""
              );
            default:
              return (
                <Button type={btnType} onClick={() => this.goRoutes(step - 1)}>
                  {"上一步"}
                </Button>
              );
          }
        })()}
        {step !== steps.length ? (
          <Button
            type={btnType}
            onClick={() => ref.current.onSubmit("handleSubmit")}
          >
            {"下一步"}
          </Button>
        ) : (
          ""
        )}
        {step !== steps.length && showCancel ? (
          <Button type={btnType} onClick={() => history.push(backPath)}>
            {cancelText}
          </Button>
        ) : (
          ""
        )}
        {step === steps.length ? (
          <Button
            type={btnType}
            onClick={() =>
              finalSubmitFunctionName
                ? ref.current && ref.current[finalSubmitFunctionName]()
                : ref.current.onSubmit("handleSubmit")
            }
          >
            {finishText}
          </Button>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  render() {
    const { steps, btnGroupClassName } = this.props;
    const { step, currentIndex } = this.state;
    const renderDom = steps[currentIndex];
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

        <renderDom.component
          ref={ref}
          {...this.props}
          goRoutes={this.goRoutes}
        />
        <div className={btnGroupClassName}>
          {this.getButton(step, steps)}
          {!!(steps[step - 1] && steps[step - 1].extraButton)
            ? steps[step - 1].extraButton()
            : ""}
        </div>
      </React.Fragment>
    );
  }
}
