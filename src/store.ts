import { create } from "zustand";

// If "Refreshing" in this task means just manual refetching, then this setup should be enough. But if we want to achieve data persistency after page refresh we could use LocalStorage or cookies.

type State = {
  deletedCardsIds: number[];
  expandedCardsIds: number[];
};

type Actions = {
  deleteCard: (deletedCardId: number) => void;
  expandCard: (expandedCardId: number) => void;
  collapseCard: (collapsedCardId: number) => void;
};

export const useListStore = create<State & Actions>((set) => ({
  deletedCardsIds: [],
  expandedCardsIds: [],

  // Using Set to prevent duplicated ids

  deleteCard: (deletedCardId) =>
    set((state) => ({
      deletedCardsIds: Array.from(
        new Set([...state.deletedCardsIds, deletedCardId])
      ),
    })),
  expandCard: (expandedCardId) =>
    set((state) => ({
      expandedCardsIds: Array.from(
        new Set([...state.expandedCardsIds, expandedCardId])
      ),
    })),
  collapseCard: (collapsedCardId) =>
    set((state) => ({
      expandedCardsIds: state.expandedCardsIds.filter(
        (id) => id !== collapsedCardId
      ),
    })),
}));
