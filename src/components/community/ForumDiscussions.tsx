
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Flag, Send } from "lucide-react";

type ForumPost = {
  id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  createdAt: string;
  isLiked: boolean;
};

const defaultPosts: ForumPost[] = [
  {
    id: "post-1",
    author: "Alex Johnson",
    title: "Tips for Calculus Final Exam",
    content: "I'm preparing for the calculus final and wanted to share some resources I found helpful...",
    category: "Mathematics",
    likes: 24,
    replies: 8,
    createdAt: "2025-04-11T15:32:00Z",
    isLiked: false,
  },
  {
    id: "post-2",
    author: "Jamie Smith",
    title: "Literature Analysis Study Group",
    content: "Looking for peers interested in forming a study group for our Shakespeare analysis project...",
    category: "Literature",
    likes: 15,
    replies: 12,
    createdAt: "2025-04-12T09:15:00Z",
    isLiked: false,
  },
  {
    id: "post-3",
    author: "Morgan Lee",
    title: "Computer Science Project Collaboration",
    content: "Anyone interested in collaborating on the upcoming CS database project? I have experience with SQL...",
    category: "Computer Science",
    likes: 32,
    replies: 17,
    createdAt: "2025-04-13T14:45:00Z",
    isLiked: false,
  },
];

type ForumDiscussionsProps = {
  onNewPost: () => void;
};

const ForumDiscussions = ({ onNewPost }: ForumDiscussionsProps) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    // Load posts from localStorage or use defaults
    const savedPosts = localStorage.getItem("forumPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
    }
  }, []);

  useEffect(() => {
    // Save posts to localStorage whenever they change
    if (posts.length > 0) {
      localStorage.setItem("forumPosts", JSON.stringify(posts));
    }
  }, [posts]);

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")!).email.split("@")[0] 
        : "Anonymous User",
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
    };
    
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostCategory("General");
    setShowNewPostForm(false);
    onNewPost();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Discussions</h3>
        <Button onClick={() => setShowNewPostForm(!showNewPostForm)}>
          {showNewPostForm ? "Cancel" : "Create Post"}
        </Button>
      </div>

      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="bg-white dark:bg-universe-800 p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mb-2"
            />
            <textarea
              placeholder="What would you like to share or ask?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full h-24 p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="p-2 border rounded-md bg-background text-sm"
            >
              <option value="General">General</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Literature">Literature</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="History">History</option>
            </select>
            
            <Button type="submit">
              Post <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-universe-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between">
              <Badge variant="outline" className="mb-2">
                {post.category}
              </Badge>
              <span className="text-sm text-universe-500">
                {formatDate(post.createdAt)}
              </span>
            </div>
            
            <h3 className="font-medium text-lg mb-1">{post.title}</h3>
            <p className="text-sm text-universe-600 dark:text-universe-300 mb-2">
              {post.content}
            </p>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-universe-500">Posted by {post.author}</span>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center ${
                    post.isLiked ? "text-primary" : "text-universe-500"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{post.likes}</span>
                </button>
                
                <div className="flex items-center text-universe-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{post.replies}</span>
                </div>
                
                <button className="text-universe-500">
                  <Flag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumDiscussions;
