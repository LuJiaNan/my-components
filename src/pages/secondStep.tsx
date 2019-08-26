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
      this.props.goRoutes(3)
    }
  }
  render(){
    return (    
      <div>我是step2</div>
    );
  }
}

export default Index;