import React, { ReactNode } from "react";
import { Form, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import _ from "lodash";

import "./index.less";

const { Item } = Form;
interface InlineProps {
  data: object[];
  footer?: ReactNode;
  className?: string;
  inlineNumber?: any;
  name: string;
}

interface InlineState {
  initialValues: any;
}

// type inlineNumbersType = string[] | number[] | number | string;
// type inlineNumbersType = any;

export default class InlineComponent extends React.Component<
  InlineProps,
  InlineState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      initialValues: {},
    };
  }
  componentDidMount() {
    this.setState({
      initialValues: this.getInitialValues(this.props.data),
    });
  }

  // 方法
  getInitialValues(data: any[]) {
    // 获取initialValues
    let initialValues = {};
    const ItemData = data;
    ItemData.forEach((item: any) => {
      if (item.defaultValue) {
        initialValues[item.name] = item.defaultValue;
      }
    });

    return initialValues;
  }
  // 事件
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  // 渲染
  renderBody() {
    const { inlineNumber } = this.props;
    let body = null;
    if (inlineNumber instanceof Array) {
      body = this.renderVariableInlineComponents();
    } else {
      body = this.renderSameInlineComponents();
    }

    return body;
  }
  renderSameInlineComponents = () => {
    const { data, inlineNumber } = this.props;
    let itemBlock: any = [];
    let arr = _.cloneDeep(data);
    let count = 0;
    for (
      let i = 0;
      arr.length !== 0;
      i++
    ) {
      // arr = arr.slice(0,2)
      const node = arr.map((item: any, index: number) => {
        const { render, config, ...props } = item;
        let style: { width?: string; height?: string } = {};
        if (config.width || config.height) {
          style.width = config.width;
          style.height = config.height;
        }
        return (
          <Item key={index} {...props}>
            {React.createElement(item.render, {
              ...config,
              ...{
                style,
              },
            })}
          </Item>
        );
      });
      // console.log(node)
      const a = React.createElement(
        "div",
        {
          className: `inline-form inlineComponent-${inlineNumber}`,
          key: count,
        },
        node
      );

      count++;
      itemBlock.push(a);
    }

    return itemBlock.map((item: any, index: number) =>
      React.createElement("div", { key: index }, item)
    );
    // return (
    //   <React.Fragment>
    //     <div className={`inline-form inlineComponent-${inlineNumber}`}>
    //       <Item></Item>
    //       <Item></Item>
    //     </div>
    //     <div className={`inline-form inlineComponent-${inlineNumber}`}>
    //       <Item></Item>
    //       <Item></Item>
    //     </div>
    //     <div className={`inline-form inlineComponent-${inlineNumber}`}>
    //       <Item></Item>
    //     </div>
    //   </React.Fragment>
    // )
  };
  renderVariableInlineComponents = () => {};
  renderFooter() {
    const { footer } = this.props;
    const defaultFooter = (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    );
    return footer || defaultFooter;
  }
  render() {
    const { className, name } = this.props;
    const { initialValues } = this.state;
    return (
      <Form
        name={name}
        initialValues={initialValues}
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
