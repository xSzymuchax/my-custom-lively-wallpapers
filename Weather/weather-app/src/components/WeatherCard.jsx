function WeatherCard() {
    return (
        <div className='relative w-100 h-3/4 m-auto 
                        bg-gradient-to-br from-white/15 to-white/5 
                        rounded-[2rem]
                        border-4 border-white/20 
                        backdrop-blur-md shadow-2xl
                        font-rubik
                        flex flex-col
                        select-none'>
            


            <div className='mx-auto w-auto h-1/8 
                            text-center'>
                     
                <div className="
                    absolute left-1/2 top-0 z-0 w-[128px] h-[128px]
                    -translate-x-1/2 -translate-y-1/2
                    bg-white/50 mx-auto">
                </div>

                <h1 className='
                    absolute z-10 left-1/2 top-0 -translate-x-1/2 translate-y-1/4
                    text-6xl'>
                    Kraków
                </h1>
            </div>

            <div className="my-2 mx-5 w-auto border-2 border-white/20"></div>

            <div className='flex-col p-4 text-1xl items-center w-auto  m-5'>
                <div className='flex mb-2'>
                    <div className='w-[16px] h-[16px] bg-red-500 m-1 ml-0'></div>
                    <h2>Temperatura</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>26 C</p>
                </div>

                <div className='flex mb-2'>
                    <div className='w-[16px] h-[16px] bg-red-500 m-1 ml-0'></div>
                    <h2>Wiatr</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>10 km/h</p>
                </div>  

                <div className='flex mb-2'>
                    <div className='w-[16px] h-[16px] bg-red-500 m-1 ml-0'></div>
                    <h2>Opady</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>3 mm</p>
                </div>  

                <div className='flex mb-2'>
                    <div className='w-[16px] h-[16px] bg-red-500 m-1 ml-0'></div>
                    <h2>Wilgotność</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>50 %</p>
                </div>

                <div className='flex mb-2'>
                    <div className='w-[16px] h-[16px] bg-red-500 m-1 ml-0'></div>
                    <h2>Ciśnienie</h2>
                    <div className='flex-grow pt-3 border-b-2 border-white/20'></div>
                    <p>1000 hPa</p>
                </div>
            </div>

            <div className="flex-grow"></div>

            <div className="px-5 mx-5 mb-5 border-4 rounded-[1rem] border-white/20">
                <div className='bg-sky-400 mt-3'>
                    <canvas id='dayCycleCanvas'></canvas>
                </div>
                    
                <div className="flex">
                    <p className="px-5">6:00</p>
                    <div className="flex-grow"></div>
                    <p className="px-5">20:00</p>
                </div>
            </div>

        </div>
    )
}

export default WeatherCard