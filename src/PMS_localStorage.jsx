
// ASL PMS — localStorage version (runs on any React app locally)
// Data persists in browser localStorage
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ─── ERROR BOUNDARY ────────────────────────────────────────────────────── */
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,fontFamily:"monospace",background:"#1a0a0a",color:"#ff6b6b",minHeight:"100vh"}}>
          <h2 style={{color:"#ff4444",marginBottom:16}}>⚠ App Error — check browser console (F12)</h2>
          <pre style={{background:"#0f0505",padding:16,borderRadius:8,overflow:"auto",fontSize:12}}>
            {this.state.error.toString()}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}


const LOGO_URI = "/logo.png"; // Place logo.png in your project's public/ folder

/* ─── SEED DATA ─────────────────────────────────────────────────────────── */
const SEED_TECHS = [
  {id:"ASL-PF009",first:"Frankline",last:"Rono",gender:"M",role:"Functional Consultant",email:"f.rono@asl.co.ke",phone:""},
  {id:"ASL-PF054",first:"Martin",last:"Muriungi",gender:"M",role:"BC Developer",email:"m.muriungi@asl.co.ke",phone:""},
  {id:"ASL-PF010",first:"Iddah",last:"Juma",gender:"F",role:"Functional Consultant",email:"i.juma@asl.co.ke",phone:""},
  {id:"ASL-PF011",first:"Rosemary",last:"Bagaka",gender:"F",role:"Functional Consultant",email:"r.bagaka@asl.co.ke",phone:""},
  {id:"ASL-PF018",first:"Kennedy",last:"Kirui",gender:"M",role:"BC Developer",email:"k.kirui@asl.co.ke",phone:""},
  {id:"ASL-PF020",first:"Jeffer",last:"Kibuti",gender:"M",role:"BC Developer",email:"j.kibuti@asl.co.ke",phone:""},
  {id:"ASL-PF025",first:"Victor",last:"Okinyi",gender:"M",role:"Functional Consultant",email:"v.okinyi@asl.co.ke",phone:""},
  {id:"ASL-PF026",first:"Peacemark",last:"Kipkorir",gender:"M",role:"Functional Consultant",email:"p.kipkorir@asl.co.ke",phone:""},
  {id:"ASL-PF027",first:"Eva",last:"Kabui",gender:"F",role:"Functional Consultant",email:"e.kabui@asl.co.ke",phone:""},
  {id:"ASL-PF029",first:"Joy",last:"Okoth",gender:"F",role:"Functional Consultant",email:"j.okoth@asl.co.ke",phone:""},
  {id:"ASL-PF031",first:"Frank",last:"Mombo",gender:"M",role:"BC Developer",email:"f.mombo@asl.co.ke",phone:""},
  {id:"ASL-PF035",first:"David",last:"Muema",gender:"M",role:"Portal Developer",email:"d.muema@asl.co.ke",phone:""},
  {id:"ASL-PF036",first:"Joel",last:"Nambala",gender:"M",role:"Portal Developer",email:"j.nambala@asl.co.ke",phone:""},
  {id:"ASL-PF037",first:"Mercy",last:"Jepkorir",gender:"F",role:"Functional Consultant",email:"m.jepkorir@asl.co.ke",phone:""},
  {id:"ASL-PF039",first:"Amos",last:"Odhiambo",gender:"M",role:"Functional Consultant",email:"a.odhiambo@asl.co.ke",phone:""},
  {id:"ASL-PF040",first:"Wedson",last:"Mwiti",gender:"M",role:"Functional Consultant",email:"w.mwiti@asl.co.ke",phone:""},
  {id:"ASL-PF041",first:"Grace",last:"Mwaura",gender:"F",role:"Functional Consultant",email:"g.mwaura@asl.co.ke",phone:""},
  {id:"ASL-PF042",first:"Josephine",last:"Atieno",gender:"F",role:"Functional Consultant",email:"j.atieno@asl.co.ke",phone:""},
  {id:"ASL-PF043",first:"Amon",last:"Kipkoech",gender:"M",role:"BC Developer",email:"a.kipkoech@asl.co.ke",phone:""},
  {id:"ASL-PF044",first:"Collins",last:"Bosire",gender:"M",role:"Functional Consultant",email:"c.bosire@asl.co.ke",phone:""},
  {id:"ASL-PF049",first:"Shadrack",last:"Ngetich",gender:"M",role:"Portal Developer",email:"s.ngetich@asl.co.ke",phone:""},
  {id:"ASL-PF055",first:"Simon",last:"Kipkorir",gender:"M",role:"BC Developer",email:"s.kipkorir@asl.co.ke",phone:""},
  {id:"ASL-PF057",first:"Arnold",last:"Yego",gender:"M",role:"BC Developer",email:"a.yego@asl.co.ke",phone:""},
  {id:"ASL-PF058",first:"Grace",last:"Were",gender:"F",role:"BC Developer",email:"g.were@asl.co.ke",phone:""},
  {id:"ASL-PF059",first:"Purity",last:"Wandondi",gender:"F",role:"BC Developer",email:"p.wandondi@asl.co.ke",phone:""},
  {id:"ASL-PF060",first:"Tonny",last:"Odhiambo",gender:"M",role:"BC Developer",email:"t.odhiambo@asl.co.ke",phone:""},
  {id:"ASL-PF061",first:"Evans",last:"Odoro",gender:"M",role:"Functional Consultant",email:"e.odoro@asl.co.ke",phone:""},
  {id:"ASL-PF062",first:"Brian",last:"Otuka",gender:"M",role:"Functional Consultant",email:"b.otuka@asl.co.ke",phone:""},
  {id:"ASL-PF063",first:"Joshua",last:"Oranga",gender:"M",role:"Functional Consultant",email:"j.oranga@asl.co.ke",phone:""},
  {id:"ASL-PF065",first:"Hellen",last:"Achieng",gender:"F",role:"Functional Consultant",email:"h.achieng@asl.co.ke",phone:""},
  {id:"ASL-PF067",first:"Felix",last:"Gecheo",gender:"M",role:"Portal Developer",email:"f.gecheo@asl.co.ke",phone:""},
  {id:"ASL-PF072",first:"Francis",last:"Mutua",gender:"M",role:"Portal Developer/Sharepoint",email:"f.mutua@asl.co.ke",phone:""},
  {id:"ASL-PF074",first:"Simon",last:"Mnayi",gender:"M",role:"Portal Developer",email:"s.mnayi@asl.co.ke",phone:""},
  {id:"ASL-PF075",first:"Michael",last:"Gituuro",gender:"M",role:"BC Developer",email:"m.gituuro@asl.co.ke",phone:""},
];

const SEED_PROJECTS = [
  {id:"P001",name:"Alupe University",client:"Alupe University",status:"Active",mode:"Onsite",
   contractStart:"2025-01-15",contractEnd:"2025-08-31",contractValue:2800000,currency:"KES",
   phase:"Training & Roll-out",nextPhaseDate:"2025-06-01",
   milestones:[{id:"M1",name:"Project Kickoff",amount:560000,dueDate:"2025-01-15",invoiced:true,paid:true},{id:"M2",name:"Module Configuration",amount:840000,dueDate:"2025-03-15",invoiced:true,paid:false},{id:"M3",name:"Training Delivery",amount:700000,dueDate:"2025-06-15",invoiced:false,paid:false},{id:"M4",name:"Go-Live",amount:700000,dueDate:"2025-08-15",invoiced:false,paid:false}]},
  {id:"P002",name:"Zetech University",client:"Zetech University",status:"Active",mode:"Onsite",
   contractStart:"2025-02-01",contractEnd:"2025-07-31",contractValue:1950000,currency:"KES",
   phase:"Go-Live Support",nextPhaseDate:"2025-06-15",
   milestones:[{id:"M1",name:"Kickoff",amount:390000,dueDate:"2025-02-01",invoiced:true,paid:true},{id:"M2",name:"UAT Complete",amount:585000,dueDate:"2025-04-30",invoiced:true,paid:true},{id:"M3",name:"Go-Live",amount:975000,dueDate:"2025-07-15",invoiced:false,paid:false}]},
  {id:"P003",name:"Kenya Biovax",client:"Kenya Biovax",status:"Active",mode:"Offsite",
   contractStart:"2025-01-01",contractEnd:"2025-09-30",contractValue:3500000,currency:"KES",
   phase:"Data Migration & UAT",nextPhaseDate:"2025-07-01",
   milestones:[{id:"M1",name:"Kickoff",amount:700000,dueDate:"2025-01-01",invoiced:true,paid:true},{id:"M2",name:"Data Migration",amount:1050000,dueDate:"2025-05-01",invoiced:false,paid:false},{id:"M3",name:"UAT Sign-off",amount:1050000,dueDate:"2025-07-31",invoiced:false,paid:false},{id:"M4",name:"Go-Live",amount:700000,dueDate:"2025-09-15",invoiced:false,paid:false}]},
  {id:"P004",name:"SEPU",client:"School Equipment Production Unit",status:"Active",mode:"Onsite",
   contractStart:"2025-03-01",contractEnd:"2025-08-15",contractValue:1200000,currency:"KES",
   phase:"Issue Resolution",nextPhaseDate:"2025-06-30",
   milestones:[{id:"M1",name:"Kickoff",amount:240000,dueDate:"2025-03-01",invoiced:true,paid:true},{id:"M2",name:"Issue Resolution",amount:480000,dueDate:"2025-06-01",invoiced:false,paid:false},{id:"M3",name:"Sign-off",amount:480000,dueDate:"2025-08-01",invoiced:false,paid:false}]},
  {id:"P005",name:"NEPAD/APRM Kenya",client:"NEPAD/APRM KENYA SECRETARIAT",status:"Active",mode:"Onsite",
   contractStart:"2025-04-01",contractEnd:"2025-06-30",contractValue:850000,currency:"KES",
   phase:"EDMS Training",nextPhaseDate:"2025-06-01",
   milestones:[{id:"M1",name:"Training Delivery",amount:425000,dueDate:"2025-05-15",invoiced:false,paid:false},{id:"M2",name:"Final Sign-off",amount:425000,dueDate:"2025-06-30",invoiced:false,paid:false}]},
];

const SEED_DELIVERABLES = [
  "Go-Live Support","End-User Training","Issue Resolution","Data Migration",
  "QA Exercise","Module Roll-out","Sign-off / Acceptance","UAT Review",
  "FRD Compilation","EDMS Training","Post Go-Live Support","Module Configuration",
  "System Review","Pre-Handover Tasks","Portal Issues Fix","Weekly Status Report",
  "Finance Module Work","HR Module Work","Payroll Module Work","Procurement Module",
  "Academic Module","Escalation Handling","Data Validation","Requirements Gathering",
  "System Testing","Documentation","Change Management",
];


/* ─── SEED WEEKLY DATA (Midweek 7 May 2026) ─────────────────────────────── */
// Pre-populated from actual midweek review results
// Key format: "{week}_{checkpoint}" -> { "{allocId}_{taskIdx}": {status, note} }
// Since allocIds are generated at runtime we store by project+task index
// and apply during first load via a helper
const MIDWEEK_REVIEW = {
  "MUA":       ["not","not","done","not","not"],
  "Alupe University": ["not","not","not","not","not"],
  "Catholic University": ["not","not","not","not"],
  "NEPAD":     ["not","done","not","not"],
  "SEPU":      ["not","not","not","not"],
  "Tharaka":   ["not","done","not","not"],
  "Leonardo":  ["done","done","not","not"],
  "AUA":       ["not","not","not","not","not"],
  "KCAU":      ["done","not","not","not"],
  "KRB":       ["not","not","not","not"],
  "NGAAF":     ["done","done","not","not"],
  "KCIC":      ["done","done","not","not"],
  "Egoji":     ["not","not","done","not"],
  "Meru":      ["not","not","not","not"],
  "EASA":      ["not","not","not","not"],
  "Kipre":     ["not","not","not","not"],
  "Karatina":  ["not","not","not","not"],
  "Embu University": ["not","not","not","not"],
  "CAK":       ["done","not","not","not"],
  "KEFRI":     ["done","not","not","not"],
  "Kenivest":  ["not","not","not","not"],
  "NIBS":      ["not","not","done","done","not","not"],
  "KUCCPS":    ["done","not","not","not"],
  "AAAG":      ["not","not","not","not"],
  "Biovax":    ["not","not","not","not","not"],
  "Zetech":    ["done","done","done","not"],
};
const MIDWEEK_NOTES_SEED = {
  "KCAU_2":    "HR & Operations - done",
  "KRB_0":"Awaiting clients feedback","KRB_1":"Awaiting clients feedback",
  "KRB_2":"Awaiting clients feedback","KRB_3":"Awaiting clients feedback",
  "CAK_1":"Experienced challenges with the system environment",
  "EASA_0":"Out of 72 issues raised 14 are remaining",
  "EASA_1":"Ongoing","EASA_2":"Ongoing",
  "Egoji_0":"Student affairs done, practicum done, admission, student management",
  "Egoji_2":"Academic module",
  "KCIC_2":"CRM roll-out ongoing; partnership not done",
  "KUCCPS_0":"Ongoing. HR staff did not avail themselves for review",
  "KUCCPS_1":"Ongoing","KUCCPS_2":"Ongoing",
  "Kenivest_1":"To share training report and attendance",
  "Zetech_1":"Ongoing",
  "Tharaka_1":"Resolved",
};

const ALL_PROJECTS_LIST = [
  "Abony Dairy Ltd","Adventist University of Africa","Alupe University","Assets Recovery Agency",
  "Bomet University College - ERP -SLA","Bomet University College - EDMS","Catholic University",
  "Competition Authority Of Kenya","Council Of Governors","Creative Consolidated",
  "East Africa School Of Aviation","Egoji Teachers College",
  "Elizabeth Glaser Pediatric AIDS Foundation (EGPAF)","Embu University","Emurua Dikirr TTI",
  "Imperial College of Medical and Health Science","Inspectorate EA","JKUAT SRBS","KALRO",
  "Karatina University","KCA University","Kenya Climate Smart Agriculture Project (KCSA)",
  "KELCOP(Kenya Livestock Commercialization Project)","Kenya Biovax",
  "KENYA CLIMATE INNOVATION CENTRE","Kenya Forest Research Institute","Kenya Investment Authority",
  "Kenya National Qualification Authority","Kenya Primates Research Institute","Kenya Railways",
  "Kenya Roads Board","Kenya Scouts Association","Kenya Universities and Colleges Central Placement",
  "Kenya Water Institute","Kenyatta University Teaching & Referral Hospital","Kimasian TVC",
  "Leonardo Technologies & Services Ltd","Machakos Teachers College","Mama Ngina University College",
  "Management University of Africa","Maseno University","Mathioya TVC",
  "Pastoralist Girls Initiative (PGI)","Meru University of Science and Technology",
  "Migori County Assembly","Mukurweini Wakulima Dairy","Multimedia University",
  "Murang'a University of Technology","MURBS","NACADA","Nairobi Centre for International Arbitration",
  "National Cereals Produce Board","National Drought Management Authority","National Museums of Kenya",
  "NEPAD/APRM KENYA SECRETARIAT","NIBS Technical College","Office Of the Auditor General",
  "Omuga TVC","Pastoralist Girls Initiative","PCEA Kahawa Sukarish Parish",
  "Policyholder's Compensation Fund-CMS","Policyholder's Compensation Fund-ERP",
  "Public Sectors Accounting Standard Board","School Equipment Production Unit","Seme TVC",
  "Siala TTI","SOT TTI","Taita Taveta University","Teleposta Pension Scheme","Tharaka University",
  "Tom Mboya University College ERP","Ugunja TVC","Umma University","Universities Fund",
  "University East Africa Baraton","Weston Hotel","Wetlands International 2","Zetech University",
].sort();

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2,10);
const fmt = (n) => new Intl.NumberFormat("en-KE").format(n||0);
const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
};
const roleColor = (role) => {
  if (role?.includes("Functional")) return {bg:"#E1F5EE",fg:"#0F6E56"};
  if (role?.includes("BC")) return {bg:"#E6F1FB",fg:"#185FA5"};
  return {bg:"#FAEEDA",fg:"#854F0B"};
};
const statusColor = (s) => ({
  Active:{bg:"#E1F5EE",fg:"#0F6E56"},
  "On Hold":{bg:"#FAEEDA",fg:"#854F0B"},
  Completed:{bg:"#E6F1FB",fg:"#185FA5"},
  Cancelled:{bg:"#FEEBEB",fg:"#9C0006"},
}[s]||{bg:"#F0F0F0",fg:"#555"});

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const S = {
  app:{fontFamily:"'DM Sans', 'Segoe UI', sans-serif",minHeight:"100vh"},
  appDark:{background:"#0F1923",color:"#E8EDF2"},
  appLight:{background:"#F0F4F8",color:"#1A2535"},
  sidebar:{width:220,display:"flex",flexDirection:"column",padding:"20px 0",position:"fixed",top:0,bottom:0,left:0,zIndex:100},
  sidebarDark:{background:"#0A1118",borderRight:"1px solid #1E2A36"},
  sidebarLight:{background:"#FFFFFF",borderRight:"1px solid #D1D9E0"},
  sideTitle:{padding:"12px 20px 16px",borderBottom:"1px solid #1E2A36",marginBottom:12},
  navItem:(a)=>({display:"flex",alignItems:"center",gap:10,padding:"10px 20px",cursor:"pointer",
    background:a?"#1B2A3B":"transparent",borderLeft:a?"3px solid #3B82F6":"3px solid transparent",
    color:a?"#60A5FA":"#8899AA",fontSize:13,fontWeight:a?600:400,transition:"all 0.15s",userSelect:"none"}),
  main:{marginLeft:220,padding:"24px",minHeight:"100vh",transition:"background 0.2s"},
  card:{border:"1px solid #1E2A36",borderRadius:12,padding:"20px"},
  cardLight:{background:"#FFFFFF",border:"1px solid #D1D9E0"},
  cardDark:{background:"#131F2E",border:"1px solid #1E2A36"},
  cardSm:{background:"#131F2E",border:"1px solid #1E2A36",borderRadius:10,padding:"14px"},
  row:{display:"flex",gap:12,flexWrap:"wrap"},
  col:{display:"flex",flexDirection:"column",gap:10},
  hdr:{fontSize:22,fontWeight:700,color:"#E8EDF2",marginBottom:4},
  subhdr:{fontSize:13,color:"#6B8099"},
  label:{fontSize:11,fontWeight:600,color:"#6B8099",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4},
  input:{border:"1px solid #263548",borderRadius:8,padding:"9px 12px",
    fontSize:13,width:"100%",outline:"none"},
  inputDark:{background:"#0F1923",color:"#E8EDF2",borderColor:"#263548"},
  inputLight:{background:"#FFFFFF",color:"#1A2535",borderColor:"#C5D0DB"},
  select:{border:"1px solid #263548",borderRadius:8,padding:"9px 12px",
    fontSize:13,width:"100%",outline:"none"},
  selectDark:{background:"#0F1923",color:"#E8EDF2"},
  selectLight:{background:"#FFFFFF",color:"#1A2535",borderColor:"#C5D0DB"},
  btn:(v)=>({padding:"9px 18px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
    ...(v==="primary"?{background:"#3B82F6",color:"#fff"}:
       v==="danger"?{background:"#DC2626",color:"#fff"}:
       v==="success"?{background:"#10B981",color:"#fff"}:
       v==="ghost"?{background:"transparent",color:"#6B8099",border:"1px solid #263548"}:
       {background:"#1E2A36",color:"#E8EDF2"})}),
  badge:(bg,fg)=>({background:bg,color:fg,padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}),
  table:{width:"100%",borderCollapse:"collapse"},
  th:{padding:"10px 12px",textAlign:"left",fontSize:11,fontWeight:600,color:"#6B8099",
    textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:"1px solid #1E2A36"},
  td:{padding:"10px 12px",fontSize:13,color:"#C8D8E8",borderBottom:"1px solid #1A2535"},
  modal:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",
    display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000},
  modalBox:{background:"#131F2E",border:"1px solid #263548",borderRadius:16,padding:28,
    width:"min(640px,95vw)",maxHeight:"85vh",overflowY:"auto"},
  alert:{padding:"12px 16px",borderRadius:8,marginBottom:8,fontSize:13},
};

/* ─── STORAGE HOOK ───────────────────────────────────────────────────────── */
function useStorage(key, init) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : init;
    } catch(_) { return init; }
  });
  const [loaded] = useState(true);
  const save = useCallback((val) => {
    setData(val);
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {
      console.warn('localStorage quota reached:', e);
    }
  }, [key]);
  return [data, save, loaded];
}

/* ══════════════════════════════════════════════════════════════════════════ */
function AppInner() {
  const [lightMode, setLightMode] = useState(() => {
    try { return localStorage.getItem("pms_theme") === "light"; } catch(_) { return false; }
  });

  useEffect(() => {
    const id = "pms-light-styles";
    let el = document.getElementById(id);
    if (lightMode) {
      if (!el) { el = document.createElement("style"); el.id = id; document.head.appendChild(el); }
      el.textContent = ".pms-light input,.pms-light select{background:#fff!important;color:#1a2535!important;border-color:#c5d0db!important}";
    } else {
      if (el) el.remove();
    }
  }, [lightMode]);

  // Load SheetJS for Excel export
  useEffect(() => {
    if (!window.XLSX) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      document.head.appendChild(s);
    }
  }, []);
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [showChangePin, setShowChangePin] = useState(false);
  const [techs, saveTechs] = useStorage("pms_techs", SEED_TECHS);
  const [projects, saveProjects] = useStorage("pms_projects", SEED_PROJECTS);
  const [allocations, saveAllocs] = useStorage("pms_allocs", []);
  const [weeklyData, saveWeekly, weeklyLoaded] = useStorage("pms_weekly", {});

  // Seed midweek data from actual review results (runs once when allocations load)
  useEffect(() => {
    if (!weeklyLoaded || !allocations.length) return;
    const WEEK = "2026-W19";
    const KEY  = `${WEEK}_midweek`;
    // Only seed if no data exists yet for this week
    const existing = weeklyData[KEY];
    if (existing && Object.keys(existing).length > 0) return;
    const seeded = {};
    allocations.forEach(a => {
      const proj = projects.find(p => p.id === a.projectId);
      const projName = proj?.name || "";
      const results = MIDWEEK_REVIEW[projName];
      if (!results) return;
      const tasks = a.tasks?.length ? a.tasks : [a.deliverable];
      tasks.forEach((_, ti) => {
        const st = results[ti];
        if (!st) return;
        const noteKey = `${projName}_${ti}`;
        seeded[`${a.id}_${ti}`] = {
          status: st === "done" ? "✅ Done" : "❌ Not Done",
          note: MIDWEEK_NOTES_SEED[noteKey] || ""
        };
      });
      seeded[`${a.id}_client`] = "Available";
    });
    if (Object.keys(seeded).length > 0) {
      saveWeekly({ ...weeklyData, [KEY]: seeded });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeklyLoaded, allocations.length]);
  const [alerts, setAlerts] = useState([]);

  // Compute contract / milestone alerts
  useEffect(() => {
    const a = [];
    projects.forEach(p => {
      const d = daysUntil(p.contractEnd);
      if (d !== null && d >= 0 && d <= 30) a.push({type:"contract",level:d<=7?"danger":"warning",msg:`${p.name}: contract ends in ${d} day${d===1?"":"s"}`,pid:p.id});
      const nd = daysUntil(p.nextPhaseDate);
      if (nd !== null && nd >= 0 && nd <= 14) a.push({type:"phase",level:nd<=3?"danger":"warning",msg:`${p.name}: next phase "${p.phase}" in ${nd} day${nd===1?"":"s"}`,pid:p.id});
      p.milestones?.forEach(m => {
        if (!m.invoiced) {
          const md = daysUntil(m.dueDate);
          if (md !== null && md >= 0 && md <= 14) a.push({type:"invoice",level:md<=3?"danger":"warning",msg:`${p.name} — ${m.name}: invoice due in ${md} days (KES ${fmt(m.amount)})`,pid:p.id});
        }
      });
    });
    setAlerts(a);
  }, [projects]);

  if (!authed) return <Login onAuth={() => setAuthed(true)} />;

  const navItems = [
    {id:"dashboard",icon:"⊞",label:"Dashboard"},
    {id:"projects",icon:"◈",label:"Projects"},
    {id:"techs",icon:"◉",label:"Technicians"},
    {id:"allocations",icon:"⊛",label:"Allocations"},
    {id:"weekly",icon:"☑",label:"Weekly Tracker"},
    {id:"reports",icon:"◧",label:"Reports"},
    {id:"alerts",icon:"⚠",label:`Alerts ${alerts.length>0?`(${alerts.length})`:""}`,badge:alerts.filter(a=>a.level==="danger").length},
  ];

  return (
    <div style={{...S.app,...(lightMode?S.appLight:S.appDark)}} className={lightMode?"pms-light":"pms-dark"}>
      {/* Sidebar */}
      <div style={{...S.sidebar,...(lightMode?S.sidebarLight:S.sidebarDark)}}>
        <div style={S.sideTitle}>
          <img src={LOGO_URI} alt="AppKings Solutions" style={{width:140,height:"auto",marginBottom:8,display:"block"}} />
          <div style={{fontSize:12,color:"#3d5e66",marginTop:2,letterSpacing:"0.08em",textTransform:"uppercase"}}>Project Management System-FRED</div>
        </div>
        {navItems.map(n => (
          <div key={n.id} style={S.navItem(page===n.id)} onClick={() => setPage(n.id)}>
            <span style={{fontSize:16}}>{n.icon}</span>
            <span>{n.label}</span>
            {n.badge>0 && <span style={{...S.badge("#DC2626","#fff"),marginLeft:"auto",minWidth:18,textAlign:"center"}}>{n.badge}</span>}
          </div>
        ))}
        <div style={{marginTop:"auto",padding:"16px 20px",borderTop:"1px solid #1E2A36"}}>
          <div style={{fontSize:11,color:"#3D5266",marginBottom:6}}>Logged in as Admin</div>
          <div style={{fontSize:12,color:"#60A5FA",cursor:"pointer",marginBottom:4}} onClick={()=>setShowChangePin(true)}>🔑 Change PIN</div>
          <div style={{fontSize:12,color:"#A0B4C8",cursor:"pointer",marginBottom:4}} onClick={()=>{const n=!lightMode;setLightMode(n);try{localStorage.setItem("pms_theme",n?"light":"dark");}catch(_){}}}>  {lightMode?"🌙 Dark mode":"☀ Light mode"}</div>
          <div style={{fontSize:12,color:"#4A6480",cursor:"pointer"}} onClick={() => setAuthed(false)}>Sign out →</div>
        </div>
      </div>

      {/* Main */}
      <div style={{...S.main,background:lightMode?"#F0F4F8":"transparent"}}>
        {page==="dashboard" && <Dashboard projects={projects} techs={techs} allocations={allocations} alerts={alerts} setPage={setPage} />}
        {page==="projects" && <Projects projects={projects} saveProjects={saveProjects} />}
        {page==="techs" && <TechsPage techs={techs} saveTechs={saveTechs} allocations={allocations} />}
        {page==="allocations" && <Allocations allocations={allocations} saveAllocs={saveAllocs} projects={projects} techs={techs} />}
        {page==="weekly" && <WeeklyTracker projects={projects} techs={techs} allocations={allocations} weeklyData={weeklyData} saveWeekly={saveWeekly} />}
        {page==="reports" && <Reports projects={projects} techs={techs} allocations={allocations} weeklyData={weeklyData} saveProjects={saveProjects} saveTechs={saveTechs} saveAllocs={saveAllocs} saveWeekly={saveWeekly} />}
        {page==="alerts" && <AlertsPage alerts={alerts} projects={projects} setPage={setPage} />}
      </div>
      {showChangePin && <ChangePinModal onClose={()=>setShowChangePin(false)} />}
    </div>
  );
}

/* ─── LOGIN ──────────────────────────────────────────────────────────────── */
function getStoredPin() {
  try { return localStorage.getItem("pms_admin_pin") || "1234"; } catch(_) { return "1234"; }
}
function setStoredPin(p) {
  try { localStorage.setItem("pms_admin_pin", p); } catch(_) {}
}

function Login({onAuth}) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  const try_ = () => {
    if(pin === getStoredPin()) { onAuth(); }
    else { setErr(true); setPin(""); setTimeout(()=>setErr(false),1800); }
  };
  return (
    <div style={{...S.app,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{...S.card,width:360,textAlign:"center"}}>
        <img src={LOGO_URI} alt="AppKings Solutions" style={{width:160,height:"auto",margin:"0 auto 16px",display:"block"}} />
        <div style={{fontSize:13,color:"#4A6480",marginBottom:24}}>Project Management System</div>
        <div style={{...S.label,textAlign:"left"}}>Admin PIN</div>
        <input style={{...S.input,letterSpacing:8,fontSize:20,textAlign:"center",marginBottom:12,
          borderColor:err?"#DC2626":"#263548"}}
          type="password" maxLength={6} value={pin}
          onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&try_()} placeholder="••••" autoFocus />
        {err && <div style={{color:"#DC2626",fontSize:12,marginBottom:8}}>Incorrect PIN. Try again.</div>}
        <button style={{...S.btn("primary"),width:"100%"}} onClick={try_}>Sign In</button>
      </div>
    </div>
  );
}

