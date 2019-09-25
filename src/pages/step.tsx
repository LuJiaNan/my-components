import React from "react";
import { withRouter } from "react-router-dom";
import Step from '../components/Step';
// import Step from "../components/ClassStep";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
const steps = [
  {
    text: "第一步",
    description: "我是第一步",
    path: "first",
    component: FirstStep
  },
  {
    text: "第二步",
    description: "我是第二步",
    path: "second",
    component: SecondStep
  },
  {
    text: "第三步",
    description: "我是第三步",
    path: "third",
    component: ThirdStep
  }
];

const Index = (props: any) => {
  return (
    <Step
      steps={steps}
      showCancel={true}
      cancelText="点击取消"
      // showFinalLastStep={false}
      // finalSubmitFunctionName="submit"
      {...props}
    />
    

    // 函数式调用函数组件提高性能 /components/Step
    // Step({
    //   steps,
    //   showCancel:true,
    //   cancelText:"点击取消",
    //   // showFinalLastStep:false,
    //   // finalSubmitFunctionName:"submit",
    //   ...props
    // })
  );
};

export default withRouter(Index);
