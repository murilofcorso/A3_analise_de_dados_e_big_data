import { COLORS, fmtMes } from "../configs";

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid #e5e7eb`, borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: COLORS.preto }}>{fmtMes(label) || label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, display: "inline-block" }} />
          <span style={{ color: "#555" }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: COLORS.preto }}>{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip
