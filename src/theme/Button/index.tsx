import clsx from "clsx";
import type { ElementType } from "preact/compat";
import type { ButtonProps } from "./types";
import { sizeStyles, colorStyles } from "./styles";

const commonStyles =
  "inline-flex cursor-pointer items-center justify-center transition-all duration-300 ease-in-out disabled:cursor-default rounded-md";

function Button<E extends ElementType>({
  as,
  variant = "contained",
  color = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonProps<E>) {
  const TagName = as || "button";

  return (
    <TagName
      class={clsx(
        commonStyles,
        sizeStyles[size],
        colorStyles[variant][color],
        className,
      )}
      {...props}
    />
  );
}

export default Button;
