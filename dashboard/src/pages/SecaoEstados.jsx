import RAW from "../db.json"
import { useState, useMemo } from "react";
import KPICard from "../components/KPICard";
import { COLORS, REGIAO_CORES, fmtPct, fmtBi, fmtBRL, fmtMes } from "../configs";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, ReferenceLine
} from "recharts";
import CustomTooltip from "../components/CustomTooltip";
import Tab from "../components/Tab";


function SecaoEstados() {
  const dados = RAW.estados_2026;
  const [ordenar, setOrdenar] = useState("proporcao");
  const [regiaoFiltro, setRegiaoFiltro] = useState("Todos");
  const [destaque, setDestaque] = useState(null);

  const regioes = ["Todos", ...Array.from(new Set(dados.map(d => d.regiao))).sort()];

  const dadosFiltrados = useMemo(() => {
    let arr = regiaoFiltro === "Todos" ? [...dados] : dados.filter(d => d.regiao === regiaoFiltro);
    arr.sort((a, b) => b[ordenar] - a[ordenar]);
    return arr;
  }, [ordenar, regiaoFiltro]);

  const estadoInfo = destaque ? dados.find(d => d.estado === destaque) : null;

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>Região:</span>
          {regioes.map(r => (
            <button key={r} onClick={() => setRegiaoFiltro(r)}
              style={{ padding: "4px 10px", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 12,
                background: regiaoFiltro === r ? (REGIAO_CORES[r] || COLORS.azul) : "#f3f4f6",
                color: regiaoFiltro === r ? "#fff" : "#444", fontWeight: regiaoFiltro === r ? 700 : 400 }}>
              {r}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>Ordenar por:</span>
          {[["proporcao","% Inadimplentes"],["inad","Total Inadim."],["divida_media","Dívida Média"],["custo_vida","Custo de Vida"]].map(([k, lbl]) => (
            <button key={k} onClick={() => setOrdenar(k)}
              style={{ padding: "4px 10px", borderRadius: 16, border: "none", cursor: "pointer", fontSize: 12,
                background: ordenar === k ? COLORS.azul : "#f3f4f6",
                color: ordenar === k ? "#fff" : "#444", fontWeight: ordenar === k ? 700 : 400 }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: destaque ? "1fr 340px" : "1fr", gap: 16 }}>
        {/* Gráfico de barras */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.preto }}>Taxa de Inadimplência por Estado (Jan/2026)</h3>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "#888" }}>Clique em um estado para ver detalhes</p>
          <ResponsiveContainer width="100%" height={Math.max(400, dadosFiltrados.length * 26)}>
            <BarChart data={dadosFiltrados} layout="vertical" margin={{ top: 0, right: 50, left: 90, bottom: 0 }}
              onClick={e => { if (e?.activePayload?.[0]) setDestaque(e.activePayload[0].payload.estado); }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 10 }} domain={[0.28, 0.52]} />
              <YAxis type="category" dataKey="estado" tick={{ fontSize: 11 }} width={88} />
              <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
              <Bar dataKey="proporcao" name="Taxa" radius={[0, 4, 4, 0]}>
                {dadosFiltrados.map((entry, i) => (
                  <Cell key={i} fill={entry.estado === destaque ? "#f59e0b" : REGIAO_CORES[entry.regiao] || COLORS.azul} opacity={destaque && entry.estado !== destaque ? 0.5 : 1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Painel de detalhe */}
        {estadoInfo && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", alignSelf: "flex-start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <span style={{ fontSize: 24, fontWeight: 900, color: COLORS.preto }}>{estadoInfo.sigla}</span>
                <span style={{ fontSize: 14, color: "#888", marginLeft: 8 }}>{estadoInfo.estado}</span>
              </div>
              <button onClick={() => setDestaque(null)} style={{ border: "none", background: "#f3f4f6", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: "#666" }}>✕ Fechar</button>
            </div>
            <div style={{ background: `${REGIAO_CORES[estadoInfo.regiao]}20`, borderRadius: 8, padding: "8px 12px", marginBottom: 16, fontSize: 12, color: REGIAO_CORES[estadoInfo.regiao], fontWeight: 700 }}>
              Região {estadoInfo.regiao}
            </div>

            {[
              ["👥 Inadimplentes", `${(estadoInfo.inad/1e6).toFixed(2)} mi pessoas`],
              ["📊 Taxa", `${(estadoInfo.proporcao*100).toFixed(1)}% da população`],
              ["🏙️ Taxa Urbana", estadoInfo.taxa_urbana ? `${estadoInfo.taxa_urbana}%` : "—"],
              ["💰 Custo de Vida", estadoInfo.custo_vida ? `R$ ${estadoInfo.custo_vida.toLocaleString("pt-BR")}` : "—"],
              ["🎫 Ticket Médio", fmtBRL(estadoInfo.ticket)],
              ["🧾 Dívida Média/CPF", fmtBRL(estadoInfo.divida_media)],
              ["👤 População Total", (estadoInfo.populacao/1e6).toFixed(2) + " mi"],
            ].map(([lbl, val]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 13 }}>
                <span style={{ color: "#666" }}>{lbl}</span>
                <span style={{ fontWeight: 700, color: COLORS.preto }}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scatter: urbanização x inadimplência */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginTop: 16 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.preto }}>Urbanização × Taxa de Inadimplência</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Correlação entre urbanização e endividamento por estado</p>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" dataKey="taxa_urbana" name="Taxa Urbana" tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} label={{ value: "Taxa Urbana (%)", position: "insideBottom", offset: -5, fontSize: 11 }} />
            <YAxis type="number" dataKey="proporcao" name="Taxa Inadimpl." tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
                  <p style={{ fontWeight: 700, margin: "0 0 4px" }}>{d.estado} ({d.sigla})</p>
                  <p style={{ margin: "2px 0" }}>Urbana: {d.taxa_urbana}%</p>
                  <p style={{ margin: "2px 0" }}>Inadimpl.: {fmtPct(d.proporcao)}</p>
                </div>
              );
            }} />
            {Object.entries(REGIAO_CORES).map(([regiao, cor]) => {
              const pontos = dados.filter(d => d.regiao === regiao && d.taxa_urbana);
              return (
                <Scatter key={regiao} name={regiao} data={pontos} fill={cor}>
                  {pontos.map((p, i) => <Cell key={i} fill={cor} />)}
                </Scatter>
              );
            })}
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SecaoEstados
