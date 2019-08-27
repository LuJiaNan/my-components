import * as React from 'react'
import {withRouter} from "react-router-dom"
import { Button, Table } from 'antd'
import Ellipsis from '../components/Ellipsis/index'

export interface Props {
    history:any;
}
  
interface State {
    show?: boolean;
}

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text:string) => Ellipsis( {text} )
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (text:string) => Ellipsis( {text} )
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      render: (text:string) => Ellipsis( {text} )
    },
  ];

class Index extends React.Component<Props, State>{
    constructor(props:any){
      super(props)
    }
    render(){
        return (
            <React.Fragment>
                <Table dataSource={dataSource} columns={columns} />
                <Button onClick={()=> this.props.history.push('/first')}>添加</Button>
            </React.Fragment>
        )
    }
}

export default withRouter(Index)
