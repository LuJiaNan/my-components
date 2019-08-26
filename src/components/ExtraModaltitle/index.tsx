import * as React from 'react'
import { useState, useEffect } from 'react'
import './index.css'
import { Button } from 'antd'
export interface Props {
    text: string;
    extra?: any;
}

function Index({ text, extra }: Props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (    
    <div className="extraModalTitle">
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
      <div className="leftTitle">{text}</div>
      <div className="rightTitle">{extra}</div>
    </div>
  );
}

export default Index;
