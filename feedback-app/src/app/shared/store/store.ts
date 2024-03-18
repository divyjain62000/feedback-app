import { create } from 'zustand';
import { produce } from 'immer';


interface StoreState {
  pageTitle: string | null,
  isPreLoading: boolean,
}

interface StoreActions {
  set: (fn: (draftState: StoreState) => void) => void;
}


const useStore = create<StoreState & StoreActions>((set) => ({
  pageTitle: null,
  isPreLoading: false,
  set: (fn) => set(produce(fn)),
}));

export const setStore = useStore.setState
export default useStore;