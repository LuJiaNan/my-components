import * as React from 'react'

interface ISettingProps {
  history?:any;
}

class Index extends React.Component<ISettingProps>{
  constructor(props:any){
    super(props)
  }
  submit = () => {
    console.log('111')
  }
  onSubmit = () => {
    if(true){
      console.log('commit')
    }
  }
  render(){
    return (    
      <div>我是step3</div>
    );
  }
}

export default Index;