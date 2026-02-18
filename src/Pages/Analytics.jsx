import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../component/Navbar";
import "./Analytics.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 5;

  // ✅ Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ✅ Chart Data (Posts per Author)
  const chartData = useMemo(() => {
    const authorCount = {};

    posts.forEach((post) => {
      const author = post.author || "Unknown";
      authorCount[author] = (authorCount[author] || 0) + 1;
    });

    return Object.keys(authorCount).map((author) => ({
      name: author,
      posts: authorCount[author],
    }));
  }, [posts]);

  // ✅ Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#ffbb28", "#ff8042", "#a855f7", "#ef4444"];

  // ✅ Fetch posts from json-server
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Edit function
  const handleEdit = (id) => {
    alert("Edit post ID: " + id);
  };

  // ✅ Delete function
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="analytics-page">
      <Navbar />

      <main className="analytics-main">
        {/* Header */}
        <header className="analytics-header">
          <h1>Blog Analytics</h1>
          <p>Insights into your blog's performance and activity</p>
        </header>

        {/* Charts Section */}
        <div className="charts-container">

          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Posts per Author</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3>Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="posts"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Table Section */}
        <div className="posts-table-section">
          <h3>All Posts</h3>

          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.author || "Unknown"}</td>
                      <td>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(post.id)}
                        >
                          ✏️
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(post.id)}
                        >
                          🗑️
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">

              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`page-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>

            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default Analytics;