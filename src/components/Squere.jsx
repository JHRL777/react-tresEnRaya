
 
 export const Squere = ({children, selector,  updateBoard, index}) =>{
    const  className = `square ${selector ? 'is-selected' : ''}`
  
    const cambiosClick = () =>{
      updateBoard(index)
    }
  
    return(
      <div onClick={cambiosClick} className={className}>
        {children}
      </div>
    )
  }