import {COMBOS} from "../constans.js"
 
 export const checkwinner = (boardCheck) =>{

    for (const combo of COMBOS) {
      const [a,b,c] = combo;
      if(boardCheck[a] && boardCheck[a] === boardCheck[b]&&boardCheck[a] === boardCheck[c]){
        return boardCheck[a]
    }
  
  }
  return null
}