import * as React from 'react'
import {withRouter} from "react-router-dom"
import { Table, Skeleton } from 'antd'
import Ellipsis from '../components/Ellipsis'
import Button from '../components/Button'
import ButtonGroups from '../components/ButtonGroups'

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
    handleClick = (type:string,key:string) => {
      // console.log(type)
      console.log(key)
    }
    render(){
        return (
            <React.Fragment>
                <ButtonGroups handleClick={this.handleClick.bind(this, 'type')} viewMode="icon" showSize={2} mode="ButtonMenu">
                    <Button permission={true} actionkey="aa">aa</Button>
                    <Button permission={false} actionkey="cc" confirm="cccccccccccccccc" tip="ccccccccccccccccc">cc</Button>
                    <Button permission={true} actionkey="bb" icon="apple">bb</Button>
                    <Button permission={true} actionkey="dd">dd</Button>
                    <Button permission={true} actionkey="ee">ee</Button>
                    <Button permission={true} actionkey="ff" confirm="ffffffffffffffff" tip="fffffffffffffff">ff</Button>
                    <Button permission={true} actionkey="gg" disabled={true}>gg</Button>
                </ButtonGroups>
                <Table dataSource={dataSource} columns={columns} />
                <Button onClick={()=> this.props.history.push('/first')}>添加</Button>
                <Skeleton 
                  active={true} 
                  paragraph={{
                    rows: 5,
                    width: ['50%','60%','70%','80%','90%']
                  }}
                  title={true}
                  avatar={{
                    size: 'large',
                    shape: 'square'
                  }} 
                >
                  <div>
                    <h4>Ant Design, a design language</h4>
                    <p>
                      We supply a series of design principles, practical patterns and high quality design
                      resources (Sketch and Axure), to help people create their product prototypes
                      beautifully and efficiently.
                    </p>
                  </div>
                </Skeleton>
            </React.Fragment>
        )
    }
}

export default withRouter(Index)
