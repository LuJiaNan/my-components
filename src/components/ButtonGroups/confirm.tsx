import React, { Component } from "react";
import { Modal } from "antd";
import LocaleReceiver from "antd/lib/locale-provider/LocaleReceiver";
import Locale from "./locale.js";

interface ISettingProps {
    onConfirm?: any;
    title: string; 
    content: string;
    locale: any;
    children?: any;
}

export default class Confirm extends Component<ISettingProps> {
    onConfirmClick(locale:any) {
      const { onConfirm, title, content } = this.props;
      const contextLocale = Object.assign({}, locale, this.props.locale);
      return Modal.confirm({
        title: title || contextLocale.title,
        content,
        okText: contextLocale.okText,
        onOk: onConfirm,
        cancelText: contextLocale.cancelText
      });
    }
    renderConfirm(locale:any) {
      let { children } = this.props;
      return React.cloneElement(children, {
        onClick: this.onConfirmClick.bind(this, locale)
      });
    }
    render() {
      let { children } = this.props;
      return React.createElement(
        LocaleReceiver,
        {
          componentName: "ButtonGroups",
          defaultLocale: Locale,
          children
        },
        this.renderConfirm.bind(this)
      );
  
    }
  }