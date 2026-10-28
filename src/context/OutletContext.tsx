import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { loadOutlets, resetOutlets, saveOutlets } from "../lib/storage";
import { addToOutlets, removeFromOutlets, updateInOutlets } from "../lib/outletMutations";
import { seedOutlets } from "../data/seed";
import type { Outlet, OutletInput } from "../types";
import { useToast } from "./ToastContext";

type OutletService = {
  outlets: Outlet[];
  addOutlet: (data: OutletInput) => void;
  updateOutlet: (id: string, data: OutletInput) => void;
  deleteOutlet: (id: string) => void;
  restoreDemo: () => void;
  warning: string | null;
};

const Context = createContext<OutletService | null>(null);

export function OutletProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadOutlets);
  const [outlets, setOutlets] = useState<Outlet[]>(initial.outlets);
  const outletsRef = useRef(outlets);
  const { toast } = useToast();

  const commit = useCallback(
    (change: (current: Outlet[]) => Outlet[], success: string) => {
      const next = change(outletsRef.current);
      outletsRef.current = next;
      setOutlets(next);

      if (saveOutlets(next)) toast(success);
      else
        toast(
          `${success} Changes may not survive a reload because browser storage is unavailable.`,
          "error",
        );
    },
    [toast],
  );

  const addOutlet = useCallback(
    (data: OutletInput) => {
      const id = `OUT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
      const createdAt = new Date().toISOString();
      commit(
        (current) => addToOutlets(current, data, id, createdAt),
        "Outlet added successfully",
      );
    },
    [commit],
  );

  const updateOutlet = useCallback(
    (id: string, data: OutletInput) =>
      commit(
        (current) => updateInOutlets(current, id, data),
        "Outlet updated successfully",
      ),
    [commit],
  );

  const deleteOutlet = useCallback(
    (id: string) =>
      commit((current) => removeFromOutlets(current, id), "Outlet deleted"),
    [commit],
  );

  const restoreDemo = useCallback(() => {
    resetOutlets();
    commit(() => seedOutlets, "Sample outlets restored");
  }, [commit]);

  const value = useMemo(
    () => ({
      outlets,
      addOutlet,
      updateOutlet,
      deleteOutlet,
      restoreDemo,
      warning: initial.warning,
    }),
    [outlets, addOutlet, updateOutlet, deleteOutlet, restoreDemo, initial.warning],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useOutlets = () => {
  const value = useContext(Context);
  if (!value) throw new Error("useOutlets requires OutletProvider");
  return value;
};
