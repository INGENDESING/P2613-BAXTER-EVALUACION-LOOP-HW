/**
 * DATA MODULE - P2613 Project Web
 * Contains all structured data for scenarios, equipment, documents, and conclusions.
 */

const PROJECT = {
  code: "P2613",
  title: "Evaluacion Loop de Agua Nueva Condicion",
  client: "Laboratorios Baxter S.A.",
  location: "Cali, Colombia",
  executor: "DML Ingenieros Consultores S.A.S.",
  engineers: [
    { role: "Proceso", name: "J. Arboleda" },
    { role: "Revisor", name: "H. Rosero" },
    { role: "PM", name: "F. Navia" }
  ],
  document: "P2613-PR-INF-001 REV0",
  date: "29/04/2026",
  status: "Emitido para Aprobacion / Comentarios"
};

const SCENARIOS = [
  { id: 1,  code: "ESC-01", name: "Operacion normal / sin sanitizacion",                q: 41.3,  p: null,   v: 0.57, re: 129230, status: "na",       label: "N/A" },
  { id: 2,  code: "ESC-02", name: "Enjuague de un tanque",                            q: 12.3,  p: 58.97,  v: 0.17, re: 38395,  status: "cumple",   label: "Cumple" },
  { id: 3,  code: "ESC-03", name: "Enjuague de una linea",                            q: 52.8,  p: 44.88,  v: 0.73, re: 165498, status: "cumple-s", label: "Cumple*" },
  { id: 4,  code: "ESC-04", name: "Sanitizacion de un tanque",                        q: 12.3,  p: 58.97,  v: 0.17, re: 38395,  status: "cumple",   label: "Cumple" },
  { id: 5,  code: "ESC-05", name: "Sanitizacion de una linea",                        q: 52.8,  p: 44.88,  v: 0.73, re: 165498, status: "cumple-s", label: "Cumple*" },
  { id: 6,  code: "ESC-06", name: "Enjuague simultaneo tanque + linea",               q: 75.2,  p: 56.78,  v: 1.04, re: 235515, status: "nocumple", label: "No cumple" },
  { id: 7,  code: "ESC-07", name: "Enj. tanque + sanit. tanque",                      q: 87.1,  p: 53.72,  v: 1.20, re: 272595, status: "nocumple", label: "No cumple" },
  { id: 8,  code: "ESC-08", name: "Enj. tanque + sanit. linea",                       q: 75.2,  p: 56.78,  v: 1.04, re: 235515, status: "nocumple", label: "No cumple" },
  { id: 9,  code: "ESC-09", name: "Enj. linea + sanit. tanque",                       q: 75.2,  p: 56.78,  v: 1.04, re: 235515, status: "nocumple", label: "No cumple" },
  { id: 10, code: "ESC-10", name: "Enj. linea + sanit. linea",                        q: 97.5,  p: 50.27,  v: 1.35, re: 305343, status: "cumple-s", label: "Cumple*" },
  { id: 11, code: "ESC-11", name: "Sanitizacion simultanea tanque + linea",           q: 75.2,  p: 56.78,  v: 1.04, re: 235515, status: "nocumple", label: "No cumple" },
  { id: 12, code: "ESC-12", name: "Enjuague doble + sanit. tanque",                   q: 84.1,  p: 54.24,  v: 1.16, re: 263276, status: "nocumple", label: "No cumple" },
  { id: 13, code: "ESC-13", name: "Enjuague doble + sanit. linea",                    q: 103.7, p: 47.47,  v: 1.43, re: 324859, status: "nocumple", label: "No cumple" },
  { id: 14, code: "ESC-14", name: "Enj. tanque + sanit. doble",                       q: 103.7, p: 47.47,  v: 1.43, re: 324859, status: "nocumple", label: "No cumple" },
  { id: 15, code: "ESC-15", name: "Enj. linea + sanit. doble",                        q: 109.0, p: 44.99,  v: 1.51, re: 341297, status: "nocumple", label: "No cumple" },
  { id: 16, code: "ESC-16", name: "Maxima demanda simultanea",                        q: 109.0, p: 44.99,  v: 1.51, re: 341297, status: "nocumple", label: "No cumple" },
  { id: 17, code: "ESC-17", name: "Propuesta: Bomba C218 + VDC (doble tanque + doble linea)", q: 146.0, p: 66.50,  v: 2.21, re: 457328, status: "propuesta", label: "Propuesta" }
];

