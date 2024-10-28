import { FiStar, FiArchive } from 'react-icons/fi';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NotePreview = ({ note, isMobile }) => {
  const navigate = useNavigate();

  if (!note) {
    return (
      <div className={`
        flex items-center justify-center
        ${isMobile ? 'h-[300px]' : 'h-full'}
        bg-[--bg-secondary] border-l border-white/10
      `}>
        <p className="text-white/50">Select a note to preview</p>
      </div>
    );
  }

  return (
    <div className={`
      bg-[--bg-secondary] ${isMobile ? 'h-[300px]' : 'h-full'}
      border-l border-white/10 overflow-y-auto
    `}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{note.title || 'Untitled'}</h2>
          <button
            onClick={() => navigate(`/dashboard/notes/${note.id}`)}
            className="px-3 py-1.5 bg-violet-500 rounded-lg text-sm"
          >
            Edit
          </button>
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-2 mb-4 text-sm text-white/50">
          {note.is_favorite && <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> Favorite</span>}
          {note.is_archived && <span className="flex items-center gap-1"><FiArchive className="text-blue-400" /> Archived</span>}
          <span>{format(new Date(note.updated_at), 'MMM d, yyyy')}</span>
        </div>

        {/* Note content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 whitespace-pre-wrap">{note.content || 'No content'}</p>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
