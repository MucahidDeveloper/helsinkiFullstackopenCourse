// components/Notification.jsx
const Notification = ({ message, type }) => {
  if (!message) return null;

  const style = {
    border: "1px solid",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    color: type === "error" ? "red" : "green",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
