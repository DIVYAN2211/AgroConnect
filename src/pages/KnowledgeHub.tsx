import React, { useEffect, useState } from 'react';
import {
  fetchKnowledge,
  addKnowledge,
  likeKnowledge,
  deleteKnowledge,
} from '../lib/api';

const KNOWLEDGE_BG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6Iw91SNCBjHMh4d3oqhoHBOAi4C4zVrZ0w&s';

interface Knowledge {
  _id: string;
  title: string;
  category: string;
  content: string;
  author?: string;
  likes: number;
  createdAt: string;
}

const categories = ['All', 'Crop Management', 'Pest Control', 'Soil Care', 'Organic Farming'];

const KnowledgeHub: React.FC = () => {
  const [knowledgeList, setKnowledgeList] = useState<Knowledge[]>([]);
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState({
    title: '',
    category: 'Crop Management',
    content: '',
    author: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const data = await fetchKnowledge(category === 'All' ? undefined : category);
      setKnowledgeList(data.data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, [category]);

  const handleLike = async (id: string) => {
    try {
      const result = await likeKnowledge(id);
      setKnowledgeList((prev) =>
        prev.map((item) => (item._id === id ? { ...item, likes: result.data.likes } : item))
      );
    } catch {
      alert('Failed to like the article');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await deleteKnowledge(id);
      loadKnowledge();
    } catch {
      alert('Failed to delete');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert('Title and Content are required.');
      return;
    }
    try {
      await addKnowledge(form);
      alert('Knowledge entry added!');
      setForm({ title: '', category: 'Crop Management', content: '', author: '' });
      loadKnowledge();
    } catch {
      alert('Failed to add knowledge entry');
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-2 md:px-0"
      style={{ backgroundImage: `url('${KNOWLEDGE_BG}')` }}
    >
      <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-agrogreen-700 mb-6 text-center drop-shadow-lg">🌾 Knowledge Hub</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <label className="font-semibold text-agrogreen-700">
              Filter by Category:{' '}
              <select
                className="rounded border px-2 py-1 ml-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {loading && <p className="text-center text-gray-500">Loading knowledge...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <ul className="space-y-6 mb-8">
          {knowledgeList.map(({ _id, title, category, content, author, likes }) => (
            <li
              key={_id}
              className="bg-gradient-to-br from-green-50 to-white border border-agrogreen-100 rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-agrogreen-800">{title}</h3>
                <span className="text-xs bg-agrogreen-100 text-agrogreen-700 px-2 py-1 rounded-full">
                  {category}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By: {author || 'Anonymous'}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded bg-agrogreen-100 text-agrogreen-700 hover:bg-agrogreen-200 transition"
                    onClick={() => handleLike(_id)}
                  >
                    👍 {likes}
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-agrogreen-50 rounded-xl p-6 shadow-inner mt-8">
          <h2 className="text-2xl font-bold text-agrogreen-700 mb-4">Add New Knowledge Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400"
            >
              {categories.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={5}
              className="w-full p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400"
              required
            />
            <input
              type="text"
              placeholder="Author (optional)"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400"
            />
            <button
              type="submit"
              className="w-full bg-agrogreen-600 hover:bg-agrogreen-700 text-white font-bold py-3 rounded transition"
            >
              Add Entry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
