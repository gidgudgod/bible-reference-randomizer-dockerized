"use client"
import { useEffect, useState } from 'react'
import data from '../data/alkitab-tb.json'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function Home() {
  const [key, setKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [duration, setDuration] = useState(10)
  const [maxRound, setMaxRound] = useState(10)
  const [currentRound, setCurrentRound] = useState(0)
  const [reference, setReference] = useState('')
  const [score, setScore] = useState({
    success: 0,
    fail: 0,
  })

  const generateRandomReference = () => {
    const dataBible: any = data;
    const randIdx = Math.floor(Math.random() * dataBible.length)
    const referenceToShow = `${data[randIdx].kitab} ${data[randIdx].pasal}:${data[randIdx].ayat}`
    setReference(referenceToShow)
  }

  const handleDurationChange = (e: any)  =>  {
    const {value} = e.target
    const valueParsed = value.replace(/\D/,'')
    if(valueParsed < 0 || value > 99999) return
    setDuration(valueParsed) 
  }

  const handleComplete = (totalElapsedTime: number) => {
    setScore((prevState)=> ({...prevState, fail: prevState.fail + 1}))
    setCurrentRound((prevState)=> prevState + 1)
    setIsWaiting(true)
  } 

  const handleDone = ()=>{
    setScore((prevState)=> ({...prevState, success: prevState.success + 1}))
    setCurrentRound((prevState)=> prevState + 1)
    setIsWaiting(true)
  }

  const handleStart =() =>{
    if(maxRound < 1 || duration < 1) return
    setCurrentRound((prevState)=> prevState + 1)
    setIsPlaying(true)
    generateRandomReference()
  }

  const handleRoundChange = (e) =>{
    const {value} = e.target

    const valueParsed = value.replace(/\D/,'')
    if(valueParsed < 0 || value > 99) return
    setMaxRound(valueParsed) 
  }

  const handleRestart = () => {
    setScore({
      success: 0,
      fail: 0,
    })
    setCurrentRound(0)
    setIsFinish(false)
  }

  useEffect(()=>{
    if(currentRound > (maxRound)){
      setIsFinish(true)
      setIsPlaying(false)
      setIsWaiting(false)
    }
  },[currentRound, maxRound])

  useEffect(() => {
    let timerId;

    if (isWaiting) {
    const thisDelay = randomIntFromInterval(2, 10) * 1000
      
      timerId = setTimeout(() => {
        generateRandomReference()
        setKey(prevKey => prevKey + 1)
        setIsWaiting(false);
      }, thisDelay);
    }

    return () => clearTimeout(timerId);
  }, [isWaiting]);

  return (
    <main className="flex min-h-screen max-w-5xl mx-auto flex-col items-center justify-center p-24 relative">
      <div className='absolute top-2 right-4 flex gap-8'>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Round</span>
            </label>
            <input disabled={isPlaying || isFinish} value={maxRound} onChange={handleRoundChange} type="text" placeholder="Set round" className="input input-bordered w-full max-w-[120px]" />
          </div> 
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Duration</span>
            </label>
            <input disabled={isPlaying || isFinish} value={duration} onChange={handleDurationChange} type="text" placeholder="Set duration" className="input input-bordered w-full max-w-[120px]" />
          </div> 
      </div>
     {!isFinish ? <div className='flex flex-col justify-between items-center gap-4'>
     {isPlaying && <p className='text-5xl'>{isWaiting ? <span className='animate-pulse'>Get Ready...</span>  : reference}</p>}
      <CountdownCircleTimer  
      key={key}
      isPlaying={isPlaying && !isWaiting}
      duration={duration} colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => 
      <div className='text-4xl font-bold flex-col items-center justify-center'>
      {!isWaiting &&  <div>
        {remainingTime}
        </div>}
      {isWaiting &&  <div className='text-xl animate-pulse'>
        Get Ready...
        </div>}
      </div> }
      </CountdownCircleTimer>

      <div>
     {!isPlaying && <button className='btn btn-primary' onClick={handleStart}>Start</button>}
   {isPlaying && <button disabled={isWaiting} className='btn btn-success' onClick={handleDone}>Done</button>}
      </div>

      </div>
      : 
      <div className='flex flex-col justify-between items-center gap-4'>
        <h1 className='font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Good Job!</h1>
        <p >Score: <span className='text-2xl font-bold'>{(score.success/maxRound * 100).toFixed(2)}</span></p>
        <p className='-mt-4 mb-5'><span>Success: <span className='text-lg text-green-400'>{score.success}</span></span>&nbsp;
        <span>Fail: <span className='text-lg text-red-500'>{score.fail}</span></span>
        </p>
        <div>
          <button onClick={handleRestart} className='btn btn-outline btn-primary'>Restart</button>
        </div>
      </div>
      }
    </main>
  )
}
