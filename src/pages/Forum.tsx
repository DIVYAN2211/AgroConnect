import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPosts, createPost, addComment, deletePost, deleteComment } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
const FORUM_BG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6Iw91SNCBjHMh4d3oqhoHBOAi4C4zVrZ0w&s';
type Comment = {
  text: string;
  createdAt: string;
  username: string;
};

type Post = {
  _id: string;
  text: string;
  image?: string;
  createdAt: string;
  username: string;
  comments: Comment[];
};

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const loadPosts = async () => {
    const res = await fetchPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async () => {
    if (!text.trim() || !user) return;
    const formData = new FormData();
    formData.append("text", text);
    formData.append("username", user.name);
    if (image) formData.append("image", image);
    await createPost(formData);
    setText("");
    setImage(null);
    loadPosts();
  };

  const handleComment = async (postId: string) => {
    if (!commentText[postId] || !user) return;
    await addComment(postId, commentText[postId], user.name);
    setCommentText({ ...commentText, [postId]: "" });
    loadPosts();
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await deletePost(postId);
    loadPosts();
  };

  const handleDeleteComment = async (postId: string, commentIndex: number) => {
    await deleteComment(postId, commentIndex);
    loadPosts();
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-2 md:px-0"
      style={{ backgroundImage: `url('${FORUM_BG}')` }}
    >
      <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6">Agri Community Board 🌱</h1>

        {/* Post form */}
        {user ? (
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <textarea
              placeholder="Share your farming tips or questions..."
              className="w-full border rounded p-2 mb-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mb-2"
            />
            <Button onClick={handlePost}>Post</Button>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            Please log in to create posts and comments.
          </div>
        )}

        {/* Posts Feed */}
        {posts.map((post) => (
          <Card key={post._id} className="mb-6 relative">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">{post.username}</CardTitle>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                {user && user.name === post.username && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    title="Delete Post"
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                    aria-label={`Delete post ${post._id}`}
                  >
                    &times;
                  </button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <p className="mb-2">{post.text}</p>
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image.startsWith('/uploads') ? post.image : '/uploads/' + post.image}`}
                  alt="Post"
                  className="rounded mb-2 max-h-60 object-cover"
                />
              )}

              {/* Comments */}
              <div className="ml-2 mt-4 space-y-2">
                <p className="font-semibold">Comments:</p>
                {post.comments.map((c, i) => (
                  <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="font-semibold">{c.username}</span>: {c.text}{" "}
                    <span className="text-xs text-gray-500">
                      ({new Date(c.createdAt).toLocaleString()})
                    </span>
                    {user && user.name === c.username && (
                      <button
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Delete Comment"
                        onClick={() => handleDeleteComment(post._id, i)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              {user && (
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({ ...commentText, [post._id]: e.target.value })
                    }
                  />
                  <Button onClick={() => handleComment(post._id)}>Send</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;

