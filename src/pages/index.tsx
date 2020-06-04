import * as React from "react";
// import { withRouter } from "react-router-dom";
import { Table, Select, Input } from "antd";
// import { compose } from "recompose";
import Ellipsis from "../components/Ellipsis";
import Button from "../components/Button";
import ButtonGroups from "../components/ButtonGroups";
import Modal from "../components/Modal";
import i18n from "../i18n";
// import i18next from '../i18next';
// import i18next from 'i18next';
import { Trans } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Translation } from "react-i18next";
import SuperSelect from "../components/SuperSelect";
// import hoistStatics from 'hoist-non-react-statics';

const Option = Select.Option;
console.dir(Modal);
// console.log(i18next.t('person.name'));

// 调试generator方法打包后的代码
function* helloGenerator() {
  yield 1;
  yield* hello();
  return;
}
function* hello() {
  yield 2;
  return;
}
const h = helloGenerator();
h.next();

export interface Props {
  history: any;
}

const initialState = {
  show: false,
  visible: false
};

type State = typeof initialState;

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const children:any[] = [];

for (let i = 0; i < 1000; i++) {
  children.push(
    <Option value={i + "aa"} key={i}>
      {i}
    </Option>
  );
}

class Index extends React.Component<Props, State> {
  state: State = initialState;
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log(i18n.t("tree", { returnObjects: true, something: "gold" }));
    // console.log(i18n.t("array", { returnObjects: true }));
  }
  handleClick = (type: string, key: string) => {
    console.log(type);
    console.log(key);
  };
  handleChange = (type: string) => {
    i18n.changeLanguage(type);
    // 修改默认namespace
    // i18next.setDefaultNamespace('moduleC')
    // console.log(i18n.t("dbType", { returnObjects: true }));

    // 重写t方法且指定特定language 和 namespace
    const dict = i18n.getFixedT("dict", "moduleC");
    console.log(dict("namespace"));

    // 重写t方法且指定特定namespace，等价于i18n.t("moduleC:namespace")
    const moduleC = i18n.getFixedT(null, "moduleC");
    console.log(moduleC("namespace"));

    // Modal.confirm({
    //   title: 'Confirm',
    //   content: 'Bla bla ...',
    //   okText: '确认',
    //   cancelText: '取消',
    // });

    // console.log(i18n.t("moduleC:namespace"));
  };
  onChange = (e: any) => {
    console.log(e);
  };
  onSearch = (e: any) => {
    console.log(e);
  };
  render() {
    const columns = [
      {
        title: i18n.t("table.name"),
        dataIndex: "name",
        key: "name",
        render: (text: string) => Ellipsis({ text })
      },
      {
        title: i18n.t("table.age"),
        dataIndex: "age",
        key: "age",
        render: (text: string) => Ellipsis({ text })
      },
      {
        title: i18n.t("table.address"),
        dataIndex: "address",
        key: "address",
        render: (text: string) => Ellipsis({ text })
      }
    ];
    const person = {
      name: "i18n",
      age: "26",
      sex: "male"
    };
    return (
      <React.Fragment>
        <Select
          defaultValue="zn"
          onChange={this.handleChange}
          style={{ width: 150, float: "right" }}
        >
          <Option value="en">English</Option>
          <Option value="zn">中文</Option>
          <Option value="dict">字典</Option>
        </Select>
        <ButtonGroups
          handleClick={this.handleClick.bind(this, "type")}
          viewMode="icon"
          showSize={2}
          mode="ButtonMenu"
        >
          <Button permission={true} actionkey="aa">
            aa
          </Button>
          <Button
            permission={false}
            actionkey="cc"
            confirm="cccccccccccccccc"
            tip="ccccccccccccccccc"
          >
            cc
          </Button>
          <Button permission={true} actionkey="bb" icon="apple">
            bb
          </Button>
          <Button permission={true} actionkey="dd">
            dd
          </Button>
          <Button permission={true} actionkey="ee">
            ee
          </Button>
          <Button
            permission={true}
            actionkey="ff"
            confirm="ffffffffffffffff"
            tip="fffffffffffffff"
          >
            ff
          </Button>
          <Button permission={true} actionkey="gg" disabled={true}>
            gg
          </Button>
        </ButtonGroups>
        <Modal
          title="我是title"
          visible={this.state.visible}
          extra={<Input value="ddddd" />}
          content={<div style={{ color: "blue" }}>我是content</div>}
        />
        <Table dataSource={dataSource} columns={columns} />
        <Button
          onClick={() => this.props.history.push("/first")}
          type="primary"
        >
          {i18n.t("add")}
        </Button>
        <Button onClick={() => this.setState({ visible: true })} type="primary">
          {i18n.t("show")}
        </Button>
        <h1>{i18n.t("Welcome to React")}</h1>
        <h2>{i18n.t("name", { person })}</h2>
        <h1>{i18n.t("aaa")}</h1>
        <h1>{i18n.t("nesting1", { number: "$t(nesting2)" })}</h1>
        <h1>{i18n.t("dbType", { context: "1" })}</h1>
        {/* 代码段内使用指定namespace */}
        <Translation ns="moduleC">{t => <p>{t("namespace")}</p>}</Translation>
        {/* 指定多个namespace，则把第一个作为默认，找不到就找不到，不去匹配后面的namespace */}
        <Translation ns={["moduleA", "moduleB", "moduleC"]}>
          {t => <p>{t("namespace")}</p>}
        </Translation>
        <p>{i18n.t("namespace")}</p>
        <Trans
          i18nKey="welcomeUser"
          values={{ name: "tomorrow", customer: "yesterday" }}
        />
        <br/>
        SuperSelect:
        <SuperSelect
          showSearch={true}
          allowClear={true}
          mode="multiple"
          onChange={this.onChange}
          onSearch={this.onSearch}
          style={{ width: "300px" }}
        >
          {children}
        </SuperSelect>
      </React.Fragment>
    );
  }
}

// export default compose(
//   withTranslation(),
//   withRouter
// )(Index);
// export default hoistStatics(withTranslation()(Index), Index);
export default withTranslation()(Index);
