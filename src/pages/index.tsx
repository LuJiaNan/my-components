import * as React from 'react'
import {withRouter} from "react-router-dom"
import { Button } from 'antd'

export interface Props {
    history:any;
}
  
interface State {
    show?: boolean;
}

class Index extends React.Component<Props, State>{
    constructor(props:any){
      super(props)
    }
    render(){
        return (    
            <Button onClick={()=> this.props.history.push('/step/first')}>添加</Button>
        )
    }
}

export default withRouter(Index)
