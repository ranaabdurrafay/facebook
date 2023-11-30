import React, { useState } from 'react';
import Post from './Post';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';

function App() {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  const handlePostSubmit = () => {
    if ((newPost.trim() !== '' || newImage.trim() !== '') && selectedEmoji !== '') {
      if (editPostId !== null) {
        // Edit existing post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editPostId
              ? { ...post, text: newPost, image: newImage, emoji: selectedEmoji }
              : post
          )
        );
        setEditPostId(null);
      } else {
        // Create new post
        setPosts([...posts, { id: Date.now(), text: newPost, image: newImage, emoji: selectedEmoji }]);
      }
      setNewPost('');
      setNewImage('');
      setSelectedEmoji('');
    } else {
      alert("Please enter text, an image URL, and select an emoji before posting.");
    }
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handlePostEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setNewPost(postToEdit.text);
      setNewImage(postToEdit.image || ''); // Handle the case where image is undefined
      setSelectedEmoji(postToEdit.emoji);
      setEditPostId(postId);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setSelectedEmoji(emojiData.unified);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-blue-900 mt-10">
      <h1 className="text-3xl mb-4 text-white">Facebook Clone with Stickers</h1>
      <div className=" p-4 rounded-lg shadow mb-4 bg-green-700">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full p-2 mb-2 rounded border"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full p-2 mb-2 rounded border"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={handlePostSubmit}
        >
          {editPostId !== null ? 'Update' : 'Post'}
        </button>
      </div>
      <div className="space-y-4 bg-red-900">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            text={post.text}
            image={post.image}
            emoji={post.emoji}
            onDelete={handlePostDelete}
            onEdit={handlePostEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
