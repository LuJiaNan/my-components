import * as React from 'react'
import './index.css'
import { Tooltip } from 'antd'
export interface Props {
    text: string;
    tooltipText?: any;
}

const Ellipsis: React.FC<Props> = (props : Props) => {
    let tooltipText = props.tooltipText
    if (typeof props.tooltipText === 'undefined') {
      tooltipText = props.text;
    }
    return (
        <Tooltip placement='top' title={tooltipText} arrowPointAtCenter={true}>
            <span className='td-ellipsis' {...Object.assign({}, props)}>
                {props.text}
            </span>
        </Tooltip>
    )
}

export default Ellipsis;
