import { COLORS } from "../configs";

function KPICard({ label, value, sub, color = COLORS.azul, icon }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", borderLeft: `4px solid ${color}`, flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{icon} {label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.preto, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default KPICard
