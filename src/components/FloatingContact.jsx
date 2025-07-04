import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const iconStyle = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  position: "relative",
};

const tooltipStyle = {
  position: "absolute",
  right: 60,
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.85)",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: 6,
  fontSize: 14,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  transition: "opacity 0.2s",
  zIndex: 10000,
};

const containerStyle = {
  position: "fixed",
  right: 24,
  bottom: 80,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function FloatingContact() {
  const [info, setInfo] = useState(null);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    fetch("https://shoptaycambe-cf80e6e75521.herokuapp.com/api/config")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error("Lỗi lấy thông tin liên hệ:", err));
  }, []);

  if (!info) return null;

  return (
    <div style={containerStyle}>
      {/* Phone */}
      {info.phone && (
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered("phone")}
          onMouseLeave={() => setHovered("")}
        >
          <a
            href={`tel:${info.phone}`}
            style={{
              ...iconStyle,
              transform: hovered === "phone" ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === "phone"
                  ? "0 4px 16px rgba(37,211,102,0.25)"
                  : iconStyle.boxShadow,
            }}
            title="Gọi điện"
            rel="noopener noreferrer"
          >
            <FaPhoneAlt size={28} color="#25d366" />
          </a>
          <div
            style={{
              ...tooltipStyle,
              opacity: hovered === "phone" ? 1 : 0,
            }}
          >
            Gọi ngay: {info.phone}
          </div>
        </div>
      )}
      {/* Zalo */}
      {info.socialLinks?.zalo && (
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered("zalo")}
          onMouseLeave={() => setHovered("")}
        >
          <a
            href={info.socialLinks.zalo}
            style={{
              ...iconStyle,
              transform: hovered === "zalo" ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === "zalo"
                  ? "0 4px 16px rgba(0,104,255,0.25)"
                  : iconStyle.boxShadow,
            }}
            title="Chat Zalo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiZalo size={28} color="#0068ff" />
          </a>
          <div
            style={{
              ...tooltipStyle,
              opacity: hovered === "zalo" ? 1 : 0,
            }}
          >
            Chat Zalo
          </div>
        </div>
      )}
      {/* Messenger */}
      {info.socialLinks?.facebook && (
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered("messenger")}
          onMouseLeave={() => setHovered("")}
        >
          <a
            href={info.socialLinks.facebook.replace("facebook.com", "m.me")}
            style={{
              ...iconStyle,
              transform: hovered === "messenger" ? "scale(1.12)" : "scale(1)",
              boxShadow:
                hovered === "messenger"
                  ? "0 4px 16px rgba(0,132,255,0.25)"
                  : iconStyle.boxShadow,
            }}
            title="Chat Messenger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookMessenger size={28} color="#0084ff" />
          </a>
          <div
            style={{
              ...tooltipStyle,
              opacity: hovered === "messenger" ? 1 : 0,
            }}
          >
            Chat Messenger
          </div>
        </div>
      )}
    </div>
  );
} 