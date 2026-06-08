import RAW from "../db.json"
import { useState, useMemo } from "react";
import KPICard from "../components/KPICard";
import { COLORS, fmtPct, fmtBi, fmtBRL, fmtMes } from "../configs";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, ReferenceLine
} from "recharts";
import CustomTooltip from "../components/CustomTooltip";
import Tab from "../components/Tab";

function SecaoPerfil() {
  const comFaixa = RAW.serie_temporal.filter(d => d.fx_25 != null);

  const [metrica, setMetrica] = useState("faixa");

  const faixaLabels = [
    { key: "fx_25", name: "Até 25 anos", color: COLORS.azulClaro },
    { key: "fx_26_40", name: "26–40 anos", color: COLORS.azul },
    { key: "fx_41_60", name: "41–60 anos", color: "#e89c30" },
    { key: "fx_60", name: "Acima 60 anos", color: COLORS.vermelho },
  ];

  const ultimo = comFaixa[comFaixa.length - 1];
  const primeiro = comFaixa[0];

  const variacoes = faixaLabels.map(fl => ({
    ...fl,
    inicio: primeiro[fl.key],
    fim: ultimo[fl.key],
    delta: ((ultimo[fl.key] - primeiro[fl.key]) * 100).toFixed(1),
  }));

  return (
    <div>
      {/* Botões */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <Tab label="📊 Faixa Etária" active={metrica === "faixa"} onClick={() => setMetrica("faixa")} />
        <Tab label="⚧ Gênero" active={metrica === "genero"} onClick={() => setMetrica("genero")} />
      </div>

      {metrica === "faixa" && (
        <>
          {/* Cards de variação */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {variacoes.map(v => (
              <div key={v.key} style={{ flex: 1, minWidth: 150, background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderTop: `4px solid ${v.color}` }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{v.name}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.preto }}>{fmtPct(v.fim)}</div>
                <div style={{ fontSize: 11, color: +v.delta > 0 ? COLORS.vermelho : "#059669", fontWeight: 600 }}>
                  {+v.delta > 0 ? "▲" : "▼"} {Math.abs(+v.delta)} pp (2019→2026)
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Inadimplência por Faixa Etária (%)</h3>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Participação de cada grupo no total de inadimplentes · 2019 – 2026</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comFaixa} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} domain={[0.1, 0.42]} />
                <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {faixaLabels.map(fl => (
                  <Line key={fl.key} type="monotone" dataKey={fl.key} name={fl.name} stroke={fl.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "#fef9ef", border: "1px solid #f0d988", borderRadius: 10, padding: "14px 18px", marginTop: 16, fontSize: 13 }}>
            <strong>💡 Insight:</strong> O grupo <strong>acima de 60 anos</strong> foi o que mais cresceu em participação (+4,7 pp), enquanto jovens até 25 anos reduziram sua participação (–2,5 pp), possivelmente por maior retração no acesso ao crédito ou melhora na educação financeira.
          </div>
        </>
      )}

      {metrica === "genero" && (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderTop: `4px solid ${COLORS.vermelho}` }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Feminino (Jan/26)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.preto }}>{fmtPct(ultimo.fem_pct)}</div>
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderTop: `4px solid ${COLORS.azul}` }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Masculino (Jan/26)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.preto }}>{fmtPct(ultimo.mas_pct)}</div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Participação por Gênero (%)</h3>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>% do total de inadimplentes · 2019 – 2026</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={comFaixa} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} domain={[0.49, 0.52]} />
                <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="fem_pct" name="Feminino" stroke={COLORS.vermelho} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mas_pct" name="Masculino" stroke={COLORS.azul} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "#fef9ef", border: "1px solid #f0d988", borderRadius: 10, padding: "14px 18px", marginTop: 16, fontSize: 13 }}>
            <strong>💡 Insight:</strong> A partir de 2021, mulheres superaram os homens no total de inadimplentes, refletindo impactos desproporcionais da pandemia no mercado de trabalho feminino.
          </div>
        </>
      )}
    </div>
  );
}

export default SecaoPerfil
