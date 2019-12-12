import * as React from 'react'
import {Button} from 'antd';

interface ISettingProps {
  goRoutes?:any;
  getCurrentStep?:any;
}

class Index extends React.Component<ISettingProps>{
  constructor(props:any){
    super(props)
  }
  onSubmit = () => {
    console.log('当前是第'+this.props.getCurrentStep()+'步')
  }
  goNext = () => {
    this.props.goRoutes(2)
  }
  render(){
    return (   
      <div>
        <div>我是step1</div>
        <Button onClick={this.goNext}>下一步</Button>
        <Button onClick={this.onSubmit}>提交</Button>
      </div> 
    );
  }
}

export default Index;
