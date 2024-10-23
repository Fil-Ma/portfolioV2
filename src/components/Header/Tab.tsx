export type TTab = {
  path: string;
  name: string;
};

const Tab = ({ path, name }: TTab) => {
  return (
    <a
      class="relative w-[120px] px-4 py-3 text-center uppercase tracking-widest no-underline after:absolute after:bottom-0 after:left-2/4 after:block after:h-[4px] after:w-0 after:content-[''] hover:after:left-0 hover:after:w-full hover:after:bg-orange-400"
      href={path}
    >
      {name}
    </a>
  );
};

export default Tab;
