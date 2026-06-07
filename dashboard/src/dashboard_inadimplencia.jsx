import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, ReferenceLine
} from "recharts";

// ─── PALETA DE CORES (do projeto original) ───────────────────────────────────
const C = {
  vermelho: "#D92938",
  azul:     "#03738C",
  cinza:    "#999B9A",
  fundo:    "#F2F2F2",
  preto:    "#111111",
  branco:   "#FFFFFF",
  vermelhoClaro: "#f7c0c4",
  azulClaro:     "#b3dde5",
};

// ─── DADOS EMBUTIDOS ─────────────────────────────────────────────────────────
const RAW = {"serie_temporal":[{"mes":"2016-03","inad_mi":59.19,"dividas_mi":231.33,"valor_bi":214.55,"ticket":927.49,"divida_media":3624.78},{"mes":"2016-04","inad_mi":59.73,"dividas_mi":233.43,"valor_bi":224.57,"ticket":962.07,"divida_media":3759.5},{"mes":"2016-05","inad_mi":58.89,"dividas_mi":228.93,"valor_bi":225.07,"ticket":983.14,"divida_media":3821.92},{"mes":"2016-06","inad_mi":59.07,"dividas_mi":229.39,"valor_bi":224.77,"ticket":979.84,"divida_media":3804.99},{"mes":"2016-07","inad_mi":58.75,"dividas_mi":227.05,"valor_bi":224.66,"ticket":989.49,"divida_media":3824.3},{"mes":"2016-08","inad_mi":58.63,"dividas_mi":226.2,"valor_bi":225.87,"ticket":998.52,"divida_media":3852.39},{"mes":"2016-09","inad_mi":58.92,"dividas_mi":225.68,"valor_bi":227.69,"ticket":1008.92,"divida_media":3864.35},{"mes":"2016-10","inad_mi":58.66,"dividas_mi":218.71,"valor_bi":227.87,"ticket":1041.87,"divida_media":3884.5},{"mes":"2016-11","inad_mi":59.34,"dividas_mi":228.65,"valor_bi":229.54,"ticket":1003.89,"divida_media":3867.97},{"mes":"2016-12","inad_mi":58.98,"dividas_mi":229.45,"valor_bi":228.34,"ticket":995.16,"divida_media":3871.75},{"mes":"2017-01","inad_mi":59.02,"dividas_mi":227.61,"valor_bi":229.12,"ticket":1006.63,"divida_media":3881.96},{"mes":"2017-02","inad_mi":59.12,"dividas_mi":227.32,"valor_bi":229.34,"ticket":1008.87,"divida_media":3879.3},{"mes":"2017-03","inad_mi":59.12,"dividas_mi":225.86,"valor_bi":230.58,"ticket":1020.91,"divida_media":3900.24},{"mes":"2017-04","inad_mi":59.43,"dividas_mi":225.85,"valor_bi":228.59,"ticket":1012.13,"divida_media":3846.68},{"mes":"2017-05","inad_mi":60.31,"dividas_mi":229.93,"valor_bi":233.25,"ticket":1014.45,"divida_media":3867.57},{"mes":"2017-06","inad_mi":59.97,"dividas_mi":228.46,"valor_bi":232.25,"ticket":1016.6,"divida_media":3872.59},{"mes":"2017-07","inad_mi":59.78,"dividas_mi":226.94,"valor_bi":230.89,"ticket":1017.39,"divida_media":3861.93},{"mes":"2017-08","inad_mi":59.79,"dividas_mi":225.52,"valor_bi":229.67,"ticket":1018.39,"divida_media":3840.97},{"mes":"2017-09","inad_mi":59.84,"dividas_mi":225.52,"valor_bi":227.19,"ticket":1007.41,"divida_media":3796.88},{"mes":"2017-10","inad_mi":60.36,"dividas_mi":226.56,"valor_bi":228.62,"ticket":1009.1,"divida_media":3787.34},{"mes":"2017-11","inad_mi":60.48,"dividas_mi":227.91,"valor_bi":229.81,"ticket":1008.32,"divida_media":3799.84},{"mes":"2017-12","inad_mi":59.73,"dividas_mi":224.99,"valor_bi":225.8,"ticket":1003.57,"divida_media":3780.09},{"mes":"2018-01","inad_mi":59.34,"dividas_mi":222.93,"valor_bi":225.64,"ticket":1012.18,"divida_media":3802.34},{"mes":"2018-02","inad_mi":59.72,"dividas_mi":223.15,"valor_bi":225.17,"ticket":1009.09,"divida_media":3770.68},{"mes":"2018-03","inad_mi":60.26,"dividas_mi":224.92,"valor_bi":229.67,"ticket":1021.11,"divida_media":3811.59},{"mes":"2018-04","inad_mi":60.65,"dividas_mi":226.83,"valor_bi":234.31,"ticket":1032.98,"divida_media":3863.08},{"mes":"2018-05","inad_mi":60.83,"dividas_mi":227.46,"valor_bi":235.68,"ticket":1036.16,"divida_media":3874.41},{"mes":"2018-06","inad_mi":61.17,"dividas_mi":228.5,"valor_bi":235.57,"ticket":1030.93,"divida_media":3851.26},{"mes":"2018-07","inad_mi":61.0,"dividas_mi":227.11,"valor_bi":235.11,"ticket":1035.23,"divida_media":3854.13},{"mes":"2018-08","inad_mi":61.04,"dividas_mi":228.6,"valor_bi":237.69,"ticket":1039.77,"divida_media":3893.87},{"mes":"2018-09","inad_mi":60.95,"dividas_mi":227.73,"valor_bi":238.01,"ticket":1045.17,"divida_media":3905.35},{"mes":"2018-10","inad_mi":61.77,"dividas_mi":230.57,"valor_bi":239.05,"ticket":1036.77,"divida_media":3869.86},{"mes":"2018-11","inad_mi":62.66,"dividas_mi":234.44,"valor_bi":250.36,"ticket":1067.93,"divida_media":3995.25},{"mes":"2018-12","inad_mi":62.47,"dividas_mi":233.32,"valor_bi":246.21,"ticket":1055.24,"divida_media":3941.09},{"mes":"2019-01","inad_mi":62.18,"dividas_mi":229.19,"valor_bi":244.13,"ticket":1065.17,"divida_media":3926.39,"fx_25":0.1388,"fx_26_40":0.3766,"fx_41_60":0.3367,"fx_60":0.1478,"fem_pct":0.4921,"mas_pct":0.5079},{"mes":"2019-02","inad_mi":62.17,"dividas_mi":228.61,"valor_bi":243.23,"ticket":1063.95,"divida_media":3912.19,"fx_25":0.1381,"fx_26_40":0.3762,"fx_41_60":0.3374,"fx_60":0.1483,"fem_pct":0.4923,"mas_pct":0.5077},{"mes":"2019-03","inad_mi":62.96,"dividas_mi":231.16,"valor_bi":248.68,"ticket":1075.78,"divida_media":3949.81,"fx_25":0.1373,"fx_26_40":0.3751,"fx_41_60":0.3383,"fx_60":0.1492,"fem_pct":0.4923,"mas_pct":0.5077},{"mes":"2019-04","inad_mi":63.21,"dividas_mi":229.59,"valor_bi":247.92,"ticket":1079.86,"divida_media":3922.52,"fx_25":0.1364,"fx_26_40":0.3742,"fx_41_60":0.3387,"fx_60":0.1507,"fem_pct":0.4924,"mas_pct":0.5076},{"mes":"2019-05","inad_mi":63.37,"dividas_mi":230.03,"valor_bi":250.72,"ticket":1089.95,"divida_media":3956.18,"fx_25":0.1356,"fx_26_40":0.3735,"fx_41_60":0.3392,"fx_60":0.1517,"fem_pct":0.4924,"mas_pct":0.5076},{"mes":"2019-06","inad_mi":63.45,"dividas_mi":229.54,"valor_bi":251.79,"ticket":1096.94,"divida_media":3968.23,"fx_25":0.1354,"fx_26_40":0.3735,"fx_41_60":0.3393,"fx_60":0.1518,"fem_pct":0.4923,"mas_pct":0.5077},{"mes":"2019-07","inad_mi":63.46,"dividas_mi":228.92,"valor_bi":252.09,"ticket":1101.2,"divida_media":3972.26,"fx_25":0.1352,"fx_26_40":0.3729,"fx_41_60":0.3395,"fx_60":0.1523,"fem_pct":0.4925,"mas_pct":0.5075},{"mes":"2019-08","inad_mi":63.43,"dividas_mi":229.17,"valor_bi":256.17,"ticket":1117.81,"divida_media":4038.7,"fx_25":0.1345,"fx_26_40":0.3726,"fx_41_60":0.3402,"fx_60":0.1527,"fem_pct":0.4921,"mas_pct":0.5079},{"mes":"2019-09","inad_mi":63.21,"dividas_mi":226.26,"valor_bi":252.69,"ticket":1116.78,"divida_media":3997.79,"fx_25":0.1339,"fx_26_40":0.3728,"fx_41_60":0.3408,"fx_60":0.1525,"fem_pct":0.4915,"mas_pct":0.5085},{"mes":"2019-10","inad_mi":63.85,"dividas_mi":228.23,"valor_bi":254.94,"ticket":1117.06,"divida_media":3992.78,"fx_25":0.1341,"fx_26_40":0.3714,"fx_41_60":0.3409,"fx_60":0.1536,"fem_pct":0.4916,"mas_pct":0.5084},{"mes":"2019-11","inad_mi":63.84,"dividas_mi":226.6,"valor_bi":256.27,"ticket":1130.94,"divida_media":4014.21,"fx_25":0.1341,"fx_26_40":0.3703,"fx_41_60":0.3414,"fx_60":0.1542,"fem_pct":0.4923,"mas_pct":0.5077},{"mes":"2019-12","inad_mi":63.31,"dividas_mi":224.84,"valor_bi":255.91,"ticket":1138.18,"divida_media":4042.35,"fx_25":0.1337,"fx_26_40":0.3696,"fx_41_60":0.3421,"fx_60":0.1546,"fem_pct":0.491,"mas_pct":0.509},{"mes":"2020-01","inad_mi":63.78,"dividas_mi":226.94,"valor_bi":258.12,"ticket":1137.39,"divida_media":4046.81,"fx_25":0.1343,"fx_26_40":0.3686,"fx_41_60":0.3418,"fx_60":0.1553,"fem_pct":0.4916,"mas_pct":0.5084},{"mes":"2020-02","inad_mi":63.89,"dividas_mi":225.81,"valor_bi":255.08,"ticket":1129.59,"divida_media":3992.46,"fx_25":0.1349,"fx_26_40":0.3689,"fx_41_60":0.3417,"fx_60":0.1545,"fem_pct":0.494,"mas_pct":0.506},{"mes":"2020-03","inad_mi":64.81,"dividas_mi":227.65,"valor_bi":258.75,"ticket":1136.6,"divida_media":3992.27,"fx_25":0.1322,"fx_26_40":0.367,"fx_41_60":0.344,"fx_60":0.1568,"fem_pct":0.4976,"mas_pct":0.5024},{"mes":"2020-04","inad_mi":65.91,"dividas_mi":229.27,"valor_bi":258.23,"ticket":1126.32,"divida_media":3917.95,"fx_25":0.1308,"fx_26_40":0.3639,"fx_41_60":0.3458,"fx_60":0.1595,"fem_pct":0.4992,"mas_pct":0.5008},{"mes":"2020-05","inad_mi":65.23,"dividas_mi":225.89,"valor_bi":253.09,"ticket":1120.42,"divida_media":3879.87,"fx_25":0.1296,"fx_26_40":0.3635,"fx_41_60":0.3468,"fx_60":0.1601,"fem_pct":0.4983,"mas_pct":0.5017},{"mes":"2020-06","inad_mi":64.0,"dividas_mi":221.91,"valor_bi":248.88,"ticket":1121.52,"divida_media":3888.69,"fx_25":0.1286,"fx_26_40":0.3633,"fx_41_60":0.3472,"fx_60":0.1609,"fem_pct":0.4984,"mas_pct":0.5016},{"mes":"2020-07","inad_mi":63.5,"dividas_mi":220.17,"valor_bi":251.29,"ticket":1141.39,"divida_media":3957.2,"fx_25":0.1274,"fx_26_40":0.3626,"fx_41_60":0.3476,"fx_60":0.1624,"fem_pct":0.4982,"mas_pct":0.5018},{"mes":"2020-08","inad_mi":63.05,"dividas_mi":220.46,"valor_bi":248.88,"ticket":1128.93,"divida_media":3947.37,"fx_25":0.1261,"fx_26_40":0.3614,"fx_41_60":0.3481,"fx_60":0.1644,"fem_pct":0.4985,"mas_pct":0.5015},{"mes":"2020-09","inad_mi":62.76,"dividas_mi":218.12,"valor_bi":247.05,"ticket":1132.65,"divida_media":3936.23,"fx_25":0.1244,"fx_26_40":0.3599,"fx_41_60":0.349,"fx_60":0.1667,"fem_pct":0.4982,"mas_pct":0.5018},{"mes":"2020-10","inad_mi":62.28,"dividas_mi":216.22,"valor_bi":245.54,"ticket":1135.57,"divida_media":3942.49,"fx_25":0.1236,"fx_26_40":0.36,"fx_41_60":0.3492,"fx_60":0.1672,"fem_pct":0.4985,"mas_pct":0.5015},{"mes":"2020-11","inad_mi":61.95,"dividas_mi":214.87,"valor_bi":241.42,"ticket":1123.57,"divida_media":3897.04,"fx_25":0.1228,"fx_26_40":0.3597,"fx_41_60":0.3496,"fx_60":0.1679,"fem_pct":0.4981,"mas_pct":0.5019},{"mes":"2020-12","inad_mi":61.36,"dividas_mi":212.88,"valor_bi":236.76,"ticket":1112.16,"divida_media":3858.44,"fx_25":0.122,"fx_26_40":0.359,"fx_41_60":0.3498,"fx_60":0.1693,"fem_pct":0.4985,"mas_pct":0.5015},{"mes":"2021-01","inad_mi":61.67,"dividas_mi":213.26,"valor_bi":239.96,"ticket":1125.19,"divida_media":3891.02,"fx_25":0.1223,"fx_26_40":0.3591,"fx_41_60":0.3497,"fx_60":0.1689,"fem_pct":0.499,"mas_pct":0.501},{"mes":"2021-02","inad_mi":61.56,"dividas_mi":210.69,"valor_bi":240.52,"ticket":1141.57,"divida_media":3907.32,"fx_25":0.1226,"fx_26_40":0.3595,"fx_41_60":0.3494,"fx_60":0.1684,"fem_pct":0.4992,"mas_pct":0.5008},{"mes":"2021-03","inad_mi":62.56,"dividas_mi":212.2,"valor_bi":244.21,"ticket":1150.86,"divida_media":3903.73,"fx_25":0.1227,"fx_26_40":0.358,"fx_41_60":0.3493,"fx_60":0.1701,"fem_pct":0.5003,"mas_pct":0.4997},{"mes":"2021-04","inad_mi":62.98,"dividas_mi":213.36,"valor_bi":248.02,"ticket":1162.43,"divida_media":3937.98,"fx_25":0.1232,"fx_26_40":0.3581,"fx_41_60":0.3492,"fx_60":0.1695,"fem_pct":0.5012,"mas_pct":0.4988},{"mes":"2021-05","inad_mi":62.56,"dividas_mi":211.58,"valor_bi":249.57,"ticket":1179.6,"divida_media":3989.43,"fx_25":0.1236,"fx_26_40":0.3584,"fx_41_60":0.3485,"fx_60":0.1695,"fem_pct":0.5012,"mas_pct":0.4988},{"mes":"2021-06","inad_mi":62.51,"dividas_mi":211.37,"valor_bi":245.94,"ticket":1163.52,"divida_media":3934.38,"fx_25":0.1228,"fx_26_40":0.358,"fx_41_60":0.3488,"fx_60":0.1705,"fem_pct":0.5014,"mas_pct":0.4986},{"mes":"2021-07","inad_mi":62.22,"dividas_mi":209.23,"valor_bi":244.88,"ticket":1170.41,"divida_media":3935.51,"fx_25":0.1232,"fx_26_40":0.3583,"fx_41_60":0.3482,"fx_60":0.1703,"fem_pct":0.5012,"mas_pct":0.4988},{"mes":"2021-08","inad_mi":62.25,"dividas_mi":208.79,"valor_bi":244.57,"ticket":1171.35,"divida_media":3928.93,"fx_25":0.1235,"fx_26_40":0.358,"fx_41_60":0.3476,"fx_60":0.1709,"fem_pct":0.5022,"mas_pct":0.4978},{"mes":"2021-09","inad_mi":62.21,"dividas_mi":208.46,"valor_bi":245.4,"ticket":1177.19,"divida_media":3944.65,"fx_25":0.1234,"fx_26_40":0.358,"fx_41_60":0.3474,"fx_60":0.1713,"fem_pct":0.5011,"mas_pct":0.4989},{"mes":"2021-10","inad_mi":63.41,"dividas_mi":213.27,"valor_bi":253.66,"ticket":1189.38,"divida_media":4000.61,"fx_25":0.1242,"fx_26_40":0.3577,"fx_41_60":0.3467,"fx_60":0.1714,"fem_pct":0.5017,"mas_pct":0.4983},{"mes":"2021-11","inad_mi":64.27,"dividas_mi":215.61,"valor_bi":257.88,"ticket":1196.05,"divida_media":4012.5,"fx_25":0.1249,"fx_26_40":0.3573,"fx_41_60":0.3458,"fx_60":0.1719,"fem_pct":0.5016,"mas_pct":0.4984},{"mes":"2021-12","inad_mi":63.97,"dividas_mi":213.59,"valor_bi":251.95,"ticket":1179.61,"divida_media":3938.51,"fx_25":0.125,"fx_26_40":0.356,"fx_41_60":0.3454,"fx_60":0.1737,"fem_pct":0.5011,"mas_pct":0.4989},{"mes":"2022-01","inad_mi":64.82,"dividas_mi":219.5,"valor_bi":260.73,"ticket":1187.82,"divida_media":4022.52,"fx_25":0.1263,"fx_26_40":0.356,"fx_41_60":0.3444,"fx_60":0.1733,"fem_pct":0.5012,"mas_pct":0.4988},{"mes":"2022-02","inad_mi":65.17,"dividas_mi":221.34,"valor_bi":263.42,"ticket":1190.1,"divida_media":4042.08,"fx_25":0.1273,"fx_26_40":0.3562,"fx_41_60":0.3439,"fx_60":0.1727,"fem_pct":0.5016,"mas_pct":0.4984},{"mes":"2022-03","inad_mi":65.69,"dividas_mi":223.43,"valor_bi":265.82,"ticket":1189.72,"divida_media":4046.31,"fx_25":0.1273,"fx_26_40":0.3553,"fx_41_60":0.344,"fx_60":0.1734,"fem_pct":0.5019,"mas_pct":0.4981},{"mes":"2022-04","inad_mi":66.13,"dividas_mi":226.02,"valor_bi":271.63,"ticket":1201.8,"divida_media":4107.33,"fx_25":0.1281,"fx_26_40":0.3554,"fx_41_60":0.3437,"fx_60":0.1728,"fem_pct":0.5017,"mas_pct":0.4983},{"mes":"2022-05","inad_mi":66.58,"dividas_mi":229.52,"valor_bi":278.27,"ticket":1212.41,"divida_media":4179.51,"fx_25":0.1287,"fx_26_40":0.3555,"fx_41_60":0.3433,"fx_60":0.1726,"fem_pct":0.501,"mas_pct":0.499},{"mes":"2022-06","inad_mi":66.82,"dividas_mi":231.31,"valor_bi":281.43,"ticket":1216.65,"divida_media":4211.83,"fx_25":0.129,"fx_26_40":0.3556,"fx_41_60":0.3431,"fx_60":0.1724,"fem_pct":0.501,"mas_pct":0.499},{"mes":"2022-07","inad_mi":67.63,"dividas_mi":235.25,"valor_bi":287.66,"ticket":1222.75,"divida_media":4253.26,"fx_25":0.1298,"fx_26_40":0.3561,"fx_41_60":0.3422,"fx_60":0.1718,"fem_pct":0.5016,"mas_pct":0.4984},{"mes":"2022-08","inad_mi":67.98,"dividas_mi":238.2,"valor_bi":289.46,"ticket":1215.19,"divida_media":4258.26,"fx_25":0.1298,"fx_26_40":0.3557,"fx_41_60":0.3419,"fx_60":0.1726,"fem_pct":0.5017,"mas_pct":0.4983},{"mes":"2022-09","inad_mi":68.39,"dividas_mi":240.89,"valor_bi":295.74,"ticket":1227.71,"divida_media":4324.42,"fx_25":0.1298,"fx_26_40":0.355,"fx_41_60":0.3417,"fx_60":0.1734,"fem_pct":0.5016,"mas_pct":0.4984},{"mes":"2022-10","inad_mi":69.06,"dividas_mi":243.45,"valor_bi":301.5,"ticket":1238.47,"divida_media":4365.98,"fx_25":0.1295,"fx_26_40":0.3543,"fx_41_60":0.3421,"fx_60":0.1741,"fem_pct":0.5013,"mas_pct":0.4987},{"mes":"2022-11","inad_mi":69.83,"dividas_mi":247.03,"valor_bi":311.03,"ticket":1259.09,"divida_media":4453.79,"fx_25":0.129,"fx_26_40":0.3532,"fx_41_60":0.3423,"fx_60":0.1755,"fem_pct":0.5017,"mas_pct":0.4983},{"mes":"2022-12","inad_mi":69.43,"dividas_mi":247.57,"valor_bi":312.01,"ticket":1260.28,"divida_media":4493.91,"fx_25":0.1285,"fx_26_40":0.3524,"fx_41_60":0.3419,"fx_60":0.1772,"fem_pct":0.5013,"mas_pct":0.4987},{"mes":"2023-01","inad_mi":70.09,"dividas_mi":252.1,"valor_bi":323.29,"ticket":1282.38,"divida_media":4612.28,"fx_25":0.1284,"fx_26_40":0.3523,"fx_41_60":0.342,"fx_60":0.1773,"fem_pct":0.5018,"mas_pct":0.4982},{"mes":"2023-02","inad_mi":70.53,"dividas_mi":255.38,"valor_bi":326.67,"ticket":1279.13,"divida_media":4631.78,"fx_25":0.1285,"fx_26_40":0.3525,"fx_41_60":0.3422,"fx_60":0.1768,"fem_pct":0.5023,"mas_pct":0.4977},{"mes":"2023-03","inad_mi":70.71,"dividas_mi":258.61,"valor_bi":334.56,"ticket":1293.69,"divida_media":4731.62,"fx_25":0.1281,"fx_26_40":0.352,"fx_41_60":0.3425,"fx_60":0.1774,"fem_pct":0.503,"mas_pct":0.497},{"mes":"2023-04","inad_mi":71.44,"dividas_mi":261.18,"valor_bi":340.57,"ticket":1303.96,"divida_media":4767.2,"fx_25":0.128,"fx_26_40":0.3521,"fx_41_60":0.3428,"fx_60":0.1771,"fem_pct":0.503,"mas_pct":0.497},{"mes":"2023-05","inad_mi":71.9,"dividas_mi":264.45,"valor_bi":345.76,"ticket":1307.47,"divida_media":4808.63,"fx_25":0.1276,"fx_26_40":0.3518,"fx_41_60":0.343,"fx_60":0.1775,"fem_pct":0.5034,"mas_pct":0.4966},{"mes":"2023-06","inad_mi":71.45,"dividas_mi":262.81,"valor_bi":346.27,"ticket":1317.6,"divida_media":4846.15,"fx_25":0.1271,"fx_26_40":0.3513,"fx_41_60":0.3434,"fx_60":0.1782,"fem_pct":0.5033,"mas_pct":0.4967},{"mes":"2023-07","inad_mi":71.42,"dividas_mi":265.24,"valor_bi":351.66,"ticket":1325.86,"divida_media":4923.97,"fx_25":0.1251,"fx_26_40":0.35,"fx_41_60":0.3451,"fx_60":0.1798,"fem_pct":0.5038,"mas_pct":0.4962},{"mes":"2023-08","inad_mi":71.74,"dividas_mi":268.87,"valor_bi":355.02,"ticket":1320.41,"divida_media":4948.73,"fx_25":0.1249,"fx_26_40":0.35,"fx_41_60":0.3446,"fx_60":0.1804,"fem_pct":0.5042,"mas_pct":0.4958},{"mes":"2023-09","inad_mi":71.82,"dividas_mi":270.53,"valor_bi":366.81,"ticket":1355.92,"divida_media":5107.23,"fx_25":0.1252,"fx_26_40":0.3499,"fx_41_60":0.3443,"fx_60":0.1806,"fem_pct":0.5041,"mas_pct":0.4959},{"mes":"2023-10","inad_mi":71.95,"dividas_mi":271.37,"valor_bi":376.87,"ticket":1388.79,"divida_media":5237.76,"fx_25":0.125,"fx_26_40":0.3498,"fx_41_60":0.3443,"fx_60":0.181,"fem_pct":0.504,"mas_pct":0.496},{"mes":"2023-11","inad_mi":71.81,"dividas_mi":269.86,"valor_bi":378.0,"ticket":1400.75,"divida_media":5263.99,"fx_25":0.1247,"fx_26_40":0.3489,"fx_41_60":0.3446,"fx_60":0.1819,"fem_pct":0.504,"mas_pct":0.496},{"mes":"2023-12","inad_mi":71.1,"dividas_mi":267.43,"valor_bi":367.93,"ticket":1375.77,"divida_media":5174.62,"fx_25":0.124,"fx_26_40":0.3465,"fx_41_60":0.3454,"fx_60":0.1842,"fem_pct":0.5036,"mas_pct":0.4964},{"mes":"2024-01","inad_mi":72.07,"dividas_mi":271.37,"valor_bi":382.83,"ticket":1410.73,"divida_media":5311.96,"fx_25":0.1233,"fx_26_40":0.3471,"fx_41_60":0.345,"fx_60":0.1846,"fem_pct":0.5035,"mas_pct":0.4965},{"mes":"2024-02","inad_mi":72.04,"dividas_mi":271.48,"valor_bi":382.26,"ticket":1408.06,"divida_media":5306.27,"fx_25":0.1234,"fx_26_40":0.3471,"fx_41_60":0.3452,"fx_60":0.1844,"fem_pct":0.5036,"mas_pct":0.4964},{"mes":"2024-03","inad_mi":72.89,"dividas_mi":274.2,"valor_bi":387.27,"ticket":1412.33,"divida_media":5312.7,"fx_25":0.1227,"fx_26_40":0.3461,"fx_41_60":0.3458,"fx_60":0.1855,"fem_pct":0.5038,"mas_pct":0.4962},{"mes":"2024-04","inad_mi":73.42,"dividas_mi":274.61,"valor_bi":394.3,"ticket":1435.84,"divida_media":5370.44,"fx_25":0.1221,"fx_26_40":0.3454,"fx_41_60":0.3462,"fx_60":0.1863,"fem_pct":0.5036,"mas_pct":0.4964},{"mes":"2024-05","inad_mi":72.54,"dividas_mi":273.25,"valor_bi":394.98,"ticket":1445.5,"divida_media":5445.31,"fx_25":0.1218,"fx_26_40":0.3465,"fx_41_60":0.3463,"fx_60":0.1854,"fem_pct":0.5033,"mas_pct":0.4967},{"mes":"2024-06","inad_mi":72.5,"dividas_mi":273.67,"valor_bi":397.47,"ticket":1452.39,"divida_media":5482.3,"fx_25":0.1221,"fx_26_40":0.3464,"fx_41_60":0.3458,"fx_60":0.1857,"fem_pct":0.5033,"mas_pct":0.4967},{"mes":"2024-07","inad_mi":72.66,"dividas_mi":271.63,"valor_bi":390.46,"ticket":1437.46,"divida_media":5373.46,"fx_25":0.1222,"fx_26_40":0.3456,"fx_41_60":0.346,"fx_60":0.1861,"fem_pct":0.5038,"mas_pct":0.4962},{"mes":"2024-08","inad_mi":72.46,"dividas_mi":271.8,"valor_bi":390.59,"ticket":1437.03,"divida_media":5390.17,"fx_25":0.1218,"fx_26_40":0.3454,"fx_41_60":0.3458,"fx_60":0.1871,"fem_pct":0.5037,"mas_pct":0.4963},{"mes":"2024-09","inad_mi":72.64,"dividas_mi":272.9,"valor_bi":395.11,"ticket":1447.83,"divida_media":5439.2,"fx_25":0.1213,"fx_26_40":0.3451,"fx_41_60":0.3459,"fx_60":0.1878,"fem_pct":0.5036,"mas_pct":0.4964},{"mes":"2024-10","inad_mi":73.1,"dividas_mi":276.09,"valor_bi":402.39,"ticket":1457.48,"divida_media":5504.33,"fx_25":0.1212,"fx_26_40":0.3447,"fx_41_60":0.3457,"fx_60":0.1883,"fem_pct":0.5037,"mas_pct":0.4963},{"mes":"2024-11","inad_mi":73.79,"dividas_mi":274.54,"valor_bi":410.14,"ticket":1493.92,"divida_media":5558.3,"fx_25":0.1206,"fx_26_40":0.3432,"fx_41_60":0.3451,"fx_60":0.1912,"fem_pct":0.5038,"mas_pct":0.4962},{"mes":"2024-12","inad_mi":73.51,"dividas_mi":275.68,"valor_bi":404.07,"ticket":1465.73,"divida_media":5496.69,"fx_25":0.1207,"fx_26_40":0.3435,"fx_41_60":0.3459,"fx_60":0.1899,"fem_pct":0.5039,"mas_pct":0.4961},{"mes":"2025-01","inad_mi":74.6,"dividas_mi":281.26,"valor_bi":419.04,"ticket":1489.9,"divida_media":5617.0,"fx_25":0.1213,"fx_26_40":0.3448,"fx_41_60":0.3453,"fx_60":0.1885,"fem_pct":0.5034,"mas_pct":0.4966},{"mes":"2025-02","inad_mi":75.0,"dividas_mi":286.11,"valor_bi":437.83,"ticket":1530.28,"divida_media":5837.49,"fx_25":0.1209,"fx_26_40":0.3457,"fx_41_60":0.3455,"fx_60":0.1879,"fem_pct":0.503,"mas_pct":0.497},{"mes":"2025-03","inad_mi":75.77,"dividas_mi":287.59,"valor_bi":438.98,"ticket":1526.41,"divida_media":5793.66,"fx_25":0.1207,"fx_26_40":0.3454,"fx_41_60":0.3457,"fx_60":0.1882,"fem_pct":0.503,"mas_pct":0.497},{"mes":"2025-04","inad_mi":76.64,"dividas_mi":294.11,"valor_bi":457.43,"ticket":1555.33,"divida_media":5968.71,"fx_25":0.1207,"fx_26_40":0.3464,"fx_41_60":0.347,"fx_60":0.1859,"fem_pct":0.503,"mas_pct":0.497},{"mes":"2025-05","inad_mi":77.07,"dividas_mi":298.51,"valor_bi":465.28,"ticket":1558.68,"divida_media":6036.94,"fx_25":0.1201,"fx_26_40":0.3457,"fx_41_60":0.3468,"fx_60":0.1874,"fem_pct":0.5032,"mas_pct":0.4968},{"mes":"2025-06","inad_mi":77.87,"dividas_mi":304.54,"valor_bi":477.24,"ticket":1567.05,"divida_media":6128.26,"fx_25":0.1187,"fx_26_40":0.3458,"fx_41_60":0.3476,"fx_60":0.1878,"fem_pct":0.5033,"mas_pct":0.4967},{"mes":"2025-07","inad_mi":78.16,"dividas_mi":307.52,"valor_bi":482.86,"ticket":1570.17,"divida_media":6177.74,"fx_25":0.1186,"fx_26_40":0.3454,"fx_41_60":0.3475,"fx_60":0.1885,"fem_pct":0.5031,"mas_pct":0.4969},{"mes":"2025-08","inad_mi":78.85,"dividas_mi":313.1,"valor_bi":494.11,"ticket":1578.13,"divida_media":6266.55,"fx_25":0.1175,"fx_26_40":0.3447,"fx_41_60":0.3481,"fx_60":0.1897,"fem_pct":0.5032,"mas_pct":0.4968},{"mes":"2025-09","inad_mi":79.17,"dividas_mi":313.47,"valor_bi":496.67,"ticket":1584.42,"divida_media":6273.7,"fx_25":0.1165,"fx_26_40":0.3435,"fx_41_60":0.3481,"fx_60":0.1919,"fem_pct":0.5034,"mas_pct":0.4966},{"mes":"2025-10","inad_mi":80.44,"dividas_mi":321.25,"valor_bi":509.18,"ticket":1584.96,"divida_media":6330.16,"fx_25":0.1163,"fx_26_40":0.3422,"fx_41_60":0.3485,"fx_60":0.193,"fem_pct":0.5041,"mas_pct":0.4959},{"mes":"2025-11","inad_mi":80.61,"dividas_mi":321.63,"valor_bi":511.53,"ticket":1590.43,"divida_media":6345.69,"fx_25":0.115,"fx_26_40":0.3416,"fx_41_60":0.3492,"fx_60":0.1942,"fem_pct":0.5038,"mas_pct":0.4962},{"mes":"2025-12","inad_mi":81.25,"dividas_mi":325.47,"valor_bi":518.56,"ticket":1593.27,"divida_media":6382.37,"fx_25":0.1134,"fx_26_40":0.3404,"fx_41_60":0.3504,"fx_60":0.1958,"fem_pct":0.5039,"mas_pct":0.4961},{"mes":"2026-01","inad_mi":81.32,"dividas_mi":327.23,"valor_bi":524.78,"ticket":1603.7,"divida_media":6453.29,"fx_25":0.114,"fx_26_40":0.3406,"fx_41_60":0.3502,"fx_60":0.1952,"fem_pct":0.5044,"mas_pct":0.4956}],"setores":[{"mes":"2019-01","bancos":0.276,"utilities":0.1962,"telefonia":0.1312,"varejo":0.1203,"servicos":0.1051,"financeiras":0.0908,"securitizadoras":0.034,"cooperativas":null,"outros":0.0464,"fin_total":0.3668,"nfin_total":0.6332},{"mes":"2019-02","bancos":0.2772,"utilities":0.1962,"telefonia":0.1306,"varejo":0.1208,"servicos":0.1043,"financeiras":0.0922,"securitizadoras":0.0324,"cooperativas":null,"outros":0.0463,"fin_total":0.3694,"nfin_total":0.6306},{"mes":"2019-03","bancos":0.2772,"utilities":0.1973,"telefonia":0.1317,"varejo":0.1205,"servicos":0.1036,"financeiras":0.0919,"securitizadoras":0.0323,"cooperativas":null,"outros":0.0455,"fin_total":0.3691,"nfin_total":0.6309},{"mes":"2019-04","bancos":0.2822,"utilities":0.2013,"telefonia":0.1206,"varejo":0.1218,"servicos":0.1049,"financeiras":0.0927,"securitizadoras":0.0314,"cooperativas":null,"outros":0.0452,"fin_total":0.3748,"nfin_total":0.6252},{"mes":"2019-05","bancos":0.2869,"utilities":0.2101,"telefonia":0.1052,"varejo":0.1225,"servicos":0.1062,"financeiras":0.0947,"securitizadoras":0.0299,"cooperativas":null,"outros":0.0446,"fin_total":0.3816,"nfin_total":0.6184},{"mes":"2019-06","bancos":0.2885,"utilities":0.2075,"telefonia":0.1068,"varejo":0.1225,"servicos":0.1024,"financeiras":0.0936,"securitizadoras":0.0335,"cooperativas":null,"outros":0.0452,"fin_total":0.3821,"nfin_total":0.6179},{"mes":"2019-07","bancos":0.289,"utilities":0.2039,"telefonia":0.1079,"varejo":0.1229,"servicos":0.1032,"financeiras":0.0944,"securitizadoras":0.032,"cooperativas":null,"outros":0.0466,"fin_total":0.3835,"nfin_total":0.6165},{"mes":"2019-08","bancos":0.2925,"utilities":0.1982,"telefonia":0.1082,"varejo":0.1228,"servicos":0.1047,"financeiras":0.0937,"securitizadoras":0.0332,"cooperativas":null,"outros":0.0466,"fin_total":0.3862,"nfin_total":0.6138},{"mes":"2019-09","bancos":0.2824,"utilities":0.2,"telefonia":0.1109,"varejo":0.1241,"servicos":0.1075,"financeiras":0.0943,"securitizadoras":0.0334,"cooperativas":null,"outros":0.0475,"fin_total":0.3767,"nfin_total":0.6233},{"mes":"2019-10","bancos":0.2842,"utilities":0.2016,"telefonia":0.1104,"varejo":0.122,"servicos":0.1092,"financeiras":0.0931,"securitizadoras":0.0323,"cooperativas":null,"outros":0.0473,"fin_total":0.3773,"nfin_total":0.6227},{"mes":"2019-11","bancos":0.2807,"utilities":0.2038,"telefonia":0.1042,"varejo":0.1276,"servicos":0.1097,"financeiras":0.0945,"securitizadoras":0.0312,"cooperativas":null,"outros":0.0483,"fin_total":0.3752,"nfin_total":0.6248},{"mes":"2019-12","bancos":0.278,"utilities":0.204,"telefonia":0.107,"varejo":0.123,"servicos":0.113,"financeiras":0.098,"securitizadoras":0.03,"cooperativas":null,"outros":0.047,"fin_total":0.376,"nfin_total":0.624},{"mes":"2020-01","bancos":0.2802,"utilities":0.2052,"telefonia":0.1072,"varejo":0.1231,"servicos":0.1107,"financeiras":0.0992,"securitizadoras":0.0281,"cooperativas":null,"outros":0.0461,"fin_total":0.3795,"nfin_total":0.6205},{"mes":"2020-02","bancos":0.2785,"utilities":0.2047,"telefonia":0.1069,"varejo":0.1271,"servicos":0.1106,"financeiras":0.0994,"securitizadoras":0.0268,"cooperativas":null,"outros":0.0462,"fin_total":0.3778,"nfin_total":0.6222},{"mes":"2020-03","bancos":0.2745,"utilities":0.2145,"telefonia":0.1037,"varejo":0.1289,"servicos":0.1086,"financeiras":0.1004,"securitizadoras":0.0252,"cooperativas":null,"outros":0.0441,"fin_total":0.375,"nfin_total":0.625},{"mes":"2020-04","bancos":0.2758,"utilities":0.2179,"telefonia":0.1017,"varejo":0.1318,"servicos":0.1066,"financeiras":0.0997,"securitizadoras":0.0235,"cooperativas":null,"outros":0.043,"fin_total":0.3756,"nfin_total":0.6244},{"mes":"2020-05","bancos":0.2759,"utilities":0.2165,"telefonia":0.103,"varejo":0.1339,"servicos":0.1055,"financeiras":0.1011,"securitizadoras":0.0227,"cooperativas":null,"outros":0.0415,"fin_total":0.377,"nfin_total":0.623},{"mes":"2020-06","bancos":0.2768,"utilities":0.2167,"telefonia":0.1047,"varejo":0.134,"servicos":0.1059,"financeiras":0.0988,"securitizadoras":0.0218,"cooperativas":null,"outros":0.0412,"fin_total":0.3756,"nfin_total":0.6244},{"mes":"2020-07","bancos":0.279,"utilities":0.2202,"telefonia":0.1047,"varejo":0.1323,"servicos":0.1045,"financeiras":0.0964,"securitizadoras":0.0206,"cooperativas":null,"outros":0.0423,"fin_total":0.3753,"nfin_total":0.6247},{"mes":"2020-08","bancos":0.2749,"utilities":0.2218,"telefonia":0.1101,"varejo":0.1296,"servicos":0.1092,"financeiras":0.0912,"securitizadoras":0.0184,"cooperativas":null,"outros":0.0448,"fin_total":0.3661,"nfin_total":0.6339},{"mes":"2020-09","bancos":0.2755,"utilities":0.2239,"telefonia":0.111,"varejo":0.129,"servicos":0.1081,"financeiras":0.0905,"securitizadoras":0.0178,"cooperativas":null,"outros":0.0442,"fin_total":0.366,"nfin_total":0.634},{"mes":"2020-10","bancos":0.278,"utilities":0.2239,"telefonia":0.1116,"varejo":0.1293,"servicos":0.1089,"financeiras":0.0881,"securitizadoras":0.0161,"cooperativas":null,"outros":0.0442,"fin_total":0.3661,"nfin_total":0.6339},{"mes":"2020-11","bancos":0.2776,"utilities":0.2282,"telefonia":0.1116,"varejo":0.1287,"servicos":0.1101,"financeiras":0.0827,"securitizadoras":0.0153,"cooperativas":null,"outros":0.0457,"fin_total":0.3604,"nfin_total":0.6396},{"mes":"2020-12","bancos":0.2735,"utilities":0.2358,"telefonia":0.111,"varejo":0.127,"servicos":0.109,"financeiras":0.0835,"securitizadoras":0.0148,"cooperativas":null,"outros":0.0454,"fin_total":0.357,"nfin_total":0.643},{"mes":"2021-01","bancos":0.2818,"utilities":0.2272,"telefonia":0.1103,"varejo":0.1288,"servicos":0.1085,"financeiras":0.0839,"securitizadoras":0.0138,"cooperativas":null,"outros":0.0457,"fin_total":0.3657,"nfin_total":0.6343},{"mes":"2021-02","bancos":0.2891,"utilities":0.2217,"telefonia":0.1035,"varejo":0.1318,"servicos":0.1094,"financeiras":0.0848,"securitizadoras":0.0132,"cooperativas":null,"outros":0.0465,"fin_total":0.374,"nfin_total":0.626},{"mes":"2021-03","bancos":0.2866,"utilities":0.2262,"telefonia":0.1018,"varejo":0.1276,"servicos":0.109,"financeiras":0.0894,"securitizadoras":0.0132,"cooperativas":null,"outros":0.0463,"fin_total":0.376,"nfin_total":0.624},{"mes":"2021-04","bancos":0.2879,"utilities":0.2267,"telefonia":0.1003,"varejo":0.1294,"servicos":0.1035,"financeiras":0.0964,"securitizadoras":0.0129,"cooperativas":null,"outros":0.043,"fin_total":0.3843,"nfin_total":0.6157},{"mes":"2021-05","bancos":0.297,"utilities":0.2234,"telefonia":0.0939,"varejo":0.1304,"servicos":0.1026,"financeiras":0.0974,"securitizadoras":0.0126,"cooperativas":null,"outros":0.0427,"fin_total":0.3945,"nfin_total":0.6055},{"mes":"2021-06","bancos":0.2863,"utilities":0.2356,"telefonia":0.0931,"varejo":0.1312,"servicos":0.1025,"financeiras":0.0979,"securitizadoras":0.0119,"cooperativas":null,"outros":0.0414,"fin_total":0.3842,"nfin_total":0.6158},{"mes":"2021-07","bancos":0.29,"utilities":0.2359,"telefonia":0.0891,"varejo":0.1309,"servicos":0.1021,"financeiras":0.1001,"securitizadoras":0.0103,"cooperativas":null,"outros":0.0417,"fin_total":0.3901,"nfin_total":0.6099},{"mes":"2021-08","bancos":0.2884,"utilities":0.2329,"telefonia":0.0888,"varejo":0.1318,"servicos":0.1022,"financeiras":0.1039,"securitizadoras":0.0098,"cooperativas":null,"outros":0.0422,"fin_total":0.3923,"nfin_total":0.6077},{"mes":"2021-09","bancos":0.2874,"utilities":0.2351,"telefonia":0.088,"varejo":0.1301,"servicos":0.1024,"financeiras":0.1064,"securitizadoras":0.0094,"cooperativas":null,"outros":0.0413,"fin_total":0.3938,"nfin_total":0.6062},{"mes":"2021-10","bancos":0.2873,"utilities":0.2331,"telefonia":0.0844,"varejo":0.1278,"servicos":0.1031,"financeiras":0.1082,"securitizadoras":0.0131,"cooperativas":null,"outros":0.043,"fin_total":0.3955,"nfin_total":0.6045},{"mes":"2021-11","bancos":0.2906,"utilities":0.2316,"telefonia":0.0803,"varejo":0.1255,"servicos":0.103,"financeiras":0.1078,"securitizadoras":0.0185,"cooperativas":null,"outros":0.0427,"fin_total":0.3984,"nfin_total":0.6016},{"mes":"2021-12","bancos":0.2768,"utilities":0.2391,"telefonia":0.0802,"varejo":0.1259,"servicos":0.1042,"financeiras":0.1135,"securitizadoras":0.0181,"cooperativas":null,"outros":0.0423,"fin_total":0.3903,"nfin_total":0.6097},{"mes":"2022-01","bancos":0.2838,"utilities":0.2373,"telefonia":0.0762,"varejo":0.1244,"servicos":0.1015,"financeiras":0.115,"securitizadoras":0.0205,"cooperativas":null,"outros":0.0413,"fin_total":0.3988,"nfin_total":0.6012},{"mes":"2022-02","bancos":0.2863,"utilities":0.2319,"telefonia":0.0743,"varejo":0.1254,"servicos":0.1014,"financeiras":0.1191,"securitizadoras":0.0197,"cooperativas":null,"outros":0.0419,"fin_total":0.4054,"nfin_total":0.5946},{"mes":"2022-03","bancos":0.2817,"utilities":0.2321,"telefonia":0.074,"varejo":0.1262,"servicos":0.1027,"financeiras":0.1224,"securitizadoras":0.0189,"cooperativas":null,"outros":0.042,"fin_total":0.404,"nfin_total":0.596},{"mes":"2022-04","bancos":0.2814,"utilities":0.2293,"telefonia":0.0727,"varejo":0.1249,"servicos":0.1043,"financeiras":0.1239,"securitizadoras":0.0209,"cooperativas":null,"outros":0.0426,"fin_total":0.4053,"nfin_total":0.5947},{"mes":"2022-05","bancos":0.2818,"utilities":0.2274,"telefonia":0.0709,"varejo":0.125,"servicos":0.106,"financeiras":0.1249,"securitizadoras":0.0224,"cooperativas":null,"outros":0.0417,"fin_total":0.4067,"nfin_total":0.5933},{"mes":"2022-06","bancos":0.2782,"utilities":0.2259,"telefonia":0.0699,"varejo":0.1248,"servicos":0.1055,"financeiras":0.1322,"securitizadoras":0.0218,"cooperativas":null,"outros":0.0417,"fin_total":0.4104,"nfin_total":0.5896},{"mes":"2022-07","bancos":0.2857,"utilities":0.2215,"telefonia":0.0682,"varejo":0.1243,"servicos":0.1013,"financeiras":0.1373,"securitizadoras":0.0208,"cooperativas":null,"outros":0.0408,"fin_total":0.423,"nfin_total":0.577},{"mes":"2022-08","bancos":0.2882,"utilities":0.2213,"telefonia":0.0672,"varejo":0.1247,"servicos":0.1009,"financeiras":0.1383,"securitizadoras":0.0202,"cooperativas":null,"outros":0.0392,"fin_total":0.4265,"nfin_total":0.5735},{"mes":"2022-09","bancos":0.2945,"utilities":0.2186,"telefonia":0.0653,"varejo":0.1238,"servicos":0.1012,"financeiras":0.139,"securitizadoras":0.0195,"cooperativas":null,"outros":0.0381,"fin_total":0.4335,"nfin_total":0.5665},{"mes":"2022-10","bancos":0.2879,"utilities":0.2204,"telefonia":0.0633,"varejo":0.1193,"servicos":0.1014,"financeiras":0.1488,"securitizadoras":0.0213,"cooperativas":null,"outros":0.0376,"fin_total":0.4367,"nfin_total":0.5633},{"mes":"2022-11","bancos":0.2887,"utilities":0.2188,"telefonia":0.0616,"varejo":0.1185,"servicos":0.1055,"financeiras":0.1541,"securitizadoras":0.0205,"cooperativas":null,"outros":0.0323,"fin_total":0.4428,"nfin_total":0.5572},{"mes":"2022-12","bancos":0.287,"utilities":0.2225,"telefonia":0.0614,"varejo":0.1147,"servicos":0.1061,"financeiras":0.1563,"securitizadoras":0.0201,"cooperativas":null,"outros":0.0317,"fin_total":0.4433,"nfin_total":0.5567},{"mes":"2023-01","bancos":0.2961,"utilities":0.215,"telefonia":0.0593,"varejo":0.1133,"servicos":0.1052,"financeiras":0.1606,"securitizadoras":0.0197,"cooperativas":null,"outros":0.0308,"fin_total":0.4567,"nfin_total":0.5433},{"mes":"2023-02","bancos":0.3163,"utilities":0.2176,"telefonia":0.0575,"varejo":0.1124,"servicos":0.1034,"financeiras":0.1428,"securitizadoras":0.0194,"cooperativas":null,"outros":0.0306,"fin_total":0.4591,"nfin_total":0.5409},{"mes":"2023-03","bancos":0.3103,"utilities":0.2202,"telefonia":0.0544,"varejo":0.1129,"servicos":0.1022,"financeiras":0.1512,"securitizadoras":0.0186,"cooperativas":null,"outros":0.0301,"fin_total":0.4615,"nfin_total":0.5385},{"mes":"2023-04","bancos":0.3161,"utilities":0.2158,"telefonia":0.0528,"varejo":0.1127,"servicos":0.1041,"financeiras":0.1506,"securitizadoras":0.0181,"cooperativas":null,"outros":0.0298,"fin_total":0.4667,"nfin_total":0.5333},{"mes":"2023-05","bancos":0.3194,"utilities":0.2145,"telefonia":0.0514,"varejo":0.1131,"servicos":0.1032,"financeiras":0.1505,"securitizadoras":0.0175,"cooperativas":null,"outros":0.0303,"fin_total":0.4699,"nfin_total":0.5301},{"mes":"2023-06","bancos":0.3113,"utilities":0.2207,"telefonia":0.0477,"varejo":0.1144,"servicos":0.1058,"financeiras":0.1522,"securitizadoras":0.0173,"cooperativas":null,"outros":0.0306,"fin_total":0.4635,"nfin_total":0.5365},{"mes":"2023-07","bancos":0.2954,"utilities":0.2394,"telefonia":0.0487,"varejo":0.111,"servicos":0.1049,"financeiras":0.1529,"securitizadoras":0.0167,"cooperativas":null,"outros":0.031,"fin_total":0.4482,"nfin_total":0.5518},{"mes":"2023-08","bancos":0.2929,"utilities":0.2447,"telefonia":0.0473,"varejo":0.1102,"servicos":0.104,"financeiras":0.153,"securitizadoras":0.0163,"cooperativas":null,"outros":0.0316,"fin_total":0.4459,"nfin_total":0.5541},{"mes":"2023-09","bancos":0.2898,"utilities":0.2383,"telefonia":0.0469,"varejo":0.1105,"servicos":0.1055,"financeiras":0.1617,"securitizadoras":0.0157,"cooperativas":null,"outros":0.0316,"fin_total":0.4515,"nfin_total":0.5485},{"mes":"2023-10","bancos":0.2919,"utilities":0.2353,"telefonia":0.0463,"varejo":0.1114,"servicos":0.1057,"financeiras":0.1626,"securitizadoras":0.0152,"cooperativas":null,"outros":0.0316,"fin_total":0.4545,"nfin_total":0.5455},{"mes":"2023-11","bancos":0.2897,"utilities":0.2338,"telefonia":0.0458,"varejo":0.1114,"servicos":0.1083,"financeiras":0.1646,"securitizadoras":0.0147,"cooperativas":null,"outros":0.0319,"fin_total":0.4543,"nfin_total":0.5457},{"mes":"2023-12","bancos":0.2792,"utilities":0.2404,"telefonia":0.0455,"varejo":0.1107,"servicos":0.1092,"financeiras":0.1685,"securitizadoras":0.0142,"cooperativas":null,"outros":0.0322,"fin_total":0.4478,"nfin_total":0.5522},{"mes":"2024-01","bancos":0.2937,"utilities":0.2309,"telefonia":0.0448,"varejo":0.1095,"servicos":0.1074,"financeiras":0.1676,"securitizadoras":0.014,"cooperativas":null,"outros":0.0321,"fin_total":0.4613,"nfin_total":0.5387},{"mes":"2024-02","bancos":0.2927,"utilities":0.2267,"telefonia":0.0447,"varejo":0.1099,"servicos":0.1085,"financeiras":0.1717,"securitizadoras":0.0137,"cooperativas":null,"outros":0.0322,"fin_total":0.4645,"nfin_total":0.5355},{"mes":"2024-03","bancos":0.2934,"utilities":0.2299,"telefonia":0.0442,"varejo":0.105,"servicos":0.1116,"financeiras":0.1707,"securitizadoras":0.0133,"cooperativas":null,"outros":0.032,"fin_total":0.4641,"nfin_total":0.5359},{"mes":"2024-04","bancos":0.2962,"utilities":0.2224,"telefonia":0.0434,"varejo":0.1047,"servicos":0.1147,"financeiras":0.1732,"securitizadoras":0.0135,"cooperativas":null,"outros":0.032,"fin_total":0.4694,"nfin_total":0.5306},{"mes":"2024-05","bancos":0.2907,"utilities":0.2213,"telefonia":0.0439,"varejo":0.1045,"servicos":0.1186,"financeiras":0.1754,"securitizadoras":0.0133,"cooperativas":null,"outros":0.0324,"fin_total":0.4661,"nfin_total":0.5339},{"mes":"2024-06","bancos":0.2916,"utilities":0.2185,"telefonia":0.046,"varejo":0.1037,"servicos":0.1181,"financeiras":0.1769,"securitizadoras":0.0126,"cooperativas":null,"outros":0.0326,"fin_total":0.4685,"nfin_total":0.5315},{"mes":"2024-07","bancos":0.2844,"utilities":0.2185,"telefonia":0.046,"varejo":0.1051,"servicos":0.1209,"financeiras":0.1781,"securitizadoras":0.0123,"cooperativas":null,"outros":0.0347,"fin_total":0.4625,"nfin_total":0.5375},{"mes":"2024-08","bancos":0.2798,"utilities":0.217,"telefonia":0.0517,"varejo":0.1053,"servicos":0.1087,"financeiras":0.1748,"securitizadoras":0.0155,"cooperativas":0.0187,"outros":0.0285,"fin_total":0.4546,"nfin_total":0.5454},{"mes":"2024-09","bancos":0.2803,"utilities":0.2177,"telefonia":0.0504,"varejo":0.1044,"servicos":0.1083,"financeiras":0.1751,"securitizadoras":0.0163,"cooperativas":0.0188,"outros":0.0287,"fin_total":0.4554,"nfin_total":0.5446},{"mes":"2024-10","bancos":0.2786,"utilities":0.2168,"telefonia":0.0492,"varejo":0.1034,"servicos":0.1091,"financeiras":0.1765,"securitizadoras":0.0189,"cooperativas":0.0191,"outros":0.0285,"fin_total":0.455,"nfin_total":0.545},{"mes":"2024-11","bancos":0.2862,"utilities":0.2028,"telefonia":0.0492,"varejo":0.1036,"servicos":0.1115,"financeiras":0.18,"securitizadoras":0.0186,"cooperativas":0.0192,"outros":0.029,"fin_total":0.4662,"nfin_total":0.5338},{"mes":"2024-12","bancos":0.2743,"utilities":0.2206,"telefonia":0.0487,"varejo":0.1008,"servicos":0.1103,"financeiras":0.1799,"securitizadoras":0.0179,"cooperativas":0.019,"outros":0.0284,"fin_total":0.4542,"nfin_total":0.5458},{"mes":"2025-01","bancos":0.289,"utilities":0.2103,"telefonia":0.0474,"varejo":0.0988,"servicos":0.1095,"financeiras":0.181,"securitizadoras":0.0167,"cooperativas":0.0192,"outros":0.028,"fin_total":0.47,"nfin_total":0.53},{"mes":"2025-02","bancos":0.2808,"utilities":0.2037,"telefonia":0.0467,"varejo":0.0975,"servicos":0.1096,"financeiras":0.1878,"securitizadoras":0.0268,"cooperativas":0.0193,"outros":0.0279,"fin_total":0.4685,"nfin_total":0.5315},{"mes":"2025-03","bancos":0.2847,"utilities":0.2042,"telefonia":0.0468,"varejo":0.0968,"servicos":0.1125,"financeiras":0.1914,"securitizadoras":0.0156,"cooperativas":0.0199,"outros":0.0281,"fin_total":0.4762,"nfin_total":0.5238},{"mes":"2025-04","bancos":0.2814,"utilities":0.2008,"telefonia":0.0457,"varejo":0.0955,"servicos":0.1163,"financeiras":0.1931,"securitizadoras":0.0197,"cooperativas":0.0198,"outros":0.0277,"fin_total":0.4745,"nfin_total":0.5255},{"mes":"2025-05","bancos":0.2785,"utilities":0.2017,"telefonia":0.0461,"varejo":0.0944,"servicos":0.1194,"financeiras":0.1938,"securitizadoras":0.019,"cooperativas":0.0195,"outros":0.0275,"fin_total":0.4723,"nfin_total":0.5277},{"mes":"2025-06","bancos":0.2749,"utilities":0.2067,"telefonia":0.0453,"varejo":0.0925,"servicos":0.1182,"financeiras":0.1943,"securitizadoras":0.0216,"cooperativas":0.0196,"outros":0.027,"fin_total":0.4692,"nfin_total":0.5308},{"mes":"2025-07","bancos":0.2726,"utilities":0.206,"telefonia":0.0465,"varejo":0.0925,"servicos":0.1193,"financeiras":0.1947,"securitizadoras":0.0211,"cooperativas":0.0199,"outros":0.0275,"fin_total":0.4673,"nfin_total":0.5327},{"mes":"2025-08","bancos":0.2727,"utilities":0.2082,"telefonia":0.0463,"varejo":0.0914,"servicos":0.1185,"financeiras":0.1951,"securitizadoras":0.0205,"cooperativas":0.0198,"outros":0.0277,"fin_total":0.4677,"nfin_total":0.5323},{"mes":"2025-09","bancos":0.2702,"utilities":0.2133,"telefonia":0.0464,"varejo":0.0914,"servicos":0.1147,"financeiras":0.1992,"securitizadoras":0.0173,"cooperativas":0.0198,"outros":0.0278,"fin_total":0.4694,"nfin_total":0.5306},{"mes":"2025-10","bancos":0.2663,"utilities":0.2167,"telefonia":0.0451,"varejo":0.0906,"servicos":0.1177,"financeiras":0.1996,"securitizadoras":0.017,"cooperativas":0.0196,"outros":0.0274,"fin_total":0.4659,"nfin_total":0.5341},{"mes":"2025-11","bancos":0.2692,"utilities":0.219,"telefonia":0.0471,"varejo":0.0866,"servicos":0.1193,"financeiras":0.1939,"securitizadoras":0.0187,"cooperativas":0.0198,"outros":0.0263,"fin_total":0.4632,"nfin_total":0.5368},{"mes":"2025-12","bancos":0.2615,"utilities":0.2212,"telefonia":0.0494,"varejo":0.0838,"servicos":0.1191,"financeiras":0.196,"securitizadoras":0.0231,"cooperativas":0.0195,"outros":0.0264,"fin_total":0.4575,"nfin_total":0.5425},{"mes":"2026-01","bancos":0.263,"utilities":0.2198,"telefonia":0.0499,"varejo":0.0827,"servicos":0.1176,"financeiras":0.1979,"securitizadoras":0.0232,"cooperativas":0.0196,"outros":0.0262,"fin_total":0.4609,"nfin_total":0.5391}],"estados_2026":[{"estado":"Acre","sigla":"AC","regiao":"Norte","inad":286357,"proporcao":0.3238,"ticket":1529.22,"divida_media":5374.27,"custo_vida":3520,"taxa_urbana":72.61,"populacao":884372},{"estado":"Alagoas","sigla":"AL","regiao":"Nordeste","inad":1097072,"proporcao":0.3406,"ticket":1767.82,"divida_media":5055.91,"custo_vida":4280,"taxa_urbana":73.64,"populacao":3220848},{"estado":"Amapá","sigla":"AP","regiao":"Norte","inad":354990,"proporcao":0.4402,"ticket":1347.92,"divida_media":5301.38,"custo_vida":4640,"taxa_urbana":89.81,"populacao":806517},{"estado":"Amazonas","sigla":"AM","regiao":"Norte","inad":1751815,"proporcao":0.4054,"ticket":1300.66,"divida_media":5659.87,"custo_vida":4120,"taxa_urbana":79.17,"populacao":4321616},{"estado":"Bahia","sigla":"BA","regiao":"Nordeste","inad":4972121,"proporcao":0.3344,"ticket":1454.97,"divida_media":4197.84,"custo_vida":2960,"taxa_urbana":72.07,"populacao":14870907},{"estado":"Ceará","sigla":"CE","regiao":"Nordeste","inad":3578465,"proporcao":0.3861,"ticket":1319.76,"divida_media":4920.03,"custo_vida":4440,"taxa_urbana":75.09,"populacao":9268836},{"estado":"Distrito Federal","sigla":"DF","regiao":"Centro-Oeste","inad":1435211,"proporcao":0.4789,"ticket":1390.8,"divida_media":9155.26,"custo_vida":5920,"taxa_urbana":96.62,"populacao":2996899},{"estado":"Espírito Santo","sigla":"ES","regiao":"Sudeste","inad":1349392,"proporcao":0.327,"ticket":1494.93,"divida_media":5857.76,"custo_vida":4080,"taxa_urbana":85.29,"populacao":4126854},{"estado":"Goiás","sigla":"GO","regiao":"Centro-Oeste","inad":2640328,"proporcao":0.3557,"ticket":1761.27,"divida_media":6570.19,"custo_vida":3920,"taxa_urbana":90.29,"populacao":7423629},{"estado":"Maranhão","sigla":"MA","regiao":"Nordeste","inad":2332855,"proporcao":0.3324,"ticket":1533.22,"divida_media":4485.33,"custo_vida":3960,"taxa_urbana":63.07,"populacao":7018211},{"estado":"Mato Grosso","sigla":"MT","regiao":"Centro-Oeste","inad":1489895,"proporcao":0.3826,"ticket":1531.31,"divida_media":7729.43,"custo_vida":4920,"taxa_urbana":81.9,"populacao":3893659},{"estado":"Mato Grosso do Sul","sigla":"MS","regiao":"Centro-Oeste","inad":1266599,"proporcao":0.4331,"ticket":1723.26,"divida_media":7834.86,"custo_vida":4760,"taxa_urbana":85.64,"populacao":2924631},{"estado":"Minas Gerais","sigla":"MG","regiao":"Sudeste","inad":7815374,"proporcao":0.3653,"ticket":1675.95,"divida_media":6351.8,"custo_vida":4000,"taxa_urbana":83.38,"populacao":21393441},{"estado":"Pará","sigla":"PA","regiao":"Norte","inad":2961068,"proporcao":0.3399,"ticket":1621.71,"divida_media":4785.16,"custo_vida":5360,"taxa_urbana":68.49,"populacao":8711196},{"estado":"Paraíba","sigla":"PB","regiao":"Nordeste","inad":1376313,"proporcao":0.3305,"ticket":1690.38,"divida_media":5434.86,"custo_vida":4400,"taxa_urbana":75.37,"populacao":4164468},{"estado":"Paraná","sigla":"PR","regiao":"Sul","inad":4094471,"proporcao":0.3443,"ticket":1838.15,"divida_media":7869.94,"custo_vida":6520,"taxa_urbana":85.31,"populacao":11890517},{"estado":"Pernambuco","sigla":"PE","regiao":"Nordeste","inad":3618709,"proporcao":0.3784,"ticket":1677.06,"divida_media":5039.87,"custo_vida":4280,"taxa_urbana":80.15,"populacao":9562007},{"estado":"Piauí","sigla":"PI","regiao":"Nordeste","inad":1035547,"proporcao":0.306,"ticket":1645.44,"divida_media":4963.01,"custo_vida":3280,"taxa_urbana":65.77,"populacao":3384547},{"estado":"Rio de Janeiro","sigla":"RJ","regiao":"Sudeste","inad":7928421,"proporcao":0.4603,"ticket":1692.5,"divida_media":6529.39,"custo_vida":6200,"taxa_urbana":96.71,"populacao":17223547},{"estado":"Rio Grande do Norte","sigla":"RN","regiao":"Nordeste","inad":1328688,"proporcao":0.3845,"ticket":1688.03,"divida_media":5314.8,"custo_vida":4280,"taxa_urbana":77.82,"populacao":3455236},{"estado":"Rio Grande do Sul","sigla":"RS","regiao":"Sul","inad":4033282,"proporcao":0.359,"ticket":1762.93,"divida_media":7404.42,"custo_vida":4360,"taxa_urbana":85.1,"populacao":11233263},{"estado":"Rondônia","sigla":"RO","regiao":"Norte","inad":675427,"proporcao":0.3855,"ticket":1433.39,"divida_media":6912.01,"custo_vida":3440,"taxa_urbana":73.22,"populacao":1751950},{"estado":"Roraima","sigla":"RR","regiao":"Norte","inad":255000,"proporcao":0.3452,"ticket":1562.25,"divida_media":5060.94,"custo_vida":4080,"taxa_urbana":76.41,"populacao":738772},{"estado":"Santa Catarina","sigla":"SC","regiao":"Sul","inad":2529660,"proporcao":0.309,"ticket":2123.74,"divida_media":9220.1,"custo_vida":5800,"taxa_urbana":83.99,"populacao":8187029},{"estado":"São Paulo","sigla":"SP","regiao":"Sudeste","inad":19701978,"proporcao":0.4275,"ticket":1513.06,"divida_media":7348.14,"custo_vida":6000,"taxa_urbana":95.88,"populacao":46081801},{"estado":"Sergipe","sigla":"SE","regiao":"Nordeste","inad":757131,"proporcao":0.3293,"ticket":1613.74,"divida_media":4757.14,"custo_vida":3640,"taxa_urbana":73.51,"populacao":2299425},{"estado":"Tocantins","sigla":"TO","regiao":"Norte","inad":639686,"proporcao":0.4031,"ticket":1450.06,"divida_media":6049.1,"custo_vida":4440,"taxa_urbana":78.81,"populacao":1586859}]};

