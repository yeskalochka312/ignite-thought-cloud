import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("btn-3d inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "",
      destructive: "btn-destructive",
      outline: "btn-outline",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link !bg-transparent border-none p-0"
    },
    size: {
      default: "",
      sm: "btn-sm text-sm",
      lg: "btn-lg text-lg",
      icon: "btn-icon"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";

  // For link variant, don't use 3D structure
  if (variant === "link") {
    return <Comp className={cn(buttonVariants({
      variant,
      size,
      className
    }))} ref={ref} {...props}>
          {children}
        </Comp>;
  }

  // All other variants use 3D structure
  return <Comp className={cn(buttonVariants({
    variant,
    size,
    className
  }))} ref={ref} {...props}>
        <span className="button_top py-[13px] my-[2px] px-[26px] mx-px">
          {children}
        </span>
      </Comp>;
});
Button.displayName = "Button";
export { Button, buttonVariants };