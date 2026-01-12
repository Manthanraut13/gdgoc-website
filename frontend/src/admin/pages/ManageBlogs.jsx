import { useState, useEffect } from "react";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/api";
import BlogFormModal from "../components/BlogFormModal";
import DeleteModal from "../components/DeleteModal";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleSave = async (blogObj) => {
    try {
      if (selected) {
        await updateBlog(selected._id, blogObj);
      } else {
        await createBlog(blogObj);
      }
      setOpenForm(false);
      loadBlogs();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (blog) => {
    setSelected(blog);
    setOpenForm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selected._id);
      setOpenDelete(false);
      loadBlogs();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Manage Blogs</h1>
      </div>
      <button
        style={{
          padding: '10px 16px',
          backgroundColor: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '24px'
        }}
        onClick={handleAdd}
      >
        + Add Blog
      </button>

      {loading ? (
        <p style={{ color: '#999' }}>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table style={{ width: '100%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Title</th>
              <th style={{ padding: '8px' }}>Author</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '8px' }}>{b.title}</td>
                <td style={{ padding: '8px' }}>{b.author}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelected(b);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <BlogFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        editData={selected}
      />

      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageBlogs;
