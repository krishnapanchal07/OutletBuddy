import { useState } from "react";
import type { Outlet, OutletInput } from "../types";
import { useOutlets } from "../context/OutletContext";
import OutletForm from "../components/outlets/OutletForm";
import OutletDrawer from "../components/outlets/OutletDrawer";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export function useOutletDialogs() {
  const { addOutlet, updateOutlet, deleteOutlet } = useOutlets();
  const [form, setForm] = useState<Outlet | "new" | null>(null);
  const [details, setDetails] = useState<Outlet | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Outlet | null>(null);
  const create = () => {
    setDetails(null);
    setForm("new");
  };
  const view = (outlet: Outlet) => {
    setForm(null);
    setDetails(outlet);
  };
  const edit = (outlet: Outlet) => {
    setDetails(null);
    setForm(outlet);
  };
  const remove = (outlet: Outlet) => {
    setDetails(null);
    setDeleteTarget(outlet);
  };
  const handleSave = (data: OutletInput) => {
    if (form && form !== "new") updateOutlet(form.id, data);
    else addOutlet(data);
    setForm(null);
  };
  const dialogs = (
    <>
      {form && (
        <OutletForm
          outlet={form === "new" ? undefined : form}
          onClose={() => setForm(null)}
          onSave={handleSave}
        />
      )}
      {details && (
        <OutletDrawer
          outlet={details}
          onClose={() => setDetails(null)}
          onEdit={() => edit(details)}
          onDelete={() => remove(details)}
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          name={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteOutlet(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </>
  );
  return { create, view, edit, remove, dialogs };
}
