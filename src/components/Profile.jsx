import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    occupation: "",
    accountType: ""
  });

  // Fetch profile
  useEffect(() => {
    if (!storedUser?.userId) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7218/api/Users/GetById${storedUser.userId}`
        );

        setUser(res.data);
        setFormData({
          phone: res.data.phone,
          email: res.data.email, 
          
          password: "",
          occupation: res.data.occupation,
          accountType: res.data.accountType
        });
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [storedUser?.userId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "https://localhost:7218/api/Users/Update",
        {
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          occupation: formData.occupation,
          accountType: formData.accountType
        },
        {
          params: {
            AccountNumber: user.accountNumber
          }
        }
      );

      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Profile update failed");
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {/* PROFILE VIEW */}
      {!editMode && (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Account Number:</strong> {user.accountNumber}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Type:</strong> {user.accountType}</p>
          <p><strong>Occupation:</strong> {user.occupation}</p>

          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}

      {/* EDIT FORM */}
      {editMode && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave empty to keep same"
          />

          <label>Occupation</label>
          <input
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />

          {/* <label>Account Type</label>
          <input
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
          /> */}
          <label>Account Type</label>
           <select  name="AccountType" value={formData.accountType} onChange={handleChange} style={{}}>
                <option>Salary</option>
                <option>Savings</option>
                <option>Current</option>
                <option>Zero Account</option>
            </select><br></br>

          <div className="form-actions">
            <button type="submit">Update</button>
            <button
              type="button"
              className="cancel"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
