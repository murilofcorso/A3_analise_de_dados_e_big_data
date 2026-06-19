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


function SecaoSetores() {
  const dados = RAW.setores;
  const ultimo = dados[dados.length - 1];

  // Pie data
  const pieData2019 = [
    { name: "Financeiro", value: dados[0].fin_total },
    { name: "Não Financeiro", value: dados[0].nfin_total },
  ];
  const pieData2026 = [
    { name: "Financeiro", value: ultimo.fin_total },
    { name: "Não Financeiro", value: ultimo.nfin_total },
  ];
  const pieColors = [COLORS.vermelho, COLORS.azul];

  const setorDetalhes = [
    { key: "bancos", name: "Bancos e Cartões", color: "#3b82f6" },
    { key: "utilities", name: "Utilities", color: "#10b981" },
    { key: "financeiras", name: "Financeiras", color: COLORS.vermelho },
    { key: "servicos", name: "Serviços", color: "#f59e0b" },
    { key: "varejo", name: "Varejo", color: "#8b5cf6" },
    { key: "telefonia", name: "Telefonia", color: "#06b6d4" },
  ];

  return (
    <div>
      {/* Contexto */}
      <div style={{ background: "#f3feef", border: "1px solid #b9dbad", borderRadius: 10, padding: "14px 18px", marginTop: 20, marginBottom: 20, fontSize: 13 }}>
        <strong>Contexto</strong> 
        <ul style={{ fontSize: 13}}>
          <li>Crescimento da participação do mercado financeiro na concessão de créditos</li>
          <li>Processo de securitização (Dívidas dos clientes = Ativos negociáveis)</li>
          <li>Priorização do lucro sobre a função social do crédito</li>
          <li>Consumidores criam relação de dependência com os mecanismos financeiros</li>
        </ul>
      </div>

      {/* Pie charts comparativos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {[{ title: "2019", data: pieData2019 }, { title: "2026", data: pieData2026 }].map(({ title, data }) => (
          <div key={title} style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", textAlign: "center" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, color: COLORS.preto }}>Participação por Capital – {title}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${(value*100).toFixed(1)}%`} labelLine={false}>
                  {data.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Tooltip formatter={v => `${(v*100).toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Área: financeiro vs não financeiro */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Capital Financeiro vs. Não Financeiro (%)</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Participação no total de dívidas negativadas · 2019 – 2026</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={dados} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gFin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.vermelho} stopOpacity={0.3} />
                <stop offset="95%" stopColor={COLORS.vermelho} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="fin_total" name="Financeiro" stroke={COLORS.vermelho} strokeWidth={2} fill="url(#gFin)" />
            <Line type="monotone" dataKey="nfin_total" name="Não Financeiro" stroke={COLORS.azul} strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Linhas por setor */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Participação por Setor (%)</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Evolução da participação de cada segmento · 2019 – 2026</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dados} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {setorDetalhes.map(s => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#fef9ef", border: "1px solid #f0d988", borderRadius: 10, padding: "14px 18px", marginTop: 16, fontSize: 13 }}>
        <strong>💡 Insight:</strong> O setor <strong>financeiro aumentou sua participação de ~37% para ~46%</strong> entre 2019 e 2026, enquanto telefonia caiu de ~13% para ~5%. As <strong>financeiras</strong> foram o segmento com maior crescimento individual (+11 pp), refletindo a expansão do crédito digital.
      </div>


    </div>
  );
}

export default SecaoSetores
