import { FC, memo, useEffect, useRef } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon } from "./icons";
import autoAnimate from "@formkit/auto-animate";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  handleDelete?: () => void;
  handleExpandCollapse?: () => void;
  isDeleted?: boolean;
  isExpanded?: boolean;
};

export const Card: FC<CardProps> = memo(
  ({
    title,
    description,
    handleDelete,
    handleExpandCollapse,
    isDeleted = false,
    isExpanded = true,
  }) => {
    const parent = useRef(null);

    useEffect(() => {
      parent.current && autoAnimate(parent.current);
    }, [parent]);

    if (isDeleted) {
      return (
        <div className="border w-full border-black px-2 py-1.5">
          <h1 className="font-medium">{title}</h1>
        </div>
      );
    }
    return (
      <div ref={parent} className="border border-black px-2 py-1.5">
        <div className=" flex w-full justify-between mb-0.5">
          <h1 className="font-medium">{title}</h1>

          <div className="flex">
            <ExpandButton onClick={handleExpandCollapse}>
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
            <DeleteButton onClick={handleDelete} />
          </div>
        </div>
        {isExpanded && <p className="text-sm">{description}</p>}
      </div>
    );
  }
);
