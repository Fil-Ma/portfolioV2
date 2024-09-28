import type { TTab } from "./Tab";
import Tabs from "./Tabs";

const tabs: TTab[] = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/projects", name: "projects" },
  { path: "/blog", name: "blog" },
];

const Header = () => {
  return (
    <header>
      <Tabs tabs={tabs} />
    </header>
  );
};

export default Header;
