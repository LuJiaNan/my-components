import * as React from 'react'
import {Steps,Button} from 'antd'
import './index.css'

export interface Props {
  currentStep:number;
  steps:any;
}

// class McSteps extends React.Component {
//     handlerMenu(actionType) {
//         const {actions} = this.props
// 		if (actionType === 'lastStep') {
// 			actions.goLastStep();
// 		} else if (actionType === 'nextStep') {
//             this.refs.child.onSubmit('handleSubmit')
// 		} else if (actionType === 'cancel') {
// 			this.props.history.goBack()
// 		} else if (actionType === 'finish') {
//             this.props.history.goBack()
//         }
//     }
// 	renderFooter () {
//         const {currentStep,lastText,nextText,cancelText,finishText,buttonDisabled} = this.props
// 		return (
//             <ButtonGroups handleClick={this.handlerMenu.bind(this)}>
//                 <Button disabled={buttonDisabled || false} actionkey="lastStep" type="primary" permission={!(currentStep === 1 || currentStep === this.props.steps.length)}>{lastText||'上一步'}</Button>
//                 <Button disabled={buttonDisabled || false} actionkey="nextStep" type="primary" permission={!(currentStep === this.props.steps.length)}>{nextText||'下一步'}</Button>
//                 <Button disabled={buttonDisabled || false} actionkey="cancel" permission={!(currentStep === this.props.steps.length)}>{cancelText||'取消'}</Button>
//                 <Button disabled={buttonDisabled || false} actionkey="finish" permission={currentStep === this.props.steps.length}>{finishText||'返回'}</Button>
//             </ButtonGroups>
// 		)
//     }
//     renderBody () {
//         const { currentStep }  = this.props
//         const currentStepIndex = currentStep-1
//         const renderDom = this.props.steps[currentStepIndex]
//         const title = this.props.steps[currentStepIndex].title
//         return <renderDom.component {...this.props} title={title} ref='child'/>
//     }
//     render(){
//         const { currentStep }  = this.props
//         const currentStepIndex = currentStep-1
//         return(
//             <div>
//                 <Panel footer={false}>
//                     <div className="mc-step">
//                         <Steps current={currentStepIndex}>
//                             {this.props.steps.map(item => (
//                                 <Steps.Step key={item.text} title={item.text} />
//                             ))}
//                         </Steps>
//                         {this.renderBody()}
//                         {this.renderFooter()}
//                     </div>
//                  </Panel>
//              </div>
//         )
//     }
// }

function jump(type:string,steps:any){
  const url = window.location.href
  if(type === 'last'){
    if(url.indexOf('first') > -1){
      console.log('已经是第一步了')
    }else if(url.indexOf('second') > -1){
      window.location.href = steps[0].route
    }else if(url.indexOf('third') > -1){
      window.location.href = steps[1].route
    }else{
      console.log('已经是第一步了')
    }
  }else if(type === 'next'){
    if(url.indexOf('first') > -1){
      window.location.href = steps[1].route
    }else if(url.indexOf('second') > -1){
      window.location.href = steps[2].route
    }else if(url.indexOf('third') > -1){
      console.log('已经是最后一步了')
    }else{
      window.location.href = steps[1].route
    }
  }
}

function Index({ currentStep,steps }: Props) {
  const renderDom = steps[currentStep-1]

  return (    
    <React.Fragment>
      <div className="mc-step">
        <Steps current={currentStep-1}>
            {steps.map((item: { text: string; }) => (
                <Steps.Step key={item.text} title={item.text} />
            ))}
        </Steps>
        <renderDom.component title={steps[currentStep-1].title}/>
        <React.Fragment>
            {/* <Button type="primary" permission={!(currentStep === 1 || currentStep === this.props.steps.length)}>{'上一步'}</Button>
            <Button type="primary" permission={!(currentStep === this.props.steps.length)}>{'下一步'}</Button>
            <Button permission={!(currentStep === this.props.steps.length)}>{'取消'}</Button>
            <Button  permission={currentStep === this.props.steps.length}>{'返回'}</Button> */}
            <Button onClick={(event) => {jump('last',steps)}}>{'上一步'}</Button>
            <Button onClick={(event) => {jump('next',steps)}}>{'下一步'}</Button>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default Index;