function ChangePinModal({onClose}) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState(null);
  const save = () => {
    if(cur !== getStoredPin()) { setMsg({t:"error",s:"Current PIN is incorrect."}); return; }
    if(next.length < 4) { setMsg({t:"error",s:"New PIN must be at least 4 digits."}); return; }
    if(next !== confirm) { setMsg({t:"error",s:"New PINs do not match."}); return; }
    setStoredPin(next);
    setMsg({t:"success",s:"PIN changed successfully!"});
    setTimeout(onClose, 1500);
  };
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{...S.modalBox,width:340}}>
        <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2",marginBottom:20}}>Change Admin PIN</div>
        {[["Current PIN",cur,setCur],["New PIN",next,setNext],["Confirm New PIN",confirm,setConfirm]].map(([l,v,fn])=>(
          <div key={l} style={{marginBottom:12}}>
            <div style={S.label}>{l}</div>
            <input style={{...S.input,letterSpacing:6,textAlign:"center"}} type="password"
              maxLength={6} value={v} onChange={e=>fn(e.target.value)} placeholder="••••" />
          </div>
        ))}
        {msg && <div style={{padding:"8px 12px",borderRadius:6,fontSize:12,marginBottom:12,
          background:msg.t==="success"?"#052E16":"#2D0F0F",
          color:msg.t==="success"?"#6EE7B7":"#FCA5A5"}}>{msg.s}</div>}
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("primary")} onClick={save}>Save PIN</button>
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────────────────────── */
function Dashboard({projects, techs, allocations, alerts, setPage}) {
  const activeProj = projects.filter(p=>p.status==="Active");
  const totalValue = projects.reduce((s,p)=>s+(p.contractValue||0),0);
  const invoiced = projects.flatMap(p=>p.milestones||[]).filter(m=>m.invoiced).reduce((s,m)=>s+(m.amount||0),0);
  const paid = projects.flatMap(p=>p.milestones||[]).filter(m=>m.paid).reduce((s,m)=>s+(m.amount||0),0);
  const dangers = alerts.filter(a=>a.level==="danger");

  const kpis = [
    {label:"Active Projects",value:activeProj.length,sub:`${projects.length} total`,color:"#3B82F6"},
    {label:"Total Contract Value",value:`KES ${fmt(totalValue)}`,sub:`${fmt(invoiced)} invoiced`,color:"#10B981"},
    {label:"Revenue Collected",value:`KES ${fmt(paid)}`,sub:`${Math.round(paid/Math.max(totalValue,1)*100)}% of total`,color:"#8B5CF6"},
    {label:"Team Size",value:techs.length,sub:`${new Set(allocations.map(a=>a.techId)).size} assigned`,color:"#F59E0B"},
  ];

  return (
    <div>
      <div style={{marginBottom:24}}>
        <div style={S.hdr}>Dashboard</div>
        <div style={S.subhdr}>Welcome back. Here's your project overview.</div>
      </div>

      {dangers.length>0 && (
        <div style={{...S.alert,background:"#2D0F0F",border:"1px solid #7F1D1D",color:"#FCA5A5",marginBottom:16,cursor:"pointer"}} onClick={()=>setPage("alerts")}>
          ⚠ {dangers.length} critical alert{dangers.length>1?"s":""} require attention — {dangers[0].msg}
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {kpis.map((k,i)=>(
          <div key={i} style={{...S.cardSm,borderLeft:`3px solid ${k.color}`}}>
            <div style={{fontSize:11,color:"#6B8099",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:20,fontWeight:700,color:"#E8EDF2"}}>{k.value}</div>
            <div style={{fontSize:11,color:"#4A6480",marginTop:2}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:16}}>
        <div style={S.card}>
          <div style={{fontWeight:700,color:"#E8EDF2",marginBottom:14,fontSize:14}}>Active Projects</div>
          {activeProj.map(p => {
            const d = daysUntil(p.contractEnd);
            const inv = (p.milestones||[]).filter(m=>!m.invoiced).length;
            return (
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #1A2535"}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,color:"#C8D8E8",fontSize:13}}>{p.name}</div>
                  <div style={{fontSize:11,color:"#4A6480",marginTop:1}}>{p.phase} · {p.mode}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  {d!==null && d<=30 && <div style={{...S.badge(d<=7?"#7F1D1D":"#451A03",d<=7?"#FCA5A5":"#FCD34D"),marginBottom:3}}>{d}d left</div>}
                  {inv>0 && <div style={{...S.badge("#1E3A5F","#93C5FD"),fontSize:10}}>{inv} pending inv.</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div style={S.card}>
          <div style={{fontWeight:700,color:"#E8EDF2",marginBottom:14,fontSize:14}}>Finance Overview</div>
          {projects.filter(p=>p.status==="Active").map(p => {
            const total = p.contractValue||0;
            const got = (p.milestones||[]).filter(m=>m.paid).reduce((s,m)=>s+m.amount,0);
            const pct = total?Math.round(got/total*100):0;
            return (
              <div key={p.id} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:"#C8D8E8",fontWeight:500}}>{p.name}</span>
                  <span style={{color:"#6B8099"}}>{pct}% collected</span>
                </div>
                <div style={{height:6,background:"#1E2A36",borderRadius:3}}>
                  <div style={{height:"100%",width:`${pct}%`,background:pct>=75?"#10B981":pct>=40?"#F59E0B":"#3B82F6",borderRadius:3,transition:"width 0.3s"}} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────────────────── */
function Projects({projects, saveProjects}) {
  const [modal, setModal] = useState(null); // null | "new" | project
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [milesModal, setMilesModal] = useState(null);

  const shown = projects.filter(p =>
    (filter==="All"||p.status===filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const save = (proj) => {
    if (proj.id) saveProjects(projects.map(p=>p.id===proj.id?proj:p));
    else saveProjects([...projects, {...proj, id:"P"+uid(), milestones:[]}]);
    setModal(null);
  };
  const del = (id) => { if(confirm("Delete project?")) saveProjects(projects.filter(p=>p.id!==id)); };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><div style={S.hdr}>Projects</div><div style={S.subhdr}>{projects.length} total projects</div></div>
        <button style={S.btn("primary")} onClick={()=>setModal({})}>+ New Project</button>
      </div>

      <div style={{...S.card,marginBottom:16}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <input style={{...S.input,width:260}} placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} />
          {["All","Active","On Hold","Completed","Cancelled"].map(s=>(
            <button key={s} style={{...S.btn(filter===s?"primary":"ghost"),padding:"8px 14px",fontSize:12}} onClick={()=>setFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gap:12}}>
        {shown.map(p => {
          const d = daysUntil(p.contractEnd);
          const totalPaid = (p.milestones||[]).filter(m=>m.paid).reduce((s,m)=>s+m.amount,0);
          const pct = p.contractValue ? Math.round(totalPaid/p.contractValue*100) : 0;
          const pendingInv = (p.milestones||[]).filter(m=>!m.invoiced).length;
          const sc = statusColor(p.status);
          return (
            <div key={p.id} style={{...S.card,display:"grid",gridTemplateColumns:"1fr auto",gap:12}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontWeight:700,fontSize:15,color:"#E8EDF2"}}>{p.name}</span>
                  <span style={S.badge(sc.bg,sc.fg)}>{p.status}</span>
                  {d!==null && d>=0 && d<=30 && <span style={S.badge(d<=7?"#7F1D1D":"#451A03",d<=7?"#FCA5A5":"#FCD34D")}>Contract: {d}d</span>}
                  {pendingInv>0 && <span style={S.badge("#1E1A5F","#A5B4FC")}>{pendingInv} invoice(s) pending</span>}
                </div>
                <div style={{display:"flex",gap:16,fontSize:12,color:"#6B8099",marginBottom:8,flexWrap:"wrap"}}>
                  <span>📅 {p.contractStart} → {p.contractEnd}</span>
                  <span>💰 KES {fmt(p.contractValue)}</span>
                  <span>📍 {p.mode}</span>
                  <span>🔄 Phase: {p.phase}</span>
                  {p.nextPhaseDate && <span style={daysUntil(p.nextPhaseDate)<=7?{color:"#FCD34D"}:{}}>⏭ Next phase: {p.nextPhaseDate}</span>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{flex:1,height:6,background:"#1E2A36",borderRadius:3}}>
                    <div style={{height:"100%",width:`${pct}%`,background:"#10B981",borderRadius:3}} />
                  </div>
                  <span style={{fontSize:11,color:"#4A6480"}}>{pct}% collected (KES {fmt(totalPaid)})</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                <button style={{...S.btn(),fontSize:11,padding:"6px 10px"}} onClick={()=>setModal(p)}>Edit</button>
                <button style={{...S.btn(),fontSize:11,padding:"6px 10px",color:"#60A5FA"}} onClick={()=>setMilesModal(p)}>Milestones</button>
                <button style={{...S.btn("danger"),fontSize:11,padding:"6px 10px"}} onClick={()=>del(p.id)}>Delete</button>
              </div>
            </div>
          );
        })}
        {shown.length===0 && <div style={{...S.card,textAlign:"center",padding:40,color:"#4A6480"}}>No projects found.</div>}
      </div>

      {modal!==null && <ProjectModal proj={modal} onSave={save} onClose={()=>setModal(null)} />}
      {milesModal && <MilestonesModal proj={milesModal} onSave={(p)=>{saveProjects(projects.map(x=>x.id===p.id?p:x));setMilesModal(null);}} onClose={()=>setMilesModal(null)} />}
    </div>
  );
}

function ProjectModal({proj, onSave, onClose}) {
  const [f, setF] = useState({name:"",client:"",status:"Active",mode:"Onsite",contractStart:"",contractEnd:"",contractValue:"",currency:"KES",phase:"",nextPhaseDate:"",...proj});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={S.modalBox}>
        <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2",marginBottom:20}}>{f.id?"Edit Project":"New Project"}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["Project Name","name","text"],["Client","client","text"],["Phase","phase","text"]].map(([l,k,t])=>(
            <div key={k} style={k==="name"?{gridColumn:"1/-1"}:{}}>
              <div style={S.label}>{l}</div>
              <input style={S.input} type={t} value={f[k]||""} onChange={e=>set(k,e.target.value)} />
            </div>
          ))}
          <div><div style={S.label}>Status</div>
            <select style={S.select} value={f.status} onChange={e=>set("status",e.target.value)}>
              {["Active","On Hold","Completed","Cancelled"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Mode</div>
            <select style={S.select} value={f.mode} onChange={e=>set("mode",e.target.value)}>
              {["Onsite","Offsite","Remote","Hybrid"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Contract Start</div><input style={S.input} type="date" value={f.contractStart||""} onChange={e=>set("contractStart",e.target.value)} /></div>
          <div><div style={S.label}>Contract End</div><input style={S.input} type="date" value={f.contractEnd||""} onChange={e=>set("contractEnd",e.target.value)} /></div>
          <div><div style={S.label}>Contract Value (KES)</div><input style={S.input} type="number" value={f.contractValue||""} onChange={e=>set("contractValue",+e.target.value)} /></div>
          <div><div style={S.label}>Next Phase Date</div><input style={S.input} type="date" value={f.nextPhaseDate||""} onChange={e=>set("nextPhaseDate",e.target.value)} /></div>
          <div style={{gridColumn:"1/-1"}}><div style={S.label}>Project Name (from master list)</div>
            <select style={S.select} onChange={e=>e.target.value&&set("name",e.target.value)}>
              <option value="">Pick from master list...</option>
              {ALL_PROJECTS_LIST.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:20}}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("primary")} onClick={()=>onSave(f)}>Save Project</button>
        </div>
      </div>
    </div>
  );
}

function MilestonesModal({proj, onSave, onClose}) {
  const [p, setP] = useState({...proj, milestones:[...(proj.milestones||[])]});
  const add = () => setP(x=>({...x, milestones:[...x.milestones,{id:uid(),name:"",amount:0,dueDate:"",invoiced:false,paid:false}]}));
  const upd = (id,k,v) => setP(x=>({...x, milestones:x.milestones.map(m=>m.id===id?{...m,[k]:v}:m)}));
  const del = (id) => setP(x=>({...x, milestones:x.milestones.filter(m=>m.id!==id)}));
  const total = p.milestones.reduce((s,m)=>s+(+m.amount||0),0);
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{...S.modalBox,width:"min(780px,95vw)"}}>
        <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2",marginBottom:4}}>Financial Milestones — {proj.name}</div>
        <div style={{fontSize:12,color:"#4A6480",marginBottom:16}}>Contract Value: KES {fmt(proj.contractValue)} | Milestones Total: KES {fmt(total)}</div>
        <table style={S.table}>
          <thead><tr>
            {["Milestone","Amount (KES)","Due Date","Invoiced","Paid",""].map(h=><th key={h} style={S.th}>{h}</th>)}
          </tr></thead>
          <tbody>
            {p.milestones.map(m=>(
              <tr key={m.id}>
                <td style={S.td}><input style={{...S.input,padding:"6px 8px"}} value={m.name} onChange={e=>upd(m.id,"name",e.target.value)} /></td>
                <td style={S.td}><input style={{...S.input,padding:"6px 8px",width:130}} type="number" value={m.amount||""} onChange={e=>upd(m.id,"amount",+e.target.value)} /></td>
                <td style={S.td}><input style={{...S.input,padding:"6px 8px",width:130}} type="date" value={m.dueDate||""} onChange={e=>upd(m.id,"dueDate",e.target.value)} /></td>
                <td style={{...S.td,textAlign:"center"}}><input type="checkbox" checked={m.invoiced} onChange={e=>upd(m.id,"invoiced",e.target.checked)} /></td>
                <td style={{...S.td,textAlign:"center"}}><input type="checkbox" checked={m.paid} onChange={e=>upd(m.id,"paid",e.target.checked)} /></td>
                <td style={S.td}><button style={{...S.btn("danger"),padding:"4px 8px",fontSize:11}} onClick={()=>del(m.id)}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:14}}>
          <button style={S.btn()} onClick={add}>+ Add Milestone</button>
          <div style={{display:"flex",gap:8}}>
            <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
            <button style={S.btn("primary")} onClick={()=>onSave(p)}>Save Milestones</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TECHNICIANS ────────────────────────────────────────────────────────── */
function TechsPage({techs, saveTechs, allocations}) {
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [roleF, setRoleF] = useState("All");
  const roles = ["All",...new Set(techs.map(t=>t.role))];
  const shown = techs.filter(t =>
    (roleF==="All"||t.role===roleF) &&
    `${t.first} ${t.last} ${t.id}`.toLowerCase().includes(search.toLowerCase())
  );
  const save = (t) => {
    if(t.id&&techs.find(x=>x.id===t.id)) saveTechs(techs.map(x=>x.id===t.id?t:x));
    else saveTechs([...techs, t]);
    setModal(null);
  };
  const del = (id) => { if(confirm("Remove technician?")) saveTechs(techs.filter(t=>t.id!==id)); };
  const allocCount = (id) => allocations.filter(a=>a.techId===id).length;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><div style={S.hdr}>Technicians</div><div style={S.subhdr}>{techs.length} team members</div></div>
        <button style={S.btn("primary")} onClick={()=>setModal({id:`ASL-PF${String(100+techs.length).slice(1)}`,first:"",last:"",gender:"M",role:"Functional Consultant",email:"",phone:""})}>+ Add Technician</button>
      </div>
      <div style={{...S.card,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap"}}>
        <input style={{...S.input,width:240}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select style={{...S.select,width:200}} value={roleF} onChange={e=>setRoleF(e.target.value)}>
          {roles.map(r=><option key={r}>{r}</option>)}
        </select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {shown.map(t => {
          const rc = roleColor(t.role);
          const cnt = allocCount(t.id);
          return (
            <div key={t.id} style={{...S.cardSm,display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:rc.bg,color:rc.fg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16,flexShrink:0}}>
                {t.first[0]}{t.last[0]}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,color:"#E8EDF2",fontSize:14}}>{t.first} {t.last}</div>
                <div style={{fontSize:11,color:"#4A6480"}}>{t.id}</div>
                <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap"}}>
                  <span style={S.badge(rc.bg,rc.fg)}>{t.role}</span>
                  <span style={S.badge(cnt>0?"#1E3A5F":"#1A2535",cnt>0?"#93C5FD":"#4A6480")}>{cnt} allocation{cnt!==1?"s":""}</span>
                </div>
                {t.email && <div style={{fontSize:11,color:"#3D5266",marginTop:4}}>{t.email}</div>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <button style={{...S.btn(),fontSize:11,padding:"4px 8px"}} onClick={()=>setModal(t)}>Edit</button>
                <button style={{...S.btn("danger"),fontSize:11,padding:"4px 8px"}} onClick={()=>del(t.id)}>Del</button>
              </div>
            </div>
          );
        })}
      </div>
      {modal && <TechModal tech={modal} onSave={save} onClose={()=>setModal(null)} />}
    </div>
  );
}

function TechModal({tech, onSave, onClose}) {
  const [f, setF] = useState({...tech});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={S.modalBox}>
        <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2",marginBottom:20}}>Technician Details</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["Staff ID","id"],["First Name","first"],["Last Name","last"],["Email","email"],["Phone","phone"]].map(([l,k])=>(
            <div key={k}><div style={S.label}>{l}</div><input style={S.input} value={f[k]||""} onChange={e=>set(k,e.target.value)} /></div>
          ))}
          <div><div style={S.label}>Role</div>
            <select style={S.select} value={f.role} onChange={e=>set("role",e.target.value)}>
              {["Functional Consultant","BC Developer","Portal Developer","Portal Developer/Sharepoint"].map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Gender</div>
            <select style={S.select} value={f.gender} onChange={e=>set("gender",e.target.value)}>
              <option value="M">Male</option><option value="F">Female</option>
            </select>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:20}}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("primary")} onClick={()=>onSave(f)}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ─── ALLOCATIONS ────────────────────────────────────────────────────────── */
function Allocations({allocations, saveAllocs, projects, techs}) {
  const [modal, setModal] = useState(false);
  const [filterProj, setFilterProj] = useState("");
  const [filterTech, setFilterTech] = useState("");

  const shown = allocations.filter(a =>
    (!filterProj||a.projectId===filterProj) &&
    (!filterTech||a.techId===filterTech)
  );

  const del = (id) => saveAllocs(allocations.filter(a=>a.id!==id));

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><div style={S.hdr}>Allocations</div><div style={S.subhdr}>{allocations.length} total allocations</div></div>
        <button style={S.btn("primary")} onClick={()=>setModal(true)}>+ New Allocation</button>
      </div>

      <div style={{...S.card,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap"}}>
        <select style={{...S.select,width:220}} value={filterProj} onChange={e=>setFilterProj(e.target.value)}>
          <option value="">All Projects</option>
          {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select style={{...S.select,width:200}} value={filterTech} onChange={e=>setFilterTech(e.target.value)}>
          <option value="">All Technicians</option>
          {techs.map(t=><option key={t.id} value={t.id}>{t.first} {t.last}</option>)}
        </select>
        {(filterProj||filterTech) && <button style={S.btn("ghost")} onClick={()=>{setFilterProj("");setFilterTech("");}}>Clear</button>}
      </div>

      <div style={S.card}>
        {shown.length===0 ? (
          <div style={{textAlign:"center",padding:40,color:"#4A6480"}}>No allocations yet.</div>
        ) : (
          <table style={S.table}>
            <thead><tr>
              {["Project","Technician","Role","Deliverable","Tasks","Mode","Dates",""].map(h=><th key={h} style={S.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {shown.map(a => {
                const proj = projects.find(p=>p.id===a.projectId);
                const tech = techs.find(t=>t.id===a.techId);
                const rc = tech ? roleColor(tech.role) : {bg:"#333",fg:"#999"};
                return (
                  <tr key={a.id}>
                    <td style={{...S.td,fontWeight:600,color:"#C8D8E8"}}>{proj?.name||a.projectId}</td>
                    <td style={S.td}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{width:26,height:26,borderRadius:"50%",background:rc.bg,color:rc.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>
                          {tech?tech.first[0]+tech.last[0]:"?"}
                        </div>
                        <span>{tech?`${tech.first} ${tech.last}`:a.techId}</span>
                      </div>
                    </td>
                    <td style={S.td}><span style={tech?S.badge(rc.bg,rc.fg):{}}>{tech?.role||"—"}</span></td>
                    <td style={{...S.td,maxWidth:160}}><span style={{fontSize:12,color:"#60A5FA"}}>{a.deliverable}</span></td>
                    <td style={{...S.td,maxWidth:200,fontSize:11,color:"#4A6480"}}>{(a.tasks||[]).join("; ")||"—"}</td>
                    <td style={S.td}>{a.mode}</td>
                    <td style={{...S.td,fontSize:11,color:"#4A6480",whiteSpace:"nowrap"}}>{a.dateFrom} → {a.dateTo}</td>
                    <td style={S.td}><button style={{...S.btn("danger"),padding:"4px 8px",fontSize:11}} onClick={()=>del(a.id)}>×</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {modal && <AllocationModal projects={projects} techs={techs} onSave={(a)=>{saveAllocs([...allocations,{...a,id:uid()}]);setModal(false);}} onClose={()=>setModal(false)} />}
    </div>
  );
}

function AllocationModal({projects, techs, onSave, onClose}) {
  const [f, setF] = useState({projectId:"",techId:"",deliverable:"",tasks:[""],mode:"Onsite",dateFrom:"",dateTo:"",notes:""});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const setTask = (i,v) => setF(p=>({...p, tasks:p.tasks.map((t,j)=>j===i?v:t)}));
  const addTask = () => setF(p=>({...p, tasks:[...p.tasks,""]}));
  const delTask = (i) => setF(p=>({...p, tasks:p.tasks.filter((_,j)=>j!==i)}));
  return (
    <div style={S.modal} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={S.modalBox}>
        <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2",marginBottom:20}}>New Allocation</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{gridColumn:"1/-1"}}><div style={S.label}>Project</div>
            <select style={S.select} value={f.projectId} onChange={e=>set("projectId",e.target.value)}>
              <option value="">Select project...</option>
              {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Technician</div>
            <select style={S.select} value={f.techId} onChange={e=>set("techId",e.target.value)}>
              <option value="">Select technician...</option>
              {techs.map(t=><option key={t.id} value={t.id}>{t.first} {t.last} ({t.role.split(" ")[0]})</option>)}
            </select>
          </div>
          <div><div style={S.label}>Deliverable</div>
            <select style={S.select} value={f.deliverable} onChange={e=>set("deliverable",e.target.value)}>
              <option value="">Select deliverable...</option>
              {SEED_DELIVERABLES.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Mode</div>
            <select style={S.select} value={f.mode} onChange={e=>set("mode",e.target.value)}>
              {["Onsite","Offsite","Remote","Hybrid"].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div><div style={S.label}>Date From</div><input style={S.input} type="date" value={f.dateFrom} onChange={e=>set("dateFrom",e.target.value)} /></div>
          <div style={{gridColumn:"1/-1"}}>
            <div style={S.label}>Tasks for this deliverable</div>
            {f.tasks.map((t,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                <input style={{...S.input,flex:1}} value={t} placeholder={`Task ${i+1}...`} onChange={e=>setTask(i,e.target.value)} />
                {f.tasks.length>1 && <button style={{...S.btn("danger"),padding:"0 10px"}} onClick={()=>delTask(i)}>×</button>}
              </div>
            ))}
            <button style={{...S.btn(),fontSize:12,padding:"6px 12px"}} onClick={addTask}>+ Add Task</button>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:20}}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("primary")} onClick={()=>{if(!f.projectId||!f.techId)return alert("Select project & technician");onSave({...f,tasks:f.tasks.filter(t=>t.trim())});}}>Add Allocation</button>
        </div>
      </div>
    </div>
  );
}

/* ─── WEEKLY TRACKER ─────────────────────────────────────────────────────── */
function WeeklyTracker({projects, techs, allocations, weeklyData, saveWeekly}) {
  const [week, setWeek] = useState("2026-W19");  // default to current review week
  const [checkpoint, setCheckpoint] = useState("midweek");

  const key = `${week}_${checkpoint}`;
  const data = weeklyData[key] || {};

  const setStatus = (allocId, taskIdx, status) => {
    const next = {...weeklyData, [key]: {...data, [`${allocId}_${taskIdx}`]: {...(data[`${allocId}_${taskIdx}`]||{}), status}}};
    saveWeekly(next);
  };
  const setNote = (allocId, taskIdx, note) => {
    const next = {...weeklyData, [key]: {...data, [`${allocId}_${taskIdx}`]: {...(data[`${allocId}_${taskIdx}`]||{}), note}}};
    saveWeekly(next);
  };
  const setClient = (allocId, val) => {
    const next = {...weeklyData, [key]: {...data, [`${allocId}_client`]: val}};
    saveWeekly(next);
  };

  const grouped = useMemo(() => {
    const g = {};
    allocations.forEach(a => {
      if (!g[a.projectId]) g[a.projectId] = [];
      g[a.projectId].push(a);
    });
    return g;
  }, [allocations]);

  const totalTasks = allocations.reduce((s,a)=>s+(a.tasks?.length||1),0);
  const doneTasks = Object.entries(data).filter(([k,v])=>!k.endsWith("_client")&&v?.status==="✅ Done").length;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div><div style={S.hdr}>Weekly Tracker</div><div style={S.subhdr}>Track deliverable completion by week</div></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <input style={{...S.input,width:150}} type="week" value={week} onChange={e=>setWeek(e.target.value)} />
          {["midweek","endweek"].map(c=>(
            <button key={c} style={{...S.btn(checkpoint===c?"primary":"ghost"),padding:"8px 16px"}} onClick={()=>setCheckpoint(c)}>
              {c==="midweek"?"Midweek (Wed)":"End-Week (Fri)"}
            </button>
          ))}
          <button style={S.btn("success")} onClick={()=>exportWeeklyCSV(projects,techs,allocations,weeklyData,week)}>⬇ CSV</button>
          <button style={{...S.btn("primary"),background:"#217346"}} onClick={()=>exportWeeklyXLSX(projects,techs,allocations,weeklyData,week)}>⬇ Excel (.xlsx)</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        <div style={{...S.cardSm,borderLeft:"3px solid #3B82F6"}}>
          <div style={{fontSize:11,color:"#6B8099",fontWeight:600,textTransform:"uppercase"}}>Total Tasks</div>
          <div style={{fontSize:24,fontWeight:700,color:"#E8EDF2"}}>{totalTasks}</div>
        </div>
        <div style={{...S.cardSm,borderLeft:"3px solid #10B981"}}>
          <div style={{fontSize:11,color:"#6B8099",fontWeight:600,textTransform:"uppercase"}}>Done</div>
          <div style={{fontSize:24,fontWeight:700,color:"#10B981"}}>{doneTasks}</div>
        </div>
        <div style={{...S.cardSm,borderLeft:`3px solid ${doneTasks/Math.max(totalTasks,1)>=0.5?"#F59E0B":"#DC2626"}`}}>
          <div style={{fontSize:11,color:"#6B8099",fontWeight:600,textTransform:"uppercase"}}>Completion</div>
          <div style={{fontSize:24,fontWeight:700,color:"#E8EDF2"}}>{totalTasks?Math.round(doneTasks/totalTasks*100):0}%</div>
        </div>
      </div>

      {Object.entries(grouped).map(([projId, allocs]) => {
        const proj = projects.find(p=>p.id===projId);
        const projDone = allocs.reduce((s,a)=>{
          const tasks = a.tasks?.length||1;
          let d=0;
          for(let i=0;i<tasks;i++) if(data[`${a.id}_${i}`]?.status==="✅ Done") d++;
          return s+d;
        },0);
        const projTotal = allocs.reduce((s,a)=>s+(a.tasks?.length||1),0);
        const pct = projTotal ? Math.round(projDone/projTotal*100) : 0;
        const isDanger = pct===0 && projTotal>0;
        const isWarning = pct>0 && pct<50;
        return (
          <div key={projId} style={{...S.card,marginBottom:12,borderLeft:`3px solid ${isDanger?"#DC2626":isWarning?"#F59E0B":"#10B981"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{flex:1}}>
                <span style={{fontWeight:700,fontSize:14,color:"#E8EDF2"}}>{proj?.name||projId}</span>
                <span style={{...S.badge(isDanger?"#7F1D1D":isWarning?"#451A03":"#052E16",isDanger?"#FCA5A5":isWarning?"#FCD34D":"#6EE7B7"),marginLeft:8}}>
                  {isDanger?"🔴 DANGER":isWarning?"🟠 WARNING":"🟢 ON TRACK"} — {pct}%
                </span>
              </div>
              <div style={{fontSize:12,color:"#4A6480"}}>{projDone}/{projTotal} tasks done</div>
              <div style={{width:100,height:6,background:"#1E2A36",borderRadius:3}}>
                <div style={{height:"100%",width:`${pct}%`,background:isDanger?"#DC2626":isWarning?"#F59E0B":"#10B981",borderRadius:3}} />
              </div>
            </div>
            {allocs.map(a => {
              const tech = techs.find(t=>t.id===a.techId);
              const rc = tech ? roleColor(tech.role) : {bg:"#333",fg:"#999"};
              const tasks = a.tasks?.length ? a.tasks : [a.deliverable];
              const clientOk = data[`${a.id}_client`] !== "❗ Unavailable";
              return (
                <div key={a.id} style={{marginBottom:10,padding:"10px",background:"#0F1923",borderRadius:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:rc.bg,color:rc.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>
                      {tech?tech.first[0]+tech.last[0]:"?"}
                    </div>
                    <span style={{fontWeight:600,color:"#C8D8E8",fontSize:12}}>{tech?`${tech.first} ${tech.last}`:a.techId}</span>
                    <span style={S.badge(rc.bg,rc.fg)}>{a.deliverable}</span>
                    <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:11,color:"#4A6480"}}>Client:</span>
                      <select style={{...S.select,width:160,padding:"3px 6px",fontSize:11}}
                        value={data[`${a.id}_client`]||"Available"}
                        onChange={e=>setClient(a.id,e.target.value)}>
                        <option>Available</option>
                        <option>❗ Unavailable</option>
                      </select>
                    </div>
                  </div>
                  {tasks.map((task, ti) => {
                    const entry = data[`${a.id}_${ti}`] || {};
                    const st = entry.status || "";
                    return (
                      <div key={ti} style={{display:"grid",gridTemplateColumns:"auto 1fr auto 1fr",gap:6,alignItems:"center",marginBottom:5,fontSize:12}}>
                        <span style={{color:"#4A6480",minWidth:14}}>{ti+1}.</span>
                        <span style={{color:"#C8D8E8"}}>{task}</span>
                        <select style={{...S.select,width:130,padding:"4px 6px",fontSize:11,
                          background:st==="✅ Done"?"#052E16":st==="❌ Not Done"?"#2D0F0F":"#0F1923",
                          color:st==="✅ Done"?"#6EE7B7":st==="❌ Not Done"?"#FCA5A5":"#C8D8E8"}}
                          value={st} onChange={e=>setStatus(a.id,ti,e.target.value)}>
                          <option value="">— Status —</option>
                          <option>✅ Done</option>
                          <option>❌ Not Done</option>
                          <option>🔄 Ongoing</option>
                        </select>
                        <input style={{...S.input,padding:"4px 8px",fontSize:11}} placeholder="Notes / issues..."
                          value={entry.note||""} onChange={e=>setNote(a.id,ti,e.target.value)} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
      {allocations.length===0 && <div style={{...S.card,textAlign:"center",padding:40,color:"#4A6480"}}>No allocations yet. Add allocations first.</div>}
    </div>
  );
}

function exportWeeklyCSV(projects, techs, allocations, weeklyData, week) {
  const rows = [["Week","Checkpoint","Project","Technician","Role","Deliverable","Task","Status","Notes","Client Availability"]];
  ["midweek","endweek"].forEach(cp => {
    const key = `${week}_${cp}`;
    const data = weeklyData[key]||{};
    allocations.forEach(a => {
      const proj = projects.find(p=>p.id===a.projectId);
      const tech = techs.find(t=>t.id===a.techId);
      const tasks = a.tasks?.length ? a.tasks : [a.deliverable];
      const client = data[`${a.id}_client`]||"Available";
      tasks.forEach((task,ti) => {
        const entry = data[`${a.id}_${ti}`]||{};
        rows.push([week, cp==="midweek"?"Midweek (Wed)":"End-Week (Fri)",
          proj?.name||a.projectId, tech?`${tech.first} ${tech.last}`:a.techId,
          tech?.role||"", a.deliverable, task, entry.status||"", entry.note||"", client]);
      });
    });
  });
  const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=`Weekly_Report_${week}.csv`; a.click();
}

/* ─── REPORTS ────────────────────────────────────────────────────────────── */
function Reports({projects, techs, allocations, weeklyData, saveProjects, saveTechs, saveAllocs, saveWeekly}) {
  const [tab, setTab] = useState("tech");
  const [techQuery, setTechQuery] = useState("");
  const [projQuery, setProjQuery] = useState("");

  const foundTechs = techQuery ? techs.filter(t=>`${t.first} ${t.last} ${t.id} ${t.role}`.toLowerCase().includes(techQuery.toLowerCase())) : [];

  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={S.hdr}>Reports</div>
        <div style={S.subhdr}>Query allocations, technician locations, and project summaries</div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["tech","Technician Lookup"],["proj","Project Status"],["finance","Finance Report"],["export","Import / Export"]].map(([id,lbl])=>(
          <button key={id} style={{...S.btn(tab===id?"primary":"ghost"),padding:"8px 16px"}} onClick={()=>setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab==="tech" && (
        <div>
          <div style={{...S.card,marginBottom:16}}>
            <div style={S.label}>Search Technician — Where are they? What are they working on?</div>
            <input style={{...S.input,marginTop:6}} placeholder="Type name, ID or role..." value={techQuery} onChange={e=>setTechQuery(e.target.value)} />
          </div>
          {techQuery && foundTechs.map(t => {
            const myAllocs = allocations.filter(a=>a.techId===t.id);
            const rc = roleColor(t.role);
            return (
              <div key={t.id} style={{...S.card,marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:rc.bg,color:rc.fg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18}}>
                    {t.first[0]}{t.last[0]}
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:16,color:"#E8EDF2"}}>{t.first} {t.last}</div>
                    <div style={{fontSize:12,color:"#4A6480"}}>{t.id} · {t.role}</div>
                  </div>
                  <span style={{...S.badge(myAllocs.length?"#1E3A5F":"#1A2535",myAllocs.length?"#93C5FD":"#4A6480"),marginLeft:"auto"}}>{myAllocs.length} allocation{myAllocs.length!==1?"s":""}</span>
                </div>
                {myAllocs.length===0 ? (
                  <div style={{color:"#4A6480",fontSize:13}}>No current allocations.</div>
                ) : myAllocs.map(a => {
                  const proj = projects.find(p=>p.id===a.projectId);
                  return (
                    <div key={a.id} style={{padding:"10px 12px",background:"#0F1923",borderRadius:8,marginBottom:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <span style={{fontWeight:600,color:"#C8D8E8"}}>{proj?.name||a.projectId}</span>
                        <span style={{...S.badge("#1E1A5F","#A5B4FC"),fontSize:10}}>{a.deliverable}</span>
                        <span style={{...S.badge(a.mode==="Onsite"?"#052E16":"#1A1A3A",a.mode==="Onsite"?"#6EE7B7":"#818CF8"),fontSize:10}}>{a.mode}</span>
                      </div>
                      <div style={{fontSize:11,color:"#4A6480"}}>{a.dateFrom} → {a.dateTo}</div>
                      {a.tasks?.length>0 && (
                        <div style={{marginTop:6,fontSize:11,color:"#3D5266"}}>
                          Tasks: {a.tasks.join(" · ")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {techQuery && foundTechs.length===0 && <div style={{...S.card,textAlign:"center",padding:30,color:"#4A6480"}}>No technicians found.</div>}
        </div>
      )}

      {tab==="proj" && (
        <div>
          <div style={{...S.card,marginBottom:16}}>
            <input style={S.input} placeholder="Filter projects..." value={projQuery} onChange={e=>setProjQuery(e.target.value)} />
          </div>
          {projects.filter(p=>p.name.toLowerCase().includes(projQuery.toLowerCase())).map(p => {
            const myAllocs = allocations.filter(a=>a.projectId===p.id);
            const myTechs = [...new Set(myAllocs.map(a=>a.techId))].map(id=>techs.find(t=>t.id===id)).filter(Boolean);
            const sc = statusColor(p.status);
            const d = daysUntil(p.contractEnd);
            return (
              <div key={p.id} style={{...S.card,marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontWeight:700,fontSize:14,color:"#E8EDF2"}}>{p.name}</span>
                  <span style={S.badge(sc.bg,sc.fg)}>{p.status}</span>
                  {d!==null && <span style={S.badge(d<=7?"#7F1D1D":"#1A2535",d<=7?"#FCA5A5":"#4A6480")}>{d}d to end</span>}
                </div>
                <div style={{display:"flex",gap:20,fontSize:12,color:"#6B8099",marginBottom:8}}>
                  <span>KES {fmt(p.contractValue)}</span>
                  <span>{p.contractStart} → {p.contractEnd}</span>
                  <span>Phase: {p.phase}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {myTechs.map(t=>{const rc=roleColor(t.role);return(
                    <span key={t.id} style={{...S.badge(rc.bg,rc.fg),fontSize:11}}>{t.first} {t.last}</span>
                  );})}
                  {myTechs.length===0 && <span style={{fontSize:12,color:"#4A6480"}}>No technicians assigned</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==="finance" && (
        <div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontWeight:600,color:"#E8EDF2",marginBottom:12}}>Financial Summary</div>
            <table style={S.table}>
              <thead><tr>{["Project","Contract Value","Invoiced","Collected","Outstanding","% Done"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {projects.map(p => {
                  const ms = p.milestones||[];
                  const inv = ms.filter(m=>m.invoiced).reduce((s,m)=>s+m.amount,0);
                  const paid = ms.filter(m=>m.paid).reduce((s,m)=>s+m.amount,0);
                  const outstanding = (p.contractValue||0) - paid;
                  const pct = p.contractValue ? Math.round(paid/p.contractValue*100) : 0;
                  return (
                    <tr key={p.id}>
                      <td style={{...S.td,fontWeight:600,color:"#C8D8E8"}}>{p.name}</td>
                      <td style={S.td}>{fmt(p.contractValue)}</td>
                      <td style={S.td}>{fmt(inv)}</td>
                      <td style={{...S.td,color:"#10B981"}}>{fmt(paid)}</td>
                      <td style={{...S.td,color:outstanding>0?"#FCA5A5":"#6EE7B7"}}>{fmt(outstanding)}</td>
                      <td style={S.td}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:60,height:5,background:"#1E2A36",borderRadius:3}}>
                            <div style={{height:"100%",width:`${pct}%`,background:"#10B981",borderRadius:3}} />
                          </div>
                          <span style={{fontSize:11}}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{background:"#1A2535"}}>
                  <td style={{...S.td,fontWeight:700,color:"#E8EDF2"}}>TOTAL</td>
                  {[
                    projects.reduce((s,p)=>s+(p.contractValue||0),0),
                    projects.flatMap(p=>p.milestones||[]).filter(m=>m.invoiced).reduce((s,m)=>s+m.amount,0),
                    projects.flatMap(p=>p.milestones||[]).filter(m=>m.paid).reduce((s,m)=>s+m.amount,0),
                  ].map((v,i)=><td key={i} style={{...S.td,fontWeight:700,color:"#E8EDF2"}}>{fmt(v)}</td>)}
                  <td style={S.td}></td><td style={S.td}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button style={S.btn("success")} onClick={()=>exportFinanceCSV(projects)}>⬇ Export Finance CSV</button>
        </div>
      )}

      {tab==="export" && (
        <div>
          <div style={{...S.card,marginBottom:16,background:"#0A1118",borderColor:"#263548"}}>
            <div style={{fontSize:12,color:"#4A6480",lineHeight:1.6}}>
              ⬆ <strong style={{color:"#C8D8E8"}}>Import</strong>: load a previously exported CSV back into the app — merging with or replacing existing data.<br/>
              ⬇ <strong style={{color:"#C8D8E8"}}>Export</strong>: download current data as CSV for backup, sharing, or editing in Excel.
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
            <ImportButton
              label="Projects CSV"
              desc="Import projects + milestones. Existing projects with the same name will be updated; new ones added."
              onImport={(text)=>{
                const r=importProjectsCSV(text,projects);
                if(r.ok){
                  const merged=[...projects];
                  r.data.forEach(imp=>{
                    const idx=merged.findIndex(p=>p.id===imp.id);
                    if(idx>=0) merged[idx]=imp; else merged.push(imp);
                  });
                  saveProjects(merged);
                }
                return r;
              }}
              mode={{export:()=>exportFinanceCSV(projects)}}
            />
            <ImportButton
              label="Technicians CSV"
              desc="Import technician roster. Matched by Staff ID — existing records updated, new ones added."
              onImport={(text)=>{
                const r=importTechsCSV(text);
                if(r.ok){
                  const merged=[...techs];
                  r.data.forEach(imp=>{
                    const idx=merged.findIndex(t=>t.id===imp.id);
                    if(idx>=0) merged[idx]={...merged[idx],...imp}; else merged.push(imp);
                  });
                  saveTechs(merged);
                }
                return r;
              }}
              mode={{export:()=>exportTechsCSV(techs,allocations)}}
            />
            <ImportButton
              label="Allocations CSV"
              desc="Import allocations. Projects and technicians must already exist. Existing allocations are kept; imported ones appended."
              onImport={(text)=>{
                const r=importAllocsCSV(text,projects,techs);
                if(r.ok) saveAllocs([...allocations,...r.data]);
                return r;
              }}
              mode={{export:()=>exportAllocsCSV(projects,techs,allocations)}}
            />
            <ImportButton
              label="Weekly Report CSV"
              desc="Restore a previously exported weekly check-in. Week+checkpoint data is merged into current weekly tracker."
              onImport={(text)=>{
                const r=importWeeklyCSV(text,allocations);
                if(r.ok) saveWeekly({...weeklyData,...r.data});
                return r;
              }}
              mode={{export:()=>exportWeeklyCSV(projects,techs,allocations,weeklyData,"current")}}
            />
          </div>
        </div>
      )}
    </div>
  );
}


function exportWeeklyXLSX(projects, techs, allocations, weeklyData, week) {
  if (!window.XLSX) {
    alert("Excel library loading... please wait a moment and try again.");
    return;
  }
  const XL = window.XLSX;
  const wb = XL.utils.book_new();

  ["midweek","endweek"].forEach(cp => {
    const label = cp === "midweek" ? "Midweek (Wed)" : "End-Week (Fri)";
    const data = weeklyData[`${week}_${cp}`] || {};
    const rows = [
      ["Institution","Objective","Deliverable","Officer(s)","Status","Issues","Client Availability"]
    ];
    allocations.forEach(a => {
      const proj = projects.find(p => p.id === a.projectId);
      const tech = techs.find(t => t.id === a.techId);
      const tasks = a.tasks?.length ? a.tasks : [a.deliverable];
      tasks.forEach((task, ti) => {
        const entry = data[`${a.id}_${ti}`] || {};
        rows.push([
          ti === 0 ? (proj?.name || a.projectId) : "",
          ti === 0 ? a.deliverable : "",
          `${ti+1}. ${task}`,
          ti === 0 ? (tech ? `${tech.first} ${tech.last}` : a.techId) : "",
          entry.status || "",
          entry.note || "",
          data[`${a.id}_client`] || "Available"
        ]);
      });
      rows.push(["","","","","","",""]);
    });
    const ws = XL.utils.aoa_to_sheet(rows);
    ws["!cols"] = [22,22,44,28,16,36,20].map(w => ({ wch: w }));
    XL.utils.book_append_sheet(wb, ws, label);
  });

  // Summary sheet
  const sumRows = [["Institution","Objective","Midweek Done","Midweek Total","Midweek %","End-Week Done","End-Week Total","End-Week %","Danger Flag"]];
  const midData = weeklyData[`${week}_midweek`] || {};
  const endData = weeklyData[`${week}_endweek`] || {};
  const grouped = {};
  allocations.forEach(a => { if (!grouped[a.projectId]) grouped[a.projectId] = []; grouped[a.projectId].push(a); });
  Object.entries(grouped).forEach(([pid, allocs]) => {
    const proj = projects.find(p => p.id === pid);
    const total = allocs.reduce((s,a) => s + (a.tasks?.length || 1), 0);
    const mDone = allocs.reduce((s,a) => { const t=a.tasks?.length||1; let d=0; for(let i=0;i<t;i++) if(midData[`${a.id}_${i}`]?.status==="✅ Done") d++; return s+d; }, 0);
    const eDone = allocs.reduce((s,a) => { const t=a.tasks?.length||1; let d=0; for(let i=0;i<t;i++) if(endData[`${a.id}_${i}`]?.status==="✅ Done") d++; return s+d; }, 0);
    const mPct = total ? Math.round(mDone/total*100) : 0;
    const ePct = total ? Math.round(eDone/total*100) : 0;
    const flag = mDone===0 ? "🔴 DANGER" : mPct<50 ? "🟠 WARNING" : "🟢 ON TRACK";
    sumRows.push([proj?.name||pid, allocs[0]?.deliverable||"", mDone, total, `${mPct}%`, eDone, total, `${ePct}%`, flag]);
  });
  const wsSummary = XL.utils.aoa_to_sheet(sumRows);
  wsSummary["!cols"] = [24,24,12,10,10,12,10,10,18].map(w => ({ wch: w }));
  XL.utils.book_append_sheet(wb, wsSummary, "Summary Dashboard");

  XL.writeFile(wb, `Weekly_Report_${week}.xlsx`);
}


function exportFinanceCSV(projects) {
  const rows=[["Project","Client","Status","Contract Value","Contract Start","Contract End","Milestone","Amount","Due Date","Invoiced","Paid"]];
  projects.forEach(p=>(p.milestones||[{name:"—",amount:0,dueDate:"",invoiced:false,paid:false}]).forEach(m=>{
    rows.push([p.name,p.client||p.name,p.status,p.contractValue||0,p.contractStart||"",p.contractEnd||"",m.name,m.amount,m.dueDate||"",m.invoiced?"Yes":"No",m.paid?"Yes":"No"]);
  }));
  dl(rows,"Finance_Report.csv");
}
function exportTechsCSV(techs, allocations) {
  const rows=[["ID","First Name","Last Name","Gender","Role","Email","Allocations"]];
  techs.forEach(t=>rows.push([t.id,t.first,t.last,t.gender==="F"?"Female":"Male",t.role,t.email||"",allocations.filter(a=>a.techId===t.id).length]));
  dl(rows,"Technicians.csv");
}
function exportAllocsCSV(projects,techs,allocations) {
  const rows=[["Project","Technician","Staff ID","Role","Deliverable","Tasks","Mode","Date From","Date To"]];
  allocations.forEach(a=>{
    const p=projects.find(x=>x.id===a.projectId);const t=techs.find(x=>x.id===a.techId);
    rows.push([p?.name||a.projectId,t?`${t.first} ${t.last}`:a.techId,a.techId,t?.role||"",a.deliverable,(a.tasks||[]).join("; "),a.mode,a.dateFrom||"",a.dateTo||""]);
  });
  dl(rows,"Allocations.csv");
}

/* ─── CSV IMPORT UTILITIES ──────────────────────────────────────────────── */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const parse = (line) => {
    const cells = []; let cur = ''; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"' && !inQ) { inQ = true; }
      else if (ch === '"' && inQ && line[i+1] === '"') { cur += '"'; i++; }
      else if (ch === '"' && inQ) { inQ = false; }
      else if (ch === ',' && !inQ) { cells.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cells.push(cur.trim());
    return cells;
  };
  const headers = parse(lines[0]);
  return lines.slice(1).filter(l => l.trim()).map(l => {
    const vals = parse(l);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return obj;
  });
}

function importProjectsCSV(text, existingProjects) {
  const rows = parseCSV(text);
  if (!rows.length) return { ok: false, msg: 'No data rows found.' };
  const grouped = {};
  rows.forEach(r => {
    const name = r['Project'] || r['project'] || '';
    if (!name) return;
    if (!grouped[name]) {
      grouped[name] = {
        id: 'P' + Math.random().toString(36).slice(2,8),
        name, client: r['Client'] || name,
        status: r['Status'] || 'Active',
        mode: r['Mode'] || 'Onsite',
        contractStart: r['Contract Start'] || '',
        contractEnd: r['Contract End'] || '',
        contractValue: +(r['Contract Value'] || 0),
        currency: 'KES', phase: r['Phase'] || '',
        nextPhaseDate: '', milestones: []
      };
      const existing = existingProjects.find(p => p.name.toLowerCase() === name.toLowerCase());
      if (existing) grouped[name].id = existing.id;
    }
    if (r['Milestone'] && r['Milestone'] !== '—') {
      grouped[name].milestones.push({
        id: Math.random().toString(36).slice(2,8),
        name: r['Milestone'],
        amount: +(r['Amount'] || 0),
        dueDate: r['Due Date'] || '',
        invoiced: r['Invoiced'] === 'Yes',
        paid: r['Paid'] === 'Yes',
      });
    }
  });
  const imported = Object.values(grouped);
  return { ok: true, count: imported.length, data: imported };
}

function importTechsCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length) return { ok: false, msg: 'No data rows found.' };
  const techs = rows.map(r => ({
    id: r['ID'] || r['Staff ID'] || 'ASL-' + Math.random().toString(36).slice(2,7).toUpperCase(),
    first: r['First Name'] || '',
    last: r['Last Name'] || '',
    gender: (r['Gender'] || '').toLowerCase().startsWith('f') ? 'F' : 'M',
    role: r['Role'] || 'Functional Consultant',
    email: r['Email'] || '',
    phone: r['Phone'] || '',
  })).filter(t => t.first || t.last);
  return { ok: true, count: techs.length, data: techs };
}

function importAllocsCSV(text, projects, techs) {
  const rows = parseCSV(text);
  if (!rows.length) return { ok: false, msg: 'No data rows found.' };
  const allocs = rows.map(r => {
    const proj = projects.find(p => p.name.toLowerCase() === (r['Project']||'').toLowerCase());
    const techByName = techs.find(t => `${t.first} ${t.last}`.toLowerCase() === (r['Technician']||'').toLowerCase());
    const techById = techs.find(t => t.id === (r['Staff ID']||''));
    const tech = techById || techByName;
    return {
      id: Math.random().toString(36).slice(2,10),
      projectId: proj?.id || r['Project'] || '',
      techId: tech?.id || r['Staff ID'] || '',
      deliverable: r['Deliverable'] || '',
      tasks: (r['Tasks'] || '').split(';').map(t => t.trim()).filter(Boolean),
      mode: r['Mode'] || 'Onsite',
      dateFrom: r['Date From'] || '',
      dateTo: r['Date To'] || '',
      notes: r['Notes'] || '',
    };
  }).filter(a => a.projectId && a.techId);
  return { ok: true, count: allocs.length, data: allocs };
}

function importWeeklyCSV(text, allocations) {
  const rows = parseCSV(text);
  if (!rows.length) return { ok: false, msg: 'No data rows found.' };
  const weeklyData = {};
  rows.forEach(r => {
    const week = r['Week'] || '';
    const cp = (r['Checkpoint']||'').toLowerCase().includes('mid') ? 'midweek' : 'endweek';
    const key = `${week}_${cp}`;
    const alloc = allocations.find(a => {
      const t = a.tasks || [a.deliverable];
      return t.some(task => task === r['Task']);
    });
    if (!alloc) return;
    const taskIdx = (alloc.tasks || [alloc.deliverable]).indexOf(r['Task']);
    if (taskIdx === -1) return;
    if (!weeklyData[key]) weeklyData[key] = {};
    weeklyData[key][`${alloc.id}_${taskIdx}`] = {
      status: r['Status'] || '',
      note: r['Notes'] || '',
    };
    if (r['Client Availability']) weeklyData[key][`${alloc.id}_client`] = r['Client Availability'];
  });
  return { ok: true, count: Object.keys(weeklyData).length, data: weeklyData };
}

function ImportButton({ label, desc, icon, onImport, mode }) {
  const [status, setStatus] = useState(null);
  const ref = useRef();
  const handle = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus({ type: 'loading', msg: 'Reading file...' });
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const result = onImport(ev.target.result);
        if (result.ok) setStatus({ type: 'success', msg: `Imported ${result.count} ${label.toLowerCase().replace(' csv','')} record(s).` });
        else setStatus({ type: 'error', msg: result.msg });
      } catch(err) {
        setStatus({ type: 'error', msg: 'Parse error: ' + err.message });
      }
      setTimeout(() => setStatus(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  return (
    <div style={{...S.card}}>
      <div style={{fontWeight:600,color:'#E8EDF2',marginBottom:4}}>{label}</div>
      <div style={{fontSize:12,color:'#4A6480',marginBottom:12,lineHeight:1.5}}>{desc}</div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <button style={S.btn('primary')} onClick={(e)=>{e.stopPropagation();e.preventDefault();ref.current?.click();}}>⬆ Import CSV</button>
        {mode?.export && <button style={S.btn('success')} onClick={(e)=>{e.stopPropagation();e.preventDefault();mode.export();}}>⬇ Export CSV</button>}
        <input ref={ref} type="file" accept=".csv" style={{display:'none'}} onChange={handle} />
      </div>
      {status && (
        <div style={{marginTop:10,padding:'8px 12px',borderRadius:6,fontSize:12,
          background:status.type==='success'?'#052E16':status.type==='error'?'#2D0F0F':'#1A2535',
          color:status.type==='success'?'#6EE7B7':status.type==='error'?'#FCA5A5':'#93C5FD'}}>
          {status.type==='loading'?'⏳':status.type==='success'?'✅':'❌'} {status.msg}
        </div>
      )}
    </div>
  );
}

function dl(rows, fname) {
  const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=fname;a.click();
}

/* ─── ALERTS ─────────────────────────────────────────────────────────────── */
function AlertsPage({alerts, projects, setPage}) {
  if (!alerts.length) return (
    <div><div style={S.hdr}>Alerts</div>
      <div style={{...S.card,textAlign:"center",padding:60,marginTop:20}}>
        <div style={{fontSize:40,marginBottom:12}}>✅</div>
        <div style={{color:"#4A6480",fontSize:14}}>No active alerts. All contracts and milestones are on track.</div>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{marginBottom:20}}><div style={S.hdr}>Alerts</div><div style={S.subhdr}>{alerts.length} active alert{alerts.length!==1?"s":""}</div></div>
      {alerts.map((a,i)=>(
        <div key={i} style={{...S.card,marginBottom:8,borderLeft:`3px solid ${a.level==="danger"?"#DC2626":"#F59E0B"}`,
          background:a.level==="danger"?"#1A0A0A":"#1A1200"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <span style={{fontSize:20}}>{a.level==="danger"?"🔴":"🟠"}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,color:a.level==="danger"?"#FCA5A5":"#FCD34D",fontSize:13}}>{a.msg}</div>
              <div style={{fontSize:11,color:"#4A6480",marginTop:2,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                {a.type==="contract"?"Contract expiry":a.type==="phase"?"Phase milestone":"Invoice due"}
              </div>
            </div>
            <button style={{...S.btn(),fontSize:12,padding:"5px 10px"}} onClick={()=>setPage("projects")}>View →</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
