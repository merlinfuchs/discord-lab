import React, { FC, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { env } from "../../env/client.mjs";

const EmbedLinkCreator: FC<{
  placeholder: string;
  prefix?: string;
}> = ({ placeholder, prefix }) => {
  const [value, setValue] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  function handleCopy() {
    setButtonText("Copied");
    setTimeout(() => setButtonText("Copy"), 1000);
  }

  function valueLink() {
    return `${env.NEXT_PUBLIC_PUBLIC_BASE_URL}${prefix || ""}/${value}`;
  }

  return (
    <div className="flex flex-col text-lg sm:flex-row">
      <div className="mb-2 flex flex-auto sm:mb-0">
        <div className="rounded-l-md bg-dark-4 px-3 py-2 text-gray-300">
          {env.NEXT_PUBLIC_PUBLIC_BASE_URL}
          {prefix}/
        </div>
        <input
          type="text"
          className="min-w-0 flex-auto rounded-r-md bg-dark-5 px-3 py-2 sm:rounded-r-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex flex-shrink-0">
        <CopyToClipboard text={valueLink()} onCopy={handleCopy}>
          <button className="w-24 flex-grow rounded-md bg-green-500 py-2 hover:bg-green-400 sm:flex-grow-0 sm:rounded-l-none sm:rounded-r-md">
            {buttonText}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default EmbedLinkCreator;
