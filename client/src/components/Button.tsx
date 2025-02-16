import { Button as ShadButton } from "./ui/button.js";
import React from "react";
import { ReactNode } from "react";

type Buttonprops = {
  children: ReactNode;
  onClick?: () => void;
  className: string;
};

const Button = ({ children, onClick, className }: Buttonprops) => {
  return (
    <ShadButton className={className} onClick={onClick}>
      {children}
    </ShadButton>
  );
};

export default Button;
