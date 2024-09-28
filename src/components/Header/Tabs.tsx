import type { TTab } from "./Tab";
import Tab from "./Tab";

const Tabs = ({ tabs }: { tabs: TTab[] }) => {
  return (
    <nav class="flex list-none flex-row items-center justify-start">
      {tabs.map((t) => (
        <Tab {...t} />
      ))}
    </nav>
  );
};

export default Tabs;
