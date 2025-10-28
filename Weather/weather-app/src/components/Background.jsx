function Background({children}){
  return(
    <> 
      <div className='bg-gradient-to-b from-sky-200 to-sky-400 flex w-screen h-screen'>
        {children}
      </div>
    </>
  )
}

export default Background