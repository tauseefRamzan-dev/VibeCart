import React, { useState, useRef, useEffect } from "react";
import { FloatButton, Card, Input, Button, Avatar, Typography, Space } from "antd";
import { MessageOutlined, CloseOutlined, SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem("vibe_chat_messages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: 1,
            role: "assistant",
            content: "Hello! Vibe Cart AI Assistant here. How can I help you today?",
          },
        ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("vibe_chat_messages", JSON.stringify(messages));
  }, [messages]);

  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input || !input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    const newUserMessage = { id: Date.now(), role: "user", content: userText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");

      const response = await fetch(`${import.meta.env.VITE_apiURL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();
      const botReply = data.content || "I am here to assist you with VibeCart!";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Sorry, I am having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Text formatter for bold and bullets
  const renderFormattedContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      let cleanLine = isBullet ? line.trim().substring(2) : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={partIdx} style={{ fontWeight: 600, color: "#212529" }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <div
          key={lineIdx}
          style={{
            wordBreak: "break-word",
            fontSize: "13.5px",
            lineHeight: "1.5",
            marginBottom: isBullet ? "4px" : "2px",
            paddingLeft: isBullet ? "8px" : "0",
          }}
        >
          {isBullet && <span style={{ marginRight: "6px", fontWeight: "bold", color: "#0d6efd" }}>•</span>}
          {parsedLine}
        </div>
      );
    });
  };

  return (
    // 🟢 Bootstrap positioning classes for responsive placement across devices
    <div style={{ position: "fixed", bottom: "56px", right: "24px", zIndex: 1050 }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <FloatButton
          icon={<MessageOutlined style={{ fontSize: "24px", color: "#fff" }} />}
          type="primary"
          style={{
            width: 55,
            height: 55,
            background: "#0d6efd",
            boxShadow: "0 8px 20px rgba(13, 110, 253, 0.4)",
          }}
          onClick={() => setIsOpen(true)}
          tooltip={<div>Chat with VibeCart AI</div>}
        />
      )}

      {/* Fully Responsive Chat Window Card */}
      {isOpen && (
        <Card
          className="shadow-lg border-0"
          style={{
            width: "360px",
            maxWidth: "calc(100vw - 32px)", // Mobile screens par overflow rokne ke liye
            height: "450px",
            maxHeight: "calc(100vh - 100px)", // Small screens par height adjust karne ke liye
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          styles={{ body: { display: "flex", flexDirection: "column", height: "100%", padding: 0 } }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0d6efd",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <Space size={10}>
              <Avatar icon={<RobotOutlined />} style={{ backgroundColor: "#fff", color: "#0d6efd" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.2" }}>Vibe Cart Assistant</div>
                <Text style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.8)" }}>Live Store & Order Tracking</Text>
              </div>
            </Space>
            <Button
              type="text"
              icon={<CloseOutlined style={{ color: "#fff", fontSize: "16px" }} />}
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              background: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  {!isUser && (
                    <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: "#0d6efd", marginTop: 4 }} />
                  )}
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: isUser ? "#0d6efd" : "#ffffff",
                      color: isUser ? "#fff" : "#212529",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                      border: isUser ? "none" : "1px solid #e9ecef",
                    }}
                  >
                    <div className="fw-semibold mb-1 opacity-75" style={{ fontSize: "10px" }}>
                      {isUser ? "You" : "Vibe AI"}
                    </div>
                    <div>{renderFormattedContent(m.content)}</div>
                  </div>
                  {isUser && (
                    <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: "#198754", marginTop: 4 }} />
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: "#0d6efd" }} />
                <div
                  style={{
                    padding: "8px 12px",
                    background: "#fff",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#6c757d",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <span className="spinner-grow spinner-grow-sm me-2 text-primary" role="status" />
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div style={{ padding: "10px 12px", background: "#fff", borderTop: "1px solid #e9ecef" }}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={handleSendMessage}
                placeholder="Ask about products, prices, or orders..."
                size="large"
                style={{ borderRadius: "20px 0 0 20px", fontSize: "13px" }}
                disabled={loading}
              />
              <Button
  type="primary"
  size="large"
  icon={<SendOutlined />}
  onClick={handleSendMessage}
  disabled={loading || !input.trim()}
  style={{ background: "#0d6efd", borderRadius: "0 20px 20px 0" }} // height: "40px" yahan se hata diya
/>
            </Space.Compact>
          </div>
        </Card>
      )}
    </div>
  );
}