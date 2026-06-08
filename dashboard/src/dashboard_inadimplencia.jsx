import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, ReferenceLine
} from "recharts";

import RAW from './db.json'
import { COLORS } from "./configs";

import CustomTooltip from './components/CustomTooltip'
import KPICard from "./components/KPICard";
import Tab from "./components/Tab";

import SecaoVisaoGeral from "./pages/SecaoVisaoGeral";
import SecaoPerfil from "./pages/SecaoPerfil";
import SecaoSetores from "./pages/SecaoSetores";
import SecaoEstados from "./pages/SecaoEstados";
import SecaoContexto from "./pages/SecaoContexto";

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [aba, setAba] = useState("visao");

  const abas = [
    { id: "visao",    label: "📈 Visão Geral" },
    { id: "perfil",   label: "🧑‍🤝‍🧑 Perfil" },
    { id: "setores",  label: "🏛️ Setores" },
    { id: "estados",  label: "🗺️ Estados" },
    { id: "contexto", label: "💡 Contexto & Insights" },
  ]; 

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: COLORS.fundo, minHeight: "100vh", padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ background: COLORS.preto, borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>
            🇧🇷 Inadimplência no Brasil
          </h1>
          <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 12 }}>
            Dashboard interativo · Dados Serasa 2016–2026 · IBGE
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: COLORS.vermelho, fontSize: 28, fontWeight: 900, lineHeight: 1 }}>81,3 mi</div>
          <div style={{ color: "#aaa", fontSize: 11 }}>inadimplentes (Jan/26)</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "8px 12px", marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,.05)", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {abas.map(a => <Tab key={a.id} label={a.label} active={aba === a.id} onClick={() => setAba(a.id)} />)}
      </div>

      {/* Conteúdo */}
      {aba === "visao"    && <SecaoVisaoGeral />}
      {aba === "perfil"   && <SecaoPerfil />}
      {aba === "setores"  && <SecaoSetores />}
      {aba === "estados"  && <SecaoEstados />}
      {aba === "contexto" && <SecaoContexto />}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#bbb" }}>
        Fontes: Serasa Experian · IBGE · Tableau Brasil — Dados base consolidada.xlsx
      </div>
    </div>
  );
}
