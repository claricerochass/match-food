import React from "react";
import { Flame, Map, MessageCircle, User } from "lucide-react";

function BottomNav({ activeTab = "swipe" }) {
  return (
    <nav className="bottom-nav">
      <a
        href="#swipe"
        className={`nav-link ${activeTab === "swipe" ? "active" : ""}`}
      >
        <div className="relative p-1">
          <Flame
            size={28}
            fill={activeTab === "swipe" ? "currentColor" : "none"}
          />
          {activeTab === "swipe" && <div className="active-indicator"></div>}
        </div>
      </a>

      <a
        href="#explore"
        className={`nav-link ${activeTab === "explore" ? "active" : ""}`}
      >
        <div className="nav-icon">
          <Map size={28} />
        </div>
      </a>

      <a
        href="#messages"
        className={`nav-link ${activeTab === "messages" ? "active" : ""}`}
      >
        <div className="nav-icon relative">
          <MessageCircle size={28} />
          <span className="badge-count">3</span>
        </div>
      </a>

      <a
        href="#profile"
        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
      >
        <div className="nav-icon">
          <User size={28} />
        </div>
      </a>
    </nav>
  );
}

export default BottomNav;
