import { useEffect } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * Lightweight bottom-sheet primitive (no external libs).
 * - Scrim / backdrop (tap to close)
 * - Grabber handle
 * - Close button
 * - ESC to close
 * Presentation-only: contains no feature logic.
 */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    // Prevent background scroll while the sheet is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="bottom-sheet-scrim"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Menu'}
      onClick={onClose}
    >
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="bottom-sheet-grabber" />
        <div className="bottom-sheet-header">
          <span className="bottom-sheet-title">{title}</span>
          <button className="bottom-sheet-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="bottom-sheet-body">{children}</div>
      </div>
    </div>
  );
}
