import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center p-4">
      <div className="bg-[--SidebarColor] rounded-lg w-full max-w-md
                    shadow-xl border border-white/10"
           onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5
                     transition-colors text-white/70 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex justify-end gap-2 p-4 border-t border-white/10">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
