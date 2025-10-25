"use client";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-[400px]">
        {title && <h2 className="font-semibold mb-2">{title}</h2>}
        {children}
        <button
          className="mt-3 w-full bg-neutral-200 text-sm py-1 rounded"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
