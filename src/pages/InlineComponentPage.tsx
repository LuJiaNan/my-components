import * as React from "react";
import InlineComponent from "../components/InlineComponents";
import { Input, Select } from "antd";

class Index extends React.Component {
  render() {
    let config = {
      type: "normal",
      inlineNumber: 2,
      // inlineNumber: [1,2],
      name: "form1",
      className: "",
      // footer: (
      //   <Button type="danger" htmlType="submit">
      //     提交
      //   </Button>
      // ),
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
          defaultValue: "input",
          rules: [{ required: true, message: "Please input input2!" }],
          config: {
            placeholder: "i am input 2",
          },
        },
        {
          label: "select1",
          name: "name3",
          render: Select,
          rules: [{ required: true, message: "Please select select1!" }],
          config: {
            placeholder: "i am select 1",
            width: "150px",
            options: [
              {
                label: "option1",
                value: "option1",
              },
              {
                label: "option2",
                value: "option2",
              },
              {
                label: "option3",
                value: "option3",
              },
            ],
          },
        },
      ],
    };
    return <InlineComponent {...config} />;
  }
}

export default Index;
