export const COLORS = {
    vermelho: "#D92938",
    azul:     "#03738C",
    cinza:    "#999B9A",
    fundo:    "#F2F2F2",
    preto:    "#111111",
    branco:   "#FFFFFF",
    vermelhoClaro: "#f7c0c4",
    azulClaro:     "#b3dde5",
}

export const REGIAO_CORES = { 
    "Norte": "#03738C", 
    "Nordeste": "#D92938", 
    "Centro-Oeste": "#e89c30", 
    "Sudeste": "#7c3aed", 
    "Sul": "#059669" 
}

export function fmtPct(v) {
    return v != null ? `${(v * 100).toFixed(1)}%` : "—";
}

export function fmtMi(v) {
    return v != null ? `${v.toFixed(1)} mi` : "—";
}

export function fmtBi(v) {
    return v != null ? `R$ ${v.toFixed(1)} bi` : "—";
}

export function fmtBRL(v) {
    return v != null ? `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"
}

export function fmtMes(s) {
    { if (!s) return s; const [y, m] = s.split("-"); const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]; return `${meses[+m-1]}/${y.slice(2)}`; }
}