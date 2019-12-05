import { ButtonType } from "antd/lib/button"
export default interface StepProps {
    steps: any[];
    history?: any;
    location?: any;
    showCancel?: boolean;
    cancelText?: string;
    finishText?: string;
    backPath?: string;
    showFinalLastStep?: boolean;
    finalSubmitFunctionName?: string;
    btnGroupClassName?: string;
    btnType?: ButtonType;
}

export const defaultStepProps = {
    steps: [],
    cancelText: "取消",
    finishText: "完成",
    showFinalLastStep: true,
    showCancel: true,
    backPath: "/",
    location: {
      pathname: ""
    },
    history: {
      push() {}
    },
    btnGroupClassName: '',
    btnType: 'default'
}