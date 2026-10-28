import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
export default function ConfirmDialog({
  name,
  onClose,
  onConfirm,
}: {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      title="Delete outlet?"
      subtitle="This action cannot be undone."
      onClose={onClose}
    >
      <div className="delete-warning flex gap-[12px] items-start bg-[#fff3ec] [border:1px_solid_#fbe2d3] rounded-[10px] m-[21px_27px_5px] p-[15px] text-[color:#9e613c] text-[12px] leading-[1.65]">
        <AlertTriangle size={22} />
        <span>
          You're about to permanently remove <strong>{name}</strong> and its
          saved information.
        </span>
      </div>
      <div className="modal-actions pt-[21px] mt-[23px] [border-top:1px_solid_var(--border)] flex items-center justify-end gap-[10px]">
        <button className="btn btn-outline" onClick={onClose}>
          Keep outlet
        </button>
        <button className="btn btn-danger bg-[#d6404d] text-[color:#fff]" onClick={onConfirm}>
          Delete outlet
        </button>
      </div>
    </Modal>
  );
}
