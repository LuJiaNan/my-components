import * as React from 'react'

interface ISettingProps {
  goRoutes?:any;
}

class Index extends React.Component<ISettingProps>{
  constructor(props:any){
    super(props)
  }
  onSubmit = () => {
    if(true){
      // console.log('不允许跳转到第二步')
      this.props.goRoutes(2)
    }
  }
  render(){
    return (    
      <div>我是step1</div>
    );
  }
}

export default Index;
