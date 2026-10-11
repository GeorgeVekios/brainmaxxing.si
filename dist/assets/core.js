export const ACTIVITIES = [
  {id:'signal',title:'Signal Hunt',category:'gym',tag:'FOCUS',time:'1 min',description:'Find the odd one out. Keep your attention on the little details.',art:'signal'},
  {id:'sequence',title:'Sequence Lab',category:'gym',tag:'MEMORY',time:'2–3 min',description:'Watch a pattern unfold, then follow it from memory.',art:'sequence'},
  {id:'rules',title:'Rule Switch',category:'gym',tag:'REASONING',time:'1 min',description:'Color or shape? Stay flexible as the rule changes.',art:'rules'},
  {id:'pocket',title:'Pocket Sudoku',category:'games',tag:'NUMBER PUZZLE',time:'3 min',description:'A small grid with a satisfying solution. Your daily logic break.',art:'sudoku'},
  {id:'sudoku',title:'Sudoku',category:'games',tag:'CLASSIC',time:'10–15 min',description:'Nine rows, nine columns, one lovely exercise in logic.',art:'sudoku'},
  {id:'crossword',title:'Mini Crossword',category:'games',tag:'WORD PUZZLE',time:'5 min',description:'Five by five. A few good clues. Find your way across and down.',art:'crossword'},
  {id:'words',title:'Word Search',category:'games',tag:'WORD PUZZLE',time:'3–5 min',description:'Slow down, look closely, and uncover the hidden words.',art:'words'},
  {id:'read',title:'Read & Recall',category:'lab',tag:'COMPREHENSION',time:'2 min',description:'Read something interesting. See what stays with you.',art:'read'},
  {id:'cards',title:'Recall Cards',category:'lab',tag:'ACTIVE RECALL',time:'3 min',description:'Put your knowledge to the test, one small question at a time.',art:'cards'},
  {id:'custom',title:'Your Study Set',category:'lab',tag:'PERSONAL LEARNING',time:'Your pace',description:'Bring what you’re learning. Make it your own practice.',art:'custom'},
];
export const CIRCUIT = ['signal','pocket','read'];
export const POCKET = {size:4,box:2,puzzle:'1204041001404001',solution:'1234341221434321'};
export const SUDOKU = {size:9,box:3,puzzle:'530070000600195000098000060800060003400803001700020006060000280000419005000080079',solution:'534678912672195348198342567859761423426853791713924856961537284287419635345286179'};
export const CROSSWORD = ['HEART','EMBER','ABUSE','RESIN','TREND'];
export const WORDS = ['FOCUS','LEARN','MIND','PAUSE','GROW'];
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function readState(storage){try {const s=JSON.parse(storage.getItem('brainmaxxing.v1'));return s && Array.isArray(s.results) && Array.isArray(s.cards) ? s : {results:[],cards:[]};}catch{return {results:[],cards:[]};}}
export function completedToday(state,day=localDay()){return new Set(state.results.filter(r=>r.day===day && CIRCUIT.includes(r.id)).map(r=>r.id));}
export function streak(state,day=localDay()){
  const dates=new Set(state.results.map(r=>r.day));let date=new Date(day+'T12:00:00');
  if(!dates.has(localDay(date)))date.setDate(date.getDate()-1);
  let count=0;while(dates.has(localDay(date))){count++;date.setDate(date.getDate()-1);}return count;
}
export function validateGrid(values,config){return values.length===config.solution.length && values.every((v,i)=>String(v)===config.solution[i]);}
export function wordPath(start,end,size=8){
  const a=[Math.floor(start/size),start%size],b=[Math.floor(end/size),end%size],dy=b[0]-a[0],dx=b[1]-a[1];
  if(dx!==0 && dy!==0 && Math.abs(dx)!==Math.abs(dy))return [];
  const length=Math.max(Math.abs(dx),Math.abs(dy));return Array.from({length:length+1},(_,i)=>(a[0]+Math.sign(dy)*i)*size+a[1]+Math.sign(dx)*i);
}
export function makeWordGrid(){
  const text='QAXBRZTK';const grid=Array.from({length:64},(_,i)=>text[(i*7+Math.floor(i/8)*3)%text.length]);
  const positions=[[0,1],[15,8],[35,-1],[56,1],[20,8]];
  WORDS.forEach((word,i)=>{const [start,step]=positions[i];[...word].forEach((c,j)=>grid[start+step*j]=c);});return grid;
}
