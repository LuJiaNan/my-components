import * as React from 'react'
import {withRouter} from "react-router-dom"
import Step from '../components/Step/index'
import FirstStep from './firstStep'
import SecondStep from './secondStep'
import ThirdStep from './thirdStep'
const steps = [{
    text:'我是第一步',
    path: 'first',
    currentStep: 1,
    component: FirstStep
  },{
    text:'我是第二步',
    path: 'second',
    currentStep: 2,
    component: SecondStep
  },{
    text:'我是第三步',
    path: 'third',
    currentStep: 3,
    component: ThirdStep
}]

const Index = (props:any) => {
  return (    
    <Step 
      steps={steps} 
      // backPath={'/'}
      showCancel={true}
      cancelText="点击取消"
      // finishText="关闭"
      {...props}
    />
  )
}

export default withRouter(Index)
