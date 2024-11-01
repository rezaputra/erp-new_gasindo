import { create } from "zustand";

type FormScaleStore = {
   isOpen: boolean;
   setOpen: (open: boolean) => void;
};

export const useFormPurScaleEntryStore = create<FormScaleStore>((set) => ({
   isOpen: false,
   setOpen: (open) => set({ isOpen: open }),
}));


export const useFormPurScaleExitStore = create<FormScaleStore>((set) => ({
   isOpen: false,
   setOpen: (open) => set({ isOpen: open }),
}));
