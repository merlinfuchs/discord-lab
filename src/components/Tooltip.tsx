import { FunctionComponent } from "react";

const Tooltip: FunctionComponent<{ title: string; children: JSX.Element }> = ({
  children,
  title,
}) => {
  return (
    <div className="group relative cursor-pointer">
      {children}
      <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 transform group-hover:block">
        <div className="whitespace-nowrap rounded-md bg-dark-0 py-1 px-4 text-lg text-gray-300">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
