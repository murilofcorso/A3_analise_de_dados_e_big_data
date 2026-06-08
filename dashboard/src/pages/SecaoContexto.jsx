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


function SecaoContexto() {
  const serie = RAW.serie_temporal;
  const ultimo = serie[serie.length-1];
  const primeiroSerie = serie[0];

  const insights = [
    {
      titulo: "Urbanização eleva endividamento?",
      corpo: "Os 5 estados mais inadimplentes do Brasil estão entre os 6 mais urbanizados. A maior oferta de crédito digital em áreas urbanas facilita o endividamento impulsivo.",
      cor: COLORS.vermelho, icone: "🏙️",
    },
    {
      titulo: "Custo de vida e inadimplência",
      corpo: "DF, RJ e SP estão entre os 4 estados com maior custo de vida e também possuem altíssimas taxas de inadimplência. O Paraná (maior custo de vida) é exceção — tem programa de educação financeira nas escolas desde 2021.",
      cor: COLORS.azul, icone: "💸",
    },
    {
      titulo: "Financeirização do crédito",
      corpo: `O setor financeiro ampliou sua participação nas dívidas negativadas de ~37% (2019) para ~${(ultimo.fin_total*100).toFixed(0)}% (jan/2026). As financeiras digitais cresceram +11 pp no período, refletindo maior acesso — e risco — ao crédito.`,
      cor: "#e89c30", icone: "🏦",
    },
    {
      titulo: "Envelhecimento da dívida",
      corpo: "O grupo acima de 60 anos aumentou sua participação em 4,7 pp desde 2019, sendo o que mais cresceu. Isso indica dificuldade crescente de idosos no quitamento de dívidas, possivelmente ligada a crédito consignado.",
      cor: "#7c3aed", icone: "👴",
    },
    {
      titulo: "Impacto do COVID-19",
      corpo: "O único período de queda expressiva na inadimplência foi 2020-2021, durante a pandemia, impulsionado pelo auxílio emergencial e moratórias bancárias. A retomada pós-2021 foi acelerada.",
      cor: "#059669", icone: "🦠",
    },
  ];

  return (
    <div>
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Crescimento Acumulado dos Indicadores</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Índice base 100 = Mar/2016</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={serie.map(d => ({
            ...d,
            idx_inad: +(d.inad_mi / primeiroSerie.inad_mi * 100).toFixed(1),
            idx_valor: d.valor_bi ? +(d.valor_bi / primeiroSerie.valor_bi * 100).toFixed(1) : null,
            idx_divida: d.divida_media ? +(d.divida_media / primeiroSerie.divida_media * 100).toFixed(1) : null,
          }))} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}`} domain={[90, 250]} />
            <Tooltip content={<CustomTooltip formatter={v => `${v}`} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={100} stroke="#aaa" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="idx_inad" name="Inadimplentes" stroke={COLORS.vermelho} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="idx_valor" name="Valor total das dívidas" stroke={COLORS.azul} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="idx_divida" name="Dívida média/CPF" stroke="#e89c30" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {insights.slice(0, 4).map((ins, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderLeft: `4px solid ${ins.cor}` }}>
            <div style={{ fontSize: 16, marginBottom: 6 }}>{ins.icone} <strong style={{ fontSize: 13, color: COLORS.preto }}>{ins.titulo}</strong></div>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{ins.corpo}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderLeft: `4px solid ${insights[4].cor}` }}>
        <div style={{ fontSize: 16, marginBottom: 6 }}>{insights[4].icone} <strong style={{ fontSize: 13, color: COLORS.preto }}>{insights[4].titulo}</strong></div>
        <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{insights[4].corpo}</p>
      </div>
    </div>
  );
}

export default SecaoContexto