// ─── FORMATTERS ──────────────────────────────────────────────────────────────
const fmtPct  = (v) => v != null ? `${(v * 100).toFixed(1)}%` : "—";
const fmtMi   = (v) => v != null ? `${v.toFixed(1)} mi` : "—";
const fmtBi   = (v) => v != null ? `R$ ${v.toFixed(1)} bi` : "—";
const fmtBRL  = (v) => v != null ? `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";
const fmtMes  = (s) => { if (!s) return s; const [y, m] = s.split("-"); const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]; return `${meses[+m-1]}/${y.slice(2)}`; };

const REGIAO_CORES = { Norte: "#03738C", Nordeste: "#D92938", "Centro-Oeste": "#e89c30", Sudeste: "#7c3aed", Sul: "#059669" };

// ─── TOOLTIP CUSTOMIZADO ─────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid #e5e7eb`, borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: C.preto }}>{fmtMes(label) || label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, display: "inline-block" }} />
          <span style={{ color: "#555" }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: C.preto }}>{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI CARD ────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, color = C.azul, icon }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", borderLeft: `4px solid ${color}`, flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{icon} {label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.preto, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── TABS ────────────────────────────────────────────────────────────────────
function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: active ? 700 : 500, background: active ? C.azul : "transparent", color: active ? "#fff" : "#555", transition: "all .2s", fontSize: 13 }}>
      {label}
    </button>
  );
}

// ─── SEÇÃO VISÃO GERAL ────────────────────────────────────────────────────────
function SecaoVisaoGeral() {
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
        <KPICard label="Inadimplentes (Jan/26)" value={fmtMi(ultimo.inad_mi)} sub="consumidores" color={C.vermelho} icon="👥" />
        <KPICard label="Dívidas Negativadas" value={fmtMi(ultimo.dividas_mi)} sub="registros ativos" color={C.azul} icon="📋" />
        <KPICard label="Valor Total" value={fmtBi(ultimo.valor_bi)} sub="em dívidas negativadas" color="#e89c30" icon="💰" />
        <KPICard label="Ticket Médio" value={fmtBRL(ultimo.ticket)} sub="por dívida" color="#7c3aed" icon="🎫" />
        <KPICard label="Dívida Média/CPF" value={fmtBRL(ultimo.divida_media)} sub="por inadimplente" color={C.vermelho} icon="🧾" />
      </div>

      {/* Gráfico principal – série temporal */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Evolução da Inadimplência no Brasil</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Consumidores inadimplentes (milhões) · 2016 – 2026</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={serie} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gradInad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.vermelho} stopOpacity={0.25} />
                <stop offset="95%" stopColor={C.vermelho} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis domain={[55, 85]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}M`} />
            <Tooltip content={<CustomTooltip formatter={(v) => fmtMi(v)} />} />
            <ReferenceLine x="2020-03" stroke="#aaa" strokeDasharray="4 4" label={{ value: "COVID", position: "top", fontSize: 10, fill: "#888" }} />
            <Area type="monotone" dataKey="inad_mi" name="Inadimplentes" stroke={C.vermelho} strokeWidth={2.5} fill="url(#gradInad)" dot={false} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos secundários */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: C.preto }}>Valor Total das Dívidas (R$ bi)</h3>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>Crescimento acelerado pós-2021</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={serie} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.azul} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={C.azul} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}`} />
              <Tooltip content={<CustomTooltip formatter={v => fmtBi(v)} />} />
              <Area type="monotone" dataKey="valor_bi" name="Valor total" stroke={C.azul} strokeWidth={2} fill="url(#gradValor)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: C.preto }}>Dívida Média por CPF (R$)</h3>
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

// ─── SEÇÃO PERFIL ─────────────────────────────────────────────────────────────
function SecaoPerfil() {
  const comFaixa = RAW.serie_temporal.filter(d => d.fx_25 != null);

  const [metrica, setMetrica] = useState("faixa");

  const faixaLabels = [
    { key: "fx_25", name: "Até 25 anos", color: C.azulClaro },
    { key: "fx_26_40", name: "26–40 anos", color: C.azul },
    { key: "fx_41_60", name: "41–60 anos", color: "#e89c30" },
    { key: "fx_60", name: "Acima 60 anos", color: C.vermelho },
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
                <div style={{ fontSize: 22, fontWeight: 800, color: C.preto }}>{fmtPct(v.fim)}</div>
                <div style={{ fontSize: 11, color: +v.delta > 0 ? C.vermelho : "#059669", fontWeight: 600 }}>
                  {+v.delta > 0 ? "▲" : "▼"} {Math.abs(+v.delta)} pp (2019→2026)
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Inadimplência por Faixa Etária (%)</h3>
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
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderTop: `4px solid ${C.vermelho}` }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Feminino (Jan/26)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.preto }}>{fmtPct(ultimo.fem_pct)}</div>
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderTop: `4px solid ${C.azul}` }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Masculino (Jan/26)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.preto }}>{fmtPct(ultimo.mas_pct)}</div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Participação por Gênero (%)</h3>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>% do total de inadimplentes · 2019 – 2026</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={comFaixa} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} domain={[0.49, 0.52]} />
                <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="fem_pct" name="Feminino" stroke={C.vermelho} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mas_pct" name="Masculino" stroke={C.azul} strokeWidth={2.5} dot={false} />
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

// ─── SEÇÃO SETORES ────────────────────────────────────────────────────────────
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
  const pieColors = [C.vermelho, C.azul];

  const setorDetalhes = [
    { key: "bancos", name: "Bancos e Cartões", color: "#3b82f6" },
    { key: "utilities", name: "Utilities", color: "#10b981" },
    { key: "financeiras", name: "Financeiras", color: C.vermelho },
    { key: "servicos", name: "Serviços", color: "#f59e0b" },
    { key: "varejo", name: "Varejo", color: "#8b5cf6" },
    { key: "telefonia", name: "Telefonia", color: "#06b6d4" },
  ];

  return (
    <div>
      {/* Pie charts comparativos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {[{ title: "2019", data: pieData2019 }, { title: "2026", data: pieData2026 }].map(({ title, data }) => (
          <div key={title} style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", textAlign: "center" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, color: C.preto }}>Participação por Capital – {title}</h3>
            <ResponsiveContainer width="100%" height={200}>
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
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Capital Financeiro vs. Não Financeiro (%)</h3>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888" }}>Participação no total de dívidas negativadas · 2019 – 2026</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={dados} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gFin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.vermelho} stopOpacity={0.3} />
                <stop offset="95%" stopColor={C.vermelho} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tickFormatter={fmtMes} interval={11} tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `${(v*100).toFixed(0)}%`} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={v => fmtPct(v)} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="fin_total" name="Financeiro" stroke={C.vermelho} strokeWidth={2} fill="url(#gFin)" />
            <Line type="monotone" dataKey="nfin_total" name="Não Financeiro" stroke={C.azul} strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Linhas por setor */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Participação por Setor (%)</h3>
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

// ─── SEÇÃO ESTADOS ────────────────────────────────────────────────────────────
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
                background: regiaoFiltro === r ? (REGIAO_CORES[r] || C.azul) : "#f3f4f6",
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
                background: ordenar === k ? C.azul : "#f3f4f6",
                color: ordenar === k ? "#fff" : "#444", fontWeight: ordenar === k ? 700 : 400 }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: destaque ? "1fr 340px" : "1fr", gap: 16 }}>
        {/* Gráfico de barras */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 14, color: C.preto }}>Taxa de Inadimplência por Estado (Jan/2026)</h3>
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
                  <Cell key={i} fill={entry.estado === destaque ? "#f59e0b" : REGIAO_CORES[entry.regiao] || C.azul} opacity={destaque && entry.estado !== destaque ? 0.5 : 1} />
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
                <span style={{ fontSize: 24, fontWeight: 900, color: C.preto }}>{estadoInfo.sigla}</span>
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
                <span style={{ fontWeight: 700, color: C.preto }}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scatter: urbanização x inadimplência */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,.07)", marginTop: 16 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 14, color: C.preto }}>Urbanização × Taxa de Inadimplência</h3>
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

// ─── SEÇÃO CONTEXTO ────────────────────────────────────────────────────────────
function SecaoContexto() {
  const serie = RAW.serie_temporal;
  const ultimo = serie[serie.length-1];
  const primeiroSerie = serie[0];

  const insights = [
    {
      titulo: "Urbanização eleva endividamento?",
      corpo: "Os 5 estados mais inadimplentes do Brasil estão entre os 6 mais urbanizados. A maior oferta de crédito digital em áreas urbanas facilita o endividamento impulsivo.",
      cor: C.vermelho, icone: "🏙️",
    },
    {
      titulo: "Custo de vida e inadimplência",
      corpo: "DF, RJ e SP estão entre os 4 estados com maior custo de vida e também possuem altíssimas taxas de inadimplência. O Paraná (maior custo de vida) é exceção — tem programa de educação financeira nas escolas desde 2021.",
      cor: C.azul, icone: "💸",
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
        <h3 style={{ margin: "0 0 4px", fontSize: 15, color: C.preto }}>Crescimento Acumulado dos Indicadores</h3>
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
            <Line type="monotone" dataKey="idx_inad" name="Inadimplentes" stroke={C.vermelho} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="idx_valor" name="Valor total das dívidas" stroke={C.azul} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="idx_divida" name="Dívida média/CPF" stroke="#e89c30" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {insights.slice(0, 4).map((ins, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderLeft: `4px solid ${ins.cor}` }}>
            <div style={{ fontSize: 16, marginBottom: 6 }}>{ins.icone} <strong style={{ fontSize: 13, color: C.preto }}>{ins.titulo}</strong></div>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{ins.corpo}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderLeft: `4px solid ${insights[4].cor}` }}>
        <div style={{ fontSize: 16, marginBottom: 6 }}>{insights[4].icone} <strong style={{ fontSize: 13, color: C.preto }}>{insights[4].titulo}</strong></div>
        <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{insights[4].corpo}</p>
      </div>
    </div>
  );
}

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
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: C.fundo, minHeight: "100vh", padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ background: C.preto, borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>
            🇧🇷 Inadimplência no Brasil
          </h1>
          <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 12 }}>
            Dashboard interativo · Dados Serasa 2016–2026 · IBGE
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: C.vermelho, fontSize: 28, fontWeight: 900, lineHeight: 1 }}>81,3 mi</div>
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
