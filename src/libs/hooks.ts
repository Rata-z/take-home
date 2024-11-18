import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { ListItem, DeletedListItem } from "../api/getListData";
import { useListStore } from "../store";

export const useCardActions = (visibleCards: ListItem[]) => {
  // Using useShallow to prevent unnecessary rerenders
  const {
    deleteCard,
    expandCard,
    collapseCard,
    expandedCardsIds,
    deletedCardsIds,
  } = useListStore(
    useShallow((state) => ({
      deleteCard: state.deleteCard,
      expandCard: state.expandCard,
      collapseCard: state.collapseCard,
      expandedCardsIds: state.expandedCardsIds,
      deletedCardsIds: state.deletedCardsIds,
    }))
  );

  const handleExpandCollapse = (id: number) => {
    expandedCardsIds.includes(id) ? collapseCard(id) : expandCard(id);
  };

  //Same with useMemo

  const {
    deletedCards,
    awesomeListCards,
  }: { deletedCards: DeletedListItem[]; awesomeListCards: ListItem[] } =
    useMemo(() => {
      const deletedList = visibleCards.filter((card) =>
        deletedCardsIds.includes(card.id)
      );
      const awesomeList = visibleCards.filter(
        (card) => !deletedCardsIds.includes(card.id)
      );
      return {
        deletedCards: deletedList.map(({ description, ...rest }) => rest),
        awesomeListCards: awesomeList,
      };
    }, [visibleCards, deletedCardsIds]);

  return {
    handleExpandCollapse,
    deletedCards,
    awesomeListCards,
    deleteCard,
    expandedCardsIds,
  };
};
