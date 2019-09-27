import * as React from 'react'
import './index.css'
export interface Props {
    text?: any;
    extra?: any;
}

function ExtraModaltitle({ text, extra }: Props) {
  return (    
    <div className="extraModalTitle">
      <div className="leftTitle">{text}</div>
      <div className="rightTitle">{extra}</div>
    </div>
  );
}

export default ExtraModaltitle;
