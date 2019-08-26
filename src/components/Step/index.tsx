import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, Steps } from 'antd'

interface ISettingProps {
    steps:any[];
    history?:any;
    location?:any;
    showCancel?:boolean;
    cancelText?:string
    finishText?:string;
    backPath?:string;
}
const ref:any = React.createRef();
const Step: React.SFC<ISettingProps> = (props : ISettingProps) => {
    // 根据路由初始化步骤
    const currentStepRoute = props.location.pathname.slice(1)
    const currentStepNum = props.steps.filter(v => currentStepRoute.indexOf(v.path) > -1)[0].currentStep
    const [step,goRoutes] = useState(currentStepNum)

    const currentIndex = step - 1
    const { steps } = props
    const renderDom = props.steps[currentIndex]

    useEffect(() => {
        props.history.push(steps[currentIndex].path)
    }, [step])
    
    return (
        <React.Fragment>

            <Steps current={currentIndex}>
                {steps.map((item: { text: string; }) => (
                    <Steps.Step key={item.text} title={item.text} />
                ))}
            </Steps>

            <renderDom.component ref={ref} {...props} goRoutes={goRoutes}/>

            <Button.Group>
                { !(step === 1) ? <Button onClick={() => goRoutes(step - 1)}>{'上一步'}</Button> : ''}
                {/* { !(step === 1 || step === steps.length) ? <Button onClick={() => goRoutes({currentStep:step - 1,route:steps[currentIndex].path})}>{'上一步'}</Button> : ''} */}
                {/* { !(step === steps.length) ? <Button onClick={() => goRoutes({currentStep:step + 1,route:steps[currentIndex].path})}>{'下一步'}</Button> : ''} */}
                { !(step === steps.length) ? <Button onClick={() => ref.current.onSubmit()}>{'下一步'}</Button> : ''}
                { (!(step === steps.length) && props.showCancel) ? <Button onClick={() => props.history.push(props.backPath || '/')}>{props.cancelText || '取消'}</Button> : ''}
                { step === steps.length ? <Button onClick={() => ref.current.onSubmit()}>{props.finishText || '完成'}</Button> : ''}
            </Button.Group>

        </React.Fragment>
    )
}

export default Step