import MobileMenuIcon from "@assets/icons/MobileMenuIcon";
import type { TTab } from "./Tab";
import IconButton from "@theme/IconButton";

const MobileNav = ({ tabs }: { tabs: TTab[] }) => {
  return (
    <div class="mt-2 block sm:hidden">
      <IconButton className="ml-4">
        <MobileMenuIcon />
      </IconButton>
    </div>
  );
};

export default MobileNav;
