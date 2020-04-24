import * as React from "react";
import InlineComponent from "../components/InlineComponents";
import { Input, Button } from "antd";

class Index extends React.Component {
  render() {
    let config = {
      type: "normal",
      inlineNumber: 2,
      name: "form1",
      className: "",
      footer: (
        <Button type="danger" htmlType="submit">
          提交
        </Button>
      ),
      data: [
        {
          label: "input1",
          name: "name1",
          render: Input,
          rules: [{ required: true, message: "Please input input1!" }],
          config: {
            placeholder: "i am input 1",
          },
        },
        {
          label: "input2",
          name: "name2",
          render: Input,
          value: "input",
          rules: [{ required: true, message: "Please input input2!" }],
          config: {
            placeholder: "i am input 2",
          },
        },
      ],
    };
    return <InlineComponent {...config} />;
  }
}

export default Index;
