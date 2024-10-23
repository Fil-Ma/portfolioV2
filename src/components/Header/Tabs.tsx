import type { TTab } from "./Tab";
import Tab from "./Tab";

const Tabs = ({ tabs }: { tabs: TTab[] }) => {
  return (
    <nav class="hidden list-none flex-row items-center justify-start sm:flex">
      {tabs.map((t) => (
        <Tab {...t} />
      ))}
    </nav>
  );
};

export default Tabs;
