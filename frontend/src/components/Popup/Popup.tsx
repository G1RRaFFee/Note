import React, { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Popup: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("keydown", handleEscape);
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener("keydown", handleEscape);
      }
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && event.target === dialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleOverlayClick}
      style={{
        padding: "20px",
        borderRadius: "8px",
        border: "none",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        width: "100%",
        position: "relative",
      }}
    >
      {children}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
    </dialog>
  );
};
