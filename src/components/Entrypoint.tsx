import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./Buttons";
import { useCardActions } from "../libs/hooks";

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [revealed, setRevealed] = useState<Boolean>(false);
  const listQuery = useGetListData();
  const {
    handleExpandCollapse,
    deletedCards,
    awesomeListCards,
    deleteCard,
    expandedCardsIds,
  } = useCardActions(visibleCards);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex w-full justify-center  gap-x-16">
      <div className="flex flex-col w-full max-w-xl ">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({awesomeListCards.length})
          </h1>
          <ToggleButton onClick={() => listQuery.refetch()}>
            Refresh
          </ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3">
          {awesomeListCards.map((card) => (
            <Card
              key={card.id}
              handleDelete={() => deleteCard(card.id)}
              handleExpandCollapse={() => handleExpandCollapse(card.id)}
              isExpanded={expandedCardsIds.includes(card.id)}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton onClick={() => setRevealed((prev) => !prev)}>
            Reveal
          </ToggleButton>
        </div>
        {revealed && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <Card key={card.id} isDeleted title={card.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