const STATUS_CONFIG = {
  "cumple":   { color: "bg-emerald-500",  text: "text-emerald-700",  bgLight: "bg-emerald-50",  label: "Cumple",   icon: "check-circle" },
  "cumple-s": { color: "bg-blue-500",     text: "text-blue-700",     bgLight: "bg-blue-50",     label: "Cumple*",  icon: "check-circle-2" },
  "nocumple": { color: "bg-rose-500",     text: "text-rose-700",     bgLight: "bg-rose-50",     label: "No cumple", icon: "x-circle" },
  "critico":  { color: "bg-amber-500",    text: "text-amber-700",    bgLight: "bg-amber-50",    label: "Critico",  icon: "alert-triangle" },
  "na":       { color: "bg-slate-400",    text: "text-slate-600",    bgLight: "bg-slate-50",    label: "N/A",      icon: "minus-circle" },
  "propuesta":{ color: "bg-indigo-500",   text: "text-indigo-700",   bgLight: "bg-indigo-50",   label: "Propuesta", icon: "lightbulb" }
};

const EQUIPMENT = [
  {
    id: "bomba-c216",
    name: "Bomba Actual",
    model: "SPXFlow Waukesha C216",
    specs: [
      { label: "Caudal", value: "180 USgpm" },
      { label: "Presion", value: "60 psig" },
      { label: "Potencia", value: "15 hp" },
      { label: "Max. Frecuencia", value: "60 Hz (3600 rpm)" }
    ],
    image: "assets/curvas/fig01_curva_bomba.png",
    category: "Bomba",
    status: "limitada"
  },
  {
    id: "bomba-c218",
    name: "Bomba Propuesta",
    model: "Waukesha C218-2x1.5x8",
    specs: [
      { label: "Caudal", value: "553 lpm (146 USgpm)" },
      { label: "Presion", value: "82.5 m" },
      { label: "Potencia", value: "30 hp" },
      { label: "Frecuencia", value: "58.6 Hz (3516 rpm)" },
      { label: "Impeller", value: "95-07059 (7.75 in)" }
    ],
    image: null,
    category: "Bomba",
    status: "propuesta"
  },
  {
    id: "twister",
    name: "Limpiador Orbital",
    model: "GEA Orbital Cleaner Twister",
    specs: [
      { label: "Boquilla", value: "3 mm" },
      { label: "Caudal", value: "11.9 - 18.8 USgpm" },
      { label: "Presion min.", value: "58 psig (4.0 bar)" },
      { label: "Rango presion", value: "58 - 145 psig" }
    ],
    image: "assets/curvas/fig02_curva_twister.png",
    category: "Rotary Jet",
    status: "activo"
  },
  {
    id: "intercambiador",
    name: "Intercambiador de Calor",
    model: "Teringo BEM",
    specs: [
      { label: "Caudal", value: "100 USgpm" },
      { label: "Capacidad termica", value: "1.46 MW" },
      { label: "Estado", value: "Sin limitacion" }
    ],
    image: null,
    category: "Intercambiador",
    status: "ok"
  },
  {
    id: "filtro",
    name: "Filtro",
    model: "Sartopore 2 (Durapore)",
    specs: [
      { label: "Porosidad", value: "0.45 um" },
      { label: "DP max.", value: "1.7 bar @ 80C" },
      { label: "DP real max.", value: "0.039 bar (ESC-16)" }
    ],
    image: "assets/curvas/fig03_filtro_dp.png",
    category: "Filtro",
    status: "ok"
  },
  {
    id: "valvulas",
    name: "Valvulas",
    model: "GEA Vesta",
    specs: [
      { label: "Tipo", value: "Valvulas de asiento" },
      { label: "Reemplazo", value: "Mariposas convencionales" }
    ],
    image: null,
    category: "Valvula",
    status: "ok"
  }
];

