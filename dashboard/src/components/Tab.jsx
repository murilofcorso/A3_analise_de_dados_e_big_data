import { COLORS } from "../configs";

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: active ? 700 : 500, background: active ? COLORS.azul : "transparent", color: active ? "#fff" : "#555", transition: "all .2s", fontSize: 13 }}>
      {label}
    </button>
  );
}

export default Tab
