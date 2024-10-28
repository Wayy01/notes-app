const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', danger = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center p-4">
      <div className="bg-[--SidebarColor] rounded-lg w-full max-w-md
                    shadow-xl border border-white/10 animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-white/70">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md hover:bg-white/5
                     transition-colors text-white/70"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-md transition-colors
                     ${danger
                       ? 'bg-[--danger-color] hover:bg-[--danger-hover]'
                       : 'bg-[--accent-color] hover:bg-[--accent-hover]'
                     }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
