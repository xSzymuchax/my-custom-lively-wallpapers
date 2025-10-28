function WeatherCard() {
    return (
        <div className='relative w-100 h-3/4 m-auto 
                        bg-gradient-to-br from-white/15 to-white/5 
                        rounded-[2rem]
                        border-4 border-white/20 
                        backdrop-blur-md shadow-2xl'>
            


            <div className='mx-auto w-auto h-1/8 
                            text-center'>
                     
                <div className="
                    absolute left-1/2 top-0 z-0 w-[128px] h-[128px]
                    -translate-x-1/2 -translate-y-1/2
                    bg-white mx-auto">
                </div>

                <h1 className='
                    absolute z-10 left-1/2 top-0 -translate-x-1/2 translate-y-1/4
                    text-6xl text-white text-outline'>
                    Kraków
                </h1>
            </div>

            <div className="my-2 mx-5 w-auto border-2 border-white/20"></div>

            <div className='flex-col p-4 text-1xl items-center h-7/9 w-auto bg-purple-500 m-5'>
                <div className='flex mb-2'>
                    <h2>Temp.</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>26C</p>
                </div>

                <div className='flex mb-2'>
                    <h2>Temp.</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>26C</p>
                </div>                

            </div>

        </div>
    )
}

export default WeatherCard