const DOCUMENTS = [
  { item: "1.1", category: "Informes", id: "P2613-PR-INF-001", rev: "0", desc: "Informe Evaluacion Loop de Agua Nueva Condicion", pages: 46, file: "P2613-PR-INF-001.pdf", url: "assets/documentos/P2613-PR-INF-001.pdf" },
  { item: "1.2", category: "Informes", id: "P2613-PR-INF-002", rev: "0", desc: "Informe Evaluacion Loop de Agua Nueva Condicion (version previa)", pages: 30, file: "P2613-PR-INF-002.pdf", url: "assets/documentos/P2613-PR-INF-002.pdf" },
  { item: "1.3", category: "Informes", id: "P2613-PR-INF-003", rev: "0", desc: "Informe Evaluacion Loop de Agua Nueva Condicion (version previa)", pages: 34, file: "P2613-PR-INF-003.pdf", url: "assets/documentos/P2613-PR-INF-003.pdf" },
  { item: "2.1", category: "Hoja de Datos", id: "P2613-PR-DT-001", rev: "1", desc: "Hoja Datos Bomba WFI Agua Caliente", pages: 1, file: "P2613-PR-DT-001 R1.pdf", note: "Excel: P2613-PR-DT-001  REV1 BOMBA.xlsx", url: "assets/documentos/P2613-PR-DT-001 R1.pdf" },
  { item: "2.2", category: "Hoja de Datos", id: "P2613-PR-DT-002", rev: "1", desc: "Datos Bomba INOXPA (corrida proveedor)", pages: 1, file: "P2613-PR-DT-002 REV1 HOJA DATOS BOMBA AC.pdf", url: "assets/documentos/P2613-PR-DT-002 REV1 HOJA DATOS BOMBA AC.pdf" },
  { item: "2.3", category: "Hoja de Datos", id: "P2613-PR-DT-003", rev: "1", desc: "Datos Bomba SXP (corrida proveedor)", pages: 1, file: "P2613-PR-DT-003 REV1 HOJA DATOS BOMBA INOXPA.pdf", url: "assets/documentos/P2613-PR-DT-003 REV1 HOJA DATOS BOMBA INOXPA.pdf" },
  { item: "3.1", category: "Simulaciones", id: "P2613-PR-MC-001", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 1", pages: 1, file: "P2613-PR-MC-001.pdf", url: "assets/documentos/P2613-PR-MC-001.pdf" },
  { item: "3.2", category: "Simulaciones", id: "P2613-PR-MC-002", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 2", pages: 1, file: "P2613-PR-MC-002.pdf", url: "assets/documentos/P2613-PR-MC-002.pdf" },
  { item: "3.3", category: "Simulaciones", id: "P2613-PR-MC-003", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 3", pages: 1, file: "P2613-PR-MC-003.pdf", url: "assets/documentos/P2613-PR-MC-003.pdf" },
  { item: "3.4", category: "Simulaciones", id: "P2613-PR-MC-004", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 4", pages: 1, file: "P2613-PR-MC-004.pdf", url: "assets/documentos/P2613-PR-MC-004.pdf" },
  { item: "3.5", category: "Simulaciones", id: "P2613-PR-MC-005", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 5", pages: 1, file: "P2613-PR-MC-005.pdf", url: "assets/documentos/P2613-PR-MC-005.pdf" },
  { item: "3.6", category: "Simulaciones", id: "P2613-PR-MC-006", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 6", pages: 1, file: "P2613-PR-MC-006.pdf", url: "assets/documentos/P2613-PR-MC-006.pdf" },
  { item: "3.7", category: "Simulaciones", id: "P2613-PR-MC-007", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 7", pages: 1, file: "P2613-PR-MC-007.pdf", url: "assets/documentos/P2613-PR-MC-007.pdf" },
  { item: "3.8", category: "Simulaciones", id: "P2613-PR-MC-008", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 8", pages: 1, file: "P2613-PR-MC-008.pdf", url: "assets/documentos/P2613-PR-MC-008.pdf" },
  { item: "3.9", category: "Simulaciones", id: "P2613-PR-MC-009", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 9", pages: 1, file: "P2613-PR-MC-009.pdf", url: "assets/documentos/P2613-PR-MC-009.pdf" },
  { item: "3.10", category: "Simulaciones", id: "P2613-PR-MC-010", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 10", pages: 1, file: "P2613-PR-MC-010.pdf", url: "assets/documentos/P2613-PR-MC-010.pdf" },
  { item: "3.11", category: "Simulaciones", id: "P2613-PR-MC-011", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 11", pages: 1, file: "P2613-PR-MC-011.pdf", url: "assets/documentos/P2613-PR-MC-011.pdf" },
  { item: "3.12", category: "Simulaciones", id: "P2613-PR-MC-012", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 12", pages: 1, file: "P2613-PR-MC-012.pdf", url: "assets/documentos/P2613-PR-MC-012.pdf" },
  { item: "3.13", category: "Simulaciones", id: "P2613-PR-MC-013", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 13", pages: 1, file: "P2613-PR-MC-013.pdf", url: "assets/documentos/P2613-PR-MC-013.pdf" },
  { item: "3.14", category: "Simulaciones", id: "P2613-PR-MC-014", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 14", pages: 1, file: "P2613-PR-MC-014.pdf", url: "assets/documentos/P2613-PR-MC-014.pdf" },
  { item: "3.15", category: "Simulaciones", id: "P2613-PR-MC-015", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 15", pages: 1, file: "P2613-PR-MC-015.pdf", url: "assets/documentos/P2613-PR-MC-015.pdf" },
  { item: "3.16", category: "Simulaciones", id: "P2613-PR-MC-016", rev: "0", desc: "Simulacion Loop Agua Caliente Escenario 16", pages: 1, file: "P2613-PR-MC-016.pdf", url: "assets/documentos/P2613-PR-MC-016.pdf" },
  { item: "3.17", category: "Simulaciones", id: "P2613-PR-MC-017", rev: "1", desc: "Base Datos Resultados Simulaciones Escenarios", pages: 1, file: "P2613-PR-MC-017.xlsx", note: "Excel", url: "assets/documentos/P2613-PR-MC-017.xlsx" },
  { item: "4.1", category: "Planos", id: "P2613-PR-PL-001", rev: "0", desc: "PFD Diagrama Hidraulica Propuesta", pages: 1, file: "P2613-PR-PL-001.pdf", note: "DWG disponible", url: "assets/documentos/P2613-PR-PL-001.pdf" },
  { item: "TR", category: "Transmittal", id: "P2613-PR-TR-001", rev: "0", desc: "Transmittal Documentos", pages: 1, file: "P2613-PR-TR-001 REV0 TRASMITTAL DOCUMENTOS.pdf", url: "assets/documentos/P2613-PR-TR-001 REV0 TRASMITTAL DOCUMENTOS.pdf" }
];

const CONCLUSIONS = [
  { num: 1, text: "El reemplazo tecnologico de Spray-Ball estaticos por el GEA Orbital Twister (boquilla 3 mm) modifica sustancialmente el punto de operacion del loop WFI, exigiendo una presion minima de suministro de 58 psig (4.0 bar) frente a los 30 psig (2.07 bar) de la configuracion anterior, aunque con un caudal significativamente menor (11.9-18.8 USgpm vs. 45 USgpm)." },
  { num: 2, text: "Las modificaciones As-Built implementadas en el sistema (tuberias de succion 4 in, descarga 3 in; valvulas GEA Vesta) mejoran el margen hidraulico disponible respecto al diagnostico previo P2314, compensando parcialmente el incremento de presion requerido." },
  { num: 3, text: "El balance termico independiente demuestra que el loop WFI mantiene temperaturas finales superiores a 80 C en todos los escenarios de linea evaluados, confirmando la capacidad suficiente del intercambiador de calor Teringo." },
  { num: 4, text: "Los resultados de las simulaciones dinamicas en Pipe-Flo Professional v19.1 demuestran que unicamente 2 de los 16 escenarios operacionales iniciales (Escenarios 2 y 4) cumplen con la presion minima de 58 psig (4.0 bar) exigida por el GEA Twister. Los 13 escenarios restantes que activan el Twister fallan por presion insuficiente. El Escenario 17 (propuesta de mejora) cumple con un margen operacional de 8.5 psig." },
  { num: 5, text: "El margen de presion en los Escenarios 2 y 4 es operacionalmente critico: 0.97 psig (0.07 bar) por encima del limite minimo de 58 psig. Esta holgura no admite degradacion del rendimiento de la bomba, ensuciamiento progresivo del filtro Sartopore 2 ni desviaciones en la curva del VFD sin incurrir en un estado de No cumple." },
  { num: 6, text: "La bomba SPXFlow Waukesha C216 opera a su velocidad maxima de 3600 rpm (60 Hz) en todos los escenarios combinados (6-16) y aun asi no alcanza la presion requerida. Esto confirma que la capacidad hidraulica instalada es insuficiente para las nuevas condiciones operacionales con el GEA Orbital Twister." },
  { num: 7, text: "La simulacion dinamica confirma que la bomba Waukesha C218-2x1.5x8 (30 hp, impeller 7.75 in), combinada con una valvula de control de 2 in en la rama comun de las lineas de llenado al 35% de apertura (Cv = 22.26 Kv), habilita la operacion simultanea de dos tanques con GEA Twister y dos lineas de llenado (Escenario 17). La presion disponible alcanza 66.50 psig (4.59 bar), con margen de 8.5 psig. La instalacion fisica requiere Change Control formal bajo 21 CFR 211.68 y re-calificacion IQ/OQ." }
];

const THERMAL = [
  { scenario: "Linea corta", length: "10 m", diam: "1.5 in", insulation: "Sin", temp: "81.87 C", status: "Cumple" },
  { scenario: "Linea media", length: "30 m", diam: "1.5 in", insulation: "Sin", temp: "81.60 C", status: "Cumple" },
  { scenario: "Linea larga", length: "50 m", diam: "1.5 in", insulation: "Sin", temp: "81.34 C", status: "Cumple" },
  { scenario: "Larga + aislado", length: "50 m", diam: "1.5 in", insulation: "25 mm", temp: "81.85 C", status: "Cumple" }
];

const COMPARISON = [
  { param: "Caudal requerido [USgpm]", sprayball: "45", twister: "11.9 - 18.8", variation: "Reduccion" },
  { param: "Presion minima [psig]", sprayball: "30", twister: "58", variation: "Incremento" },
  { param: "Presion maxima [psig]", sprayball: "30", twister: "145", variation: "Incremento" },
  { param: "Tipo de limpieza", sprayball: "Estatica", twister: "Orbital rotativa", variation: "Upgrade" },
  { param: "Cobertura", sprayball: "Parcial", twister: "360 total", variation: "Mejora" }
];

// Export for module usage if needed, or global scope
if (typeof window !== 'undefined') {
  window.PROJECT = PROJECT;
  window.SCENARIOS = SCENARIOS;
  window.STATUS_CONFIG = STATUS_CONFIG;
  window.EQUIPMENT = EQUIPMENT;
  window.DOCUMENTS = DOCUMENTS;
  window.CONCLUSIONS = CONCLUSIONS;
  window.THERMAL = THERMAL;
  window.COMPARISON = COMPARISON;
}
