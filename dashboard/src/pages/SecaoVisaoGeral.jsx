import RAW from "../db.json"
import { useMemo } from "react";
import KPICard from "../components/KPICard";
import { COLORS, fmtPct, fmtBi, fmtBRL, fmtMes } from "../configs";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, ReferenceLine
} from "recharts";
import CustomTooltip from "../components/CustomTooltip";

function SecaoVisaoGeral() {
  const fmtMi   = (v) => v != null ? `${v.toFixed(1)} mi` : "—";
  const serie = RAW.serie_temporal;
  const ultimo = serie[serie.length - 1];
  const primeiro2019 = serie.find(d => d.mes.startsWith("2019"));
  const crescInad = primeiro2019 ? ((ultimo.inad_mi - primeiro2019.inad_mi) / primeiro2019.inad_mi * 100).toFixed(1) : null;

  // Dados anuais para o gráfico de barras
  const anuais = useMemo(() => {
    const por_ano = {};
    serie.forEach(d => {
      const ano = d.mes.slice(0, 4);
      if (!por_ano[ano]) por_ano[ano] = { inad: [], valor: [] };
      por_ano[ano].inad.push(d.inad_mi);
      por_ano[ano].valor.push(d.valor_bi);
    });
    return Object.entries(por_ano).map(([ano, v]) => ({
      ano,
      inad_media: +(v.inad.reduce((a,b) => a+b, 0) / v.inad.length).toFixed(1),
      valor_medio: +(v.valor.reduce((a,b) => a+b, 0) / v.valor.length).toFixed(1),
    }));
  }, []);

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <KPICard label="Inadimplentes (Jan/26)" value={fmtMi(ultimo.inad_mi)} sub="consumidores" color={COLORS.vermelho} icon="👥" />
        <KPICard label="Dívidas Negativadas" value={fmtMi(ultimo.dividas_mi)} sub="registros ativos" color={COLORS.azul} icon="📋" />
        <KPICard label="Valor Total" value={fmtBi(ultimo.valor_bi)} sub="em dívidas negativadas" color="#e89c30" icon="💰" />
        <KPICard label="Ticket Médio" value={fmtBRL(ultimo.ticket)} sub="por dívida" color="#7c3aed" icon="🎫" />
        <KPICard label="Dívida Média/CPF" value={fmtBRL(ultimo.divida_media)} sub="por inadimplente" color={COLORS.vermelho} icon="🧾" />
      </div>

      {/* Gráfico principal – série temporal */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: COLORS.preto }}>Evolução da Inadimplência no Brasil</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Consumidores inadimplentes (milhões) · 2016 – 2026</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={serie} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gradInad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.vermelho} stopOpacity={0.25} />
                <stop offset="95%" stopColor={COLORS.vermelho} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis domain={[55, 85]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}M`} />
            <Tooltip content={<CustomTooltip formatter={(v) => fmtMi(v)} />} />
            <ReferenceLine x="2020-03" stroke="#aaa" strokeDasharray="4 4" label={{ value: "COVID", position: "top", fontSize: 10, fill: "#888" }} />
            <Area type="monotone" dataKey="inad_mi" name="Inadimplentes" stroke={COLORS.vermelho} strokeWidth={2.5} fill="url(#gradInad)" dot={false} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos secundários */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.preto }}>Valor Total das Dívidas (R$ bi)</h3>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>Crescimento acelerado pós-2021</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={serie} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.azul} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={COLORS.azul} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}`} />
              <Tooltip content={<CustomTooltip formatter={v => fmtBi(v)} />} />
              <Area type="monotone" dataKey="valor_bi" name="Valor total" stroke={COLORS.azul} strokeWidth={2} fill="url(#gradValor)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.preto }}>Dívida Média por CPF (R$)</h3>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>Aumento de ~78% desde 2016</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={serie} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[3500, 7000]} tickFormatter={v => `R$${(v/1000).toFixed(1)}k`} />
              <Tooltip content={<CustomTooltip formatter={v => fmtBRL(v)} />} />
              <Line type="monotone" dataKey="divida_media" name="Dívida média" stroke="#e89c30" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SecaoVisaoGeral
