import type { ReactNode } from "preact/compat";

const HiddenWrapper = ({
  hidden,
  children,
}: {
  hidden: boolean;
  children: ReactNode;
}) => {
  if (hidden) return null;

  return children;
};

export default HiddenWrapper;
