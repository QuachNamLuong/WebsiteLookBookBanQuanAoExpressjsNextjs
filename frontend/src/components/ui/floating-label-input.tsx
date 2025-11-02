import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn(
            "peer w-full border-0 bg-transparent pt-5 pb-2 text-[#f2f3dc] placeholder-transparent focus:outline-none rounded-none",
            className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(
        "absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all " +
          "peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc] " +
          "peer-focus:top-1 peer-focus:text-sm peer-focus:text-white",
        className
      )}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
  React.ComponentRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
