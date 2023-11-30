import React from 'react';

const Post = ({ id, text, image, emoji, onDelete, onEdit }) => {
  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{text}</span>
        <div className="flex">
          {onEdit && (
            <button
              className="text-blue-500 hover:text-blue-700 mr-2 bg-[#873260] w-[25]%"
              onClick={() => onEdit(id)}
            >
              Edit
            </button>
          )}
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      {image && <img src={image} alt="Post" className="mb-2 rounded-lg" />}
      {emoji && (
        <span role="img" aria-label="Emoji" className="text-2xl">
          {String.fromCodePoint(parseInt(emoji, 16))}
        </span>
      )}
    </div>
  );
};

export default Post;
