import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import fetch from "cross-fetch";
// import WrapperDatePicker from "../WrapperDatePicker";

import { stringify } from "qs";

const initialState = {
  childData: []
};

type State = typeof initialState;
                      
interface ISettingProps {
  children?: any;
  containerTo: boolean; 
}

export default class FormItem extends Component<ISettingProps, State> {

  static defaultProps = {
    containerTo: true
  };
  static contextTypes = {
    formRef: PropTypes.object,
    formLayout: PropTypes.object
  };

  constructor(props:any) {
    super(props);
    let { children } = props;
    if (children.props.options instanceof Array) {
      this.state = {
        childData: children.props.options
      };
    } else {
      this.state = {
        childData: []
      };
    }
  }

  componentWillReceiveProps(nextProps:any) {
    let { children } = nextProps;
    let field = children;
    //  console.log(JSON.stringify(field.props.options),JSON.stringify(this.props.children.props.options))
    if (
      JSON.stringify(field.props.options) !==
      JSON.stringify(this.props.children.props.options)
    ) {
      this.setState({
        childData: field.props.options
      });
    }
    if (
      field.props.fetch &&
      typeof field.props.fetch === "string" &&
      field.props.fetch !== this.props.children.props.fetch
    ) {
      this.fetchData(
        field.props.fetch,
        field.props.params,
        field.props.fetchCallback
      );
    }
    if (field.props.params) {
      if (
        typeof field.props.params === "function" ||
        (typeof field.props.params === "string" &&
          JSON.stringify(field.props.params) !==
            JSON.stringify(this.props.children.props.params))
      ) {
        this.fetchData(
          field.props.fetch,
          field.props.params,
          field.props.fetchCallback
        );
        // console.log("params")
      }
    }
  }
  componentDidMount() {
    let { children } = this.props;
    let field = children;
    if (
      typeof field.props.fetch === "string" &&
      field.props.fetch.length > -1
    ) {
      if (field.props.params) {
        // 规避 params 无法判断差异引起首次多发请求问题，
        // 当fetch 与 params 属性同时配置，首次请求交由componentWillReceiveProps里方法进行发送
      } else {
        this.fetchData(
          field.props.fetch,
          field.props.params,
          field.props.fetchCallback
        );
      }
    }
  }
  /**
   * [fetchData 获取远程接口数据]
   * @param  {[type]} fetchUrl [description]
   * @return {[type]}          [description]
   */
  fetchData(fetchUrl:any, params:any, callback:any) {
    // let body={}]
    let { formRef } = this.context;
    let url;
    if (params) {
      if (typeof params === "function") {
        url = [fetchUrl, stringify(params.apply(this, [formRef]))].join("?");
      } else {
        url = [fetchUrl, stringify(params)].join("?");
      }
    } else {
      url = fetchUrl;
    }
    fetch(url, {
      method: "GET"
    })
      .then(json => {
        return json.json();
      })
      .then(result => {
        if (result.code === 0) {
          if (callback) {
            this.setState({
              childData: callback(result, formRef)
            });
          } else {
            this.setState({
              childData: result.data.items
            });
          }
        }
      });
  }
  renderField() {
    let { children, containerTo } = this.props;
    let { childData } = this.state;
    let field = children;
    let { defaultValue, renderable, disabled, ...otherProps } = field.props;
    let { formRef } = this.context;
    let containerToProp = {};
    let treeDataProp = {};
    let disabledProp = {};
    // console.log(otherProps)
    if (disabled && typeof disabled === "function") {
      disabledProp = {
        disabled: disabled.apply(this, [formRef])
      };
    } else if (disabled && typeof disabled === "boolean") {
      disabledProp = {
        disabled
      };
    }

    if (
      containerTo &&
      field.type.name === "Select" &&
      !field.props.changeCalendarContainer
    ) {
      containerToProp = {
        getPopupContainer: (triggerNode:any) => triggerNode.parentNode
      };
    }
    if (
      field.type.name === "TreeSelectPicker" ||
      field.type.name === "TreeView"
    ) {
      treeDataProp = {
        treeData: this.loopTreeData(childData)
      };
    }

    // console.log(containerToProp,field.type.name)
    if (field.type.name === "PickerWrapper") {
      // return React.createElement(
      //   WrapperDatePicker,
      //   Object.assign({}, otherProps, disabledProp),
      //   field
      // );
      return ''
    } else {
      if (childData.length === 0) {
        return React.createElement(
          field.type,
          Object.assign(
            {},
            otherProps,
            containerToProp,
            treeDataProp,
            disabledProp
          )
        );
      } else if (field.props.renderItem) {
        return React.createElement(
          field.type,
          Object.assign(
            { key: new Date().valueOf() },
            otherProps,
            containerToProp,
            treeDataProp,
            disabledProp
          ),
          childData.map(
            (d, idx) => field.props.renderItem && field.props.renderItem(d, idx)
          )
        );
      } else {
        return React.createElement(
          field.type,
          Object.assign(
            {},
            otherProps,
            containerToProp,
            treeDataProp,
            disabledProp
          )
        );
      }
    }
  }
  loopTreeData(data:any) {
    return data.map((item:any) => {
      if (item.children && item.children.length) {
        return Object.assign(
          item,
          { title: item.text, value: item.id, key: item.id },
          { children: this.loopTreeData(item.children) }
        );
      } else {
        return Object.assign(item, {
          title: item.text,
          value: item.id,
          key: item.id
        });
      }
    });
  }
  render() {
    let element = this.props.children;
    let { name, label } = element.props;
    let {
      defaultValue,
      allowClear,
      hidden,
      disabled,
      renderable,
      ...otherProps
    } = element.props;
    let { formRef, formLayout } = this.context;
    const { getFieldDecorator } = formRef;
    let styles = {};
    let renderProps = true;

    if (element.type.name === "Input" && element.props.type === "hidden") {
      styles = {
        style: { marginBottom: 0 }
      };
    }
    if (element.props.hidden === true) {
      styles = {
        style: { display: "none" }
      };
    }
    // console.log(typeof(hiddenProp))
    if (
      (typeof renderable === "boolean" && renderable === false) ||
      (typeof renderable === "function" &&
        renderable.apply(this, [formRef]) === false)
    ) {
      renderProps = false;
    }
    return renderProps ? (
      <Form.Item
        label={label}
        {...Object.assign({}, formLayout, this.props)}
        {...styles}
      >
        {getFieldDecorator(name, {
          ...otherProps,
          initialValue: defaultValue,
          hidden: element.props.hidden || false
        })(this.renderField())}
      </Form.Item>
    ) : null;
  }
}