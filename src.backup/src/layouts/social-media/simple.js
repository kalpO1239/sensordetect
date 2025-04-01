import React, { useState } from "react";

function SocialMedia() {
  const [filter, setFilter] = useState("all");
  
  const posts = [
    { 
      id: 1, 
      platform: "Twitter", 
      user: "JohnDoe", 
      content: "Seeing smoke coming from the building on Main St. Anyone know what's happening? #fire #emergency", 
      timestamp: "2023-06-15 14:30", 
      location: "Downtown" 
    },
    { 
      id: 2, 
      platform: "Facebook", 
      user: "Jane Smith", 
      content: "Fire trucks rushing to Oak Avenue. Looks serious.", 
      timestamp: "2023-06-15 14:35", 
      location: "Oak District" 
    },
    { 
      id: 3, 
      platform: "Instagram", 
      user: "photo_master", 
      content: "Captured this image of smoke rising from the warehouse district. Stay safe everyone! #fire #safety", 
      timestamp: "2023-06-15 14:40", 
      location: "Warehouse District" 
    },
    { 
      id: 4, 
      platform: "Twitter", 
      user: "news_reporter", 
      content: "Breaking: Fire reported at 123 Main St. Fire department on scene. #breaking #fire", 
      timestamp: "2023-06-15 14:45", 
      location: "Downtown" 
    },
    { 
      id: 5, 
      platform: "Facebook", 
      user: "Community Watch", 
      content: "Alert: Fire reported in the downtown area. Please avoid Main St. and surrounding blocks.", 
      timestamp: "2023-06-15 14:50", 
      location: "Downtown" 
    },
  ];
  
  const filteredPosts = filter === "all" ? posts : posts.filter(post => post.platform.toLowerCase() === filter);

  return (
    <div>
      <h1>Social Media Monitoring</h1>
      <p>Track fire-related posts and mentions on social media platforms.</p>
      
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setFilter("all")} 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: filter === "all" ? "#1976d2" : "#f0f0f0", 
              color: filter === "all" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("twitter")} 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: filter === "twitter" ? "#1976d2" : "#f0f0f0", 
              color: filter === "twitter" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Twitter
          </button>
          <button 
            onClick={() => setFilter("facebook")} 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: filter === "facebook" ? "#1976d2" : "#f0f0f0", 
              color: filter === "facebook" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Facebook
          </button>
          <button 
            onClick={() => setFilter("instagram")} 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: filter === "instagram" ? "#1976d2" : "#f0f0f0", 
              color: filter === "instagram" ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Instagram
          </button>
        </div>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "15px",
            backgroundColor: "#fff"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  backgroundColor: "#e0e0e0", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  fontWeight: "bold"
                }}>
                  {post.user.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>{post.user}</div>
                  <div style={{ fontSize: "14px", color: "#757575" }}>{post.platform}</div>
                </div>
              </div>
              <div style={{ fontSize: "14px", color: "#757575" }}>{post.timestamp}</div>
            </div>
            <div style={{ marginBottom: "10px" }}>{post.content}</div>
            <div style={{ fontSize: "14px", color: "#757575" }}>Location: {post.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMedia; 