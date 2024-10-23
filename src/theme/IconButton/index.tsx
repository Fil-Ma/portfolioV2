import clsx from "clsx";
import type { ComponentProps } from "preact";

interface IconButtonProps extends Omit<ComponentProps<"button">, "class"> {
  className?: string;
}

const IconButton = ({ className, ...props }: IconButtonProps) => {
  return (
    <button
      class={clsx(
        "flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-400 hover:shadow-lg active:translate-y-0.5 active:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100",
        className,
      )}
      {...props}
    ></button>
  );
};

export default IconButton;
