import React from "react";
import { Form, Input, Button, Checkbox } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

export const MyForm = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const testChange = (v:any) => {
    console.log(v.target.value)
  }

  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === "basic") {
          console.log(forms);
          const { basic, detail } = forms;
          const username = basic.getFieldValue("username") || "";
          detail.setFieldsValue({ age: username });
        } else {
          console.log(name);
        }
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="data">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(
                  field => <Form key ="1" name="123"><Input/></Form>
                  // <Form.Item {...field}>
                  // <Input />
                  // </Form.Item>
                )}
                <Form.Item>
                  <Button onClick={() => add()}>Add</Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        {/* <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item> */}

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Form name="detail">
        <Form.Item {...tailLayout} name="age" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit2
          </Button>
        </Form.Item>
      </Form>
      <Form name='testValue'>
            <Input onChange={testChange}/>
      </Form>
    </Form.Provider>
  );
};
