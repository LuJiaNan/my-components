import React, { Component } from "react";
import { Button, Steps } from "antd";

interface ISettingProps {
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

const initialState = {
  currentIndex: 0,
  step: 1
};

type State = typeof initialState;

const ref: any = React.createRef();

export default class Step extends Component<ISettingProps, State> {
  static defaultProps = {
    steps: [],
    cancelText: "取消",
    finishText: "完成",
    showFinalLastStep: true,
    showCancel: true,
    backPath: '/',
    location:{
        pathname: ''
    },
    history:{
        push(){}
    }
  };

  state: State = initialState;

  componentWillMount() {
    const currentStepRoute = this.props.location.pathname.slice(1);

    let currentStepNum = 0;
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

  render() {
    const { steps } = this.props;
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

        <Button.Group>
          {(() => {
            switch (step) {
              case 1:
                return "";
              case steps.length:
                return this.props.showFinalLastStep ? (
                  <Button onClick={() => this.goRoutes(step - 1)}>
                    {"上一步"}
                  </Button>
                ) : (
                  ""
                );
              default:
                return (
                  <Button onClick={() => this.goRoutes(step - 1)}>
                    {"上一步"}
                  </Button>
                );
            }
          })()}
          {step !== steps.length ? (
            <Button onClick={() => ref.current.onSubmit("handleSubmit")}>
              {"下一步"}
            </Button>
          ) : (
            ""
          )}
          {step !== steps.length && this.props.showCancel ? (
            <Button
              onClick={() =>
                this.props.history.push(this.props.backPath)
              }
            >
              {this.props.cancelText}
            </Button>
          ) : (
            ""
          )}
          {step === steps.length ? (
            <Button
              onClick={() =>
                this.props.finalSubmitFunctionName
                  ? ref.current &&
                    ref.current[this.props.finalSubmitFunctionName]()
                  : ref.current.onSubmit("handleSubmit")
              }
            >
              {this.props.finishText}
            </Button>
          ) : (
            ""
          )}
        </Button.Group>
      </React.Fragment>
    );
  }
}
