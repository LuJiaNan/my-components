import React, { ReactNode } from "react";
import { Form, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/es/interface";

import "./index.less";

const { Item } = Form;
interface InlineProps {
  data: object[];
  type: string;
  footer?: ReactNode;
  className?: string;
  inlineNumber?: number;
  name: string;
}

interface InlineState {
  type: "normal";
  inlineNumber: 1;
}

export default class InlineComponent extends React.Component<
  InlineProps,
  InlineState
> {
  // 渲染
  renderBody() {
    const { data } = this.props;
    return data.map((item: any) => {
      const { render, config, ...props } = item;
      return (
        <Item key={item.name} {...props}>
          {React.createElement(item.render, {
            ...config,
          })}
        </Item>
      );
    });
  }
  renderFooter() {
    const { footer } = this.props;
    const defaultFooter = (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    );
    return footer || defaultFooter;
  }
  // 事件
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    const { className,name } = this.props;
    return (
      <Form
        name={name}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        className={`inlineComponent ${className}`}
      >
        {this.renderBody()}
        {this.renderFooter()}
      </Form>
    );
  }
}
