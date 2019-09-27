import * as React from "react";
import { Modal } from "antd";
import ExtraModaltitle from "../ExtraModaltitle";
import { ModalProps } from 'antd/lib/modal'; 

interface MyModalProps extends ModalProps {
  [propName: string]: any;
  content?: any;
}


const initialState = {
  visible: false
};

type State = typeof initialState;

export default class MyModal extends React.Component<MyModalProps, State> {
  static defaultProps = {
    title: "弹出框",
    content: ""
  };

  state: State = initialState;

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }
  onOk = () => {
    this.setState({
      visible: false
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { title, content, extra, onOk, onCancel } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        {...this.props}
        visible={visible}
        onOk={onOk || this.onOk}
        onCancel={onCancel || this.onCancel}
        title={extra ? <ExtraModaltitle text={title} extra={extra} /> : title}
      >
        {content}
      </Modal>
    );
  }
}
