import React from 'react'
import { Button } from 'antd'; 
import { ButtonProps } from 'antd/lib/button'; 
declare const ButtonTypes: ["default", "primary", "ghost", "dashed", "danger", "link"];
export declare type ButtonType = (typeof ButtonTypes)[number];

interface MyButtonProps extends ButtonProps { 
    [propName: string]: any;
    actionkey?:string;
    permission?:boolean;
    confirm?:string;
    confirmTitle?:string;
    tip?:string;
    disabled?:boolean;
    icon?:string;
    type?:ButtonType;
} 

const MyButton: React.FC<MyButtonProps> = (props : MyButtonProps) => {
    return <Button {...props} />  
}

MyButton.defaultProps = {
    type: 'default'
}

export default MyButton;
