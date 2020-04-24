import React, { Component } from "react"
import { Tooltip, Menu, Dropdown, Button as Btn } from "antd"
import { EllipsisOutlined } from '@ant-design/icons'
import Button from "../Button"
import Confirm from './confirm'
import './index.less'

const Group = Btn.Group

interface IButtonGroupsProps {
  handleClick?: React.MouseEventHandler<HTMLElement>;
  viewMode?: any;
  showSize?: number;
  mode?: string;
  locale?: any;
  children?: any;
}  

export default class ButtonGroups extends Component<IButtonGroupsProps> {
  static defaultProps:IButtonGroupsProps = {
    showSize: 5,
    // handleClick: function(actionkey) {},
    handleClick(actionkey) {return actionkey},
    viewMode: "text",
    mode: "ButtonGroup"
  };

  renderButtonOnly() {
    let { children } = this.props;
    let childrenArray = React.Children.toArray(children);
    // let {appReducer} = this.context
    // console.log(this.context.appReducer)
    return childrenArray
      .filter((it:any) => {
        if (it.props.permission === undefined) {
          return true;
        } else {
          return it.props.permission && it.props.permission === true;
        }
      })
      .map((it, idx) => {
        return this.renderReactElement(it, idx);
      });
  }

  renderReactElement(it:any, idx:any) {
    let { handleClick, viewMode, locale } = this.props;
    let {
      tip,
      confirm,
      confirmTitle,
      placement,
      icon,
      children,
      block,
      actionkey,
      disabled,
      permission,
      ...otherProps
    } = it.props;
    let iconProps = { actionkey, disabled };

    // tip提示判断，判断没有tip属性时缺省显示text内容
    tip = !!tip ? tip : children;

    // 非text文字模式下，显示icon图标，无icon属性设置时，只显示文字
    if (viewMode === "icon" || viewMode === "both") {
      if (!!icon) {
        iconProps = Object.assign(iconProps, { icon });
      }
      if (viewMode === "icon") {
        children = !!icon ? "" : children;
      }
    }

    if (confirm && !disabled) {
      return React.createElement(
        Confirm,
        Object.assign(
          {},
          {
            locale,
            key: idx,
            title: confirmTitle,
            content: confirm,
            placement,
            onConfirm: () => handleClick && handleClick(actionkey)
          }
        ),
        React.createElement(
          Tooltip,
          Object.assign({}, { key: idx, title: tip, icon }),
          React.createElement(
            Button,
            Object.assign(iconProps, otherProps),
            children
          )
        )
      );
    } else {
      return React.createElement(
        Tooltip,
        Object.assign({}, { key: idx, title: tip, icon }),
        React.createElement(
          Button,
          Object.assign(
            iconProps,
            otherProps,
            !disabled
              ? {
                  onClick: () => handleClick && handleClick(actionkey)
                }
              : {}
          ),
          children
        )
      );
    }
  }
  // return

  renderMenuReactElement(it:any, idx:any) {
    let { tip, children } = it.props;
    return React.createElement(
      Tooltip,
      Object.assign({}, { key: idx, title: tip }),
      React.cloneElement(it, Object.assign({}, it.props), children)
    );
  }

  renderMixButtonMenu() {
    let { children, showSize } = this.props;
    let childrenArray = React.Children.toArray(children);

    let endArray = childrenArray.splice(showSize || 5);

    return (
      <div>
        {childrenArray
          // .filter((it)=>{
          //   console.log(it.props.permission)
          //   return it.props.permission==true
          // })
          .map((it, idx) => {
            return this.renderReactElement(it, idx);
          })
        }
        <Dropdown overlay={this.renderMenuItem(endArray)}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  }

  renderMenuItem(itemList:any) {
    let { handleClick } = this.props;
    return (
      <Menu onClick={()=>handleClick}>
        {itemList.map((it:any, idx:any) => {
          return (
            <Menu.Item key={idx}>
              {this.renderMenuReactElement(it, idx)}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }

  renderChildren() {
    let { mode } = this.props;

    return (
      <Group>
        {mode === "ButtonGroup"
          ? this.renderButtonOnly()
          : this.renderMixButtonMenu()}
      </Group>
    );
  }

  render() {
    return <div className="button-groups">{this.renderChildren()}</div>;
  }
}

/*
 * showSize:超过收起的数目
 * handleClick : 点击事件（需子元素以actionKey区分）
 * viewMode : 按钮的展示模式，仅文字，仅图片，文字+图片
 * 子元素如需confirm确认 子元素自身添加confirm 属性 value为提醒文字
 * tip 为元素上移显示文字
 */
// ButtonGroups.propTypes = {
//   /**
//    超过收起的数目
//   **/
//   showSize: PropTypes.number,
//   /**
//    点击事件（需子元素以actionKey区分）
//   **/
//   handleClick: PropTypes.func,
//   /**
//    按钮的展示模式，仅文字，仅图片，文字+图片
//   **/
//   viewMode: PropTypes.oneOf(["text", "icon", "both"]),
//   /**
//    显示模式 ButtonGroup 和 ButtonMenu
//   **/
//   mode: PropTypes.oneOf(["ButtonGroup", "ButtonMenu"]),
//   locale: PropTypes.object
// };
// ButtonGroups.defaultProps = {
//   showSize: 5,
//   handleClick: function(actionkey) {},
//   viewMode: "text",
//   mode: "ButtonGroup"
// };
