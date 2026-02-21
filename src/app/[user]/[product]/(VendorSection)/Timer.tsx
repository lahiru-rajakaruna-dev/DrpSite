import Countdown from 'react-countdown';



export default function Timer() {
    return <div>
        <Countdown
            date={ new Date('2026/02/18') } className={ 'inline w-fit' +
                                                        ' h-fit' +
                                                        ' px-4' +
                                                        ' py-3' +
                                                        ' rounded-md' +
                                                        ' text-lg' +
                                                        ' font-bold' +
                                                        ' border' +
                                                        ' border-slate-200' }
        />
    </div>
}

