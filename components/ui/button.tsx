// @ts-nocheck
import * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: string; size?: string; asChild?: boolean; }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => <button ref={ref} className={className} {...props} />);
Button.displayName = "Button";
export { Button, Button as buttonVariants };
