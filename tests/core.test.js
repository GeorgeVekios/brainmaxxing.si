import {test} from 'node:test';
import assert from 'node:assert/strict';
import {POCKET,SUDOKU,CROSSWORD,WORDS,localDay,completedToday,streak,validateGrid,wordPath,makeWordGrid,readState} from '../dist/assets/core.js';

for(const config of [POCKET,SUDOKU])test(`${config.size} × ${config.size} Sudoku has valid solution and matching givens`,()=>{
  const {size,box,puzzle,solution}=config;
  assert.equal(solution.length,size*size);assert.equal(puzzle.length,solution.length);
  [...puzzle].forEach((n,i)=>assert.ok(n==='0'||n===solution[i]));
  for(let i=0;i<size;i++){
    assert.equal(new Set([...solution.slice(i*size,(i+1)*size)]).size,size);
    assert.equal(new Set(Array.from({length:size},(_,r)=>solution[r*size+i])).size,size);
  }
  for(let y=0;y<size;y+=box)for(let x=0;x<size;x+=box)assert.equal(new Set(Array.from({length:size},(_,i)=>solution[(y+Math.floor(i/box))*size+x+i%box])).size,size);
  assert.equal(validateGrid([...solution],config),true);assert.equal(validateGrid([...puzzle],config),false);
  const board=[...puzzle].map(Number);let solutions=0;
  function solve(){
    const index=board.indexOf(0);if(index<0){solutions++;return;}
    const y=Math.floor(index/size),x=index%size;
    for(let value=1;value<=size;value++){
      const blocked=Array.from({length:size},(_,j)=>board[y*size+j]===value||board[j*size+x]===value||board[(Math.floor(y/box)*box+Math.floor(j/box))*size+Math.floor(x/box)*box+j%box]===value).some(Boolean);
      if(!blocked){board[index]=value;solve();board[index]=0;if(solutions>1)return;}
    }
  }
  solve();assert.equal(solutions,1,'The starter puzzle must have exactly one solution');
});
test('crossword words match both across and down',()=>CROSSWORD.forEach((word,i)=>assert.equal(CROSSWORD.map(row=>row[i]).join(''),word)));
test('word search contains every listed word on an unbroken line',()=>{
  const grid=makeWordGrid();for(const word of WORDS){let found=false;
    for(let a=0;a<64;a++)for(let b=0;b<64;b++){const letters=wordPath(a,b).map(i=>grid[i]).join('');if(letters===word||[...letters].reverse().join('')===word)found=true;}
    assert.ok(found,`${word} must exist`);
  }
  assert.deepEqual(wordPath(0,10),[]);assert.deepEqual(wordPath(0,27),[0,9,18,27]);assert.deepEqual(wordPath(7,0),[7,6,5,4,3,2,1,0]);
});
test('circuit counts distinct daily activities and excludes free play',()=>{
  const state={results:[{id:'signal',day:'2026-10-10'},{id:'signal',day:'2026-10-10'},{id:'read',day:'2026-10-10'},{id:'sequence',day:'2026-10-10'},{id:'pocket',day:'2026-10-09'}]};
  assert.deepEqual([...completedToday(state,'2026-10-10')],['signal','read']);assert.equal(streak(state,'2026-10-10'),2);assert.equal(streak(state,'2026-10-11'),2);assert.equal(streak(state,'2026-10-12'),0);
});
test('local date and invalid storage are handled',()=>{
  assert.equal(localDay(new Date(2026,9,10,23,59)),'2026-10-10');assert.deepEqual(readState({getItem:()=>'{invalid'}),{results:[],cards:[]});assert.deepEqual(readState({getItem:()=>null}),{results:[],cards:[]});
});
