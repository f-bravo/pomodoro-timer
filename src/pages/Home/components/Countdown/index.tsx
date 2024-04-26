import { CountdownContainer, Separator } from "./styles"
import { useContext, useEffect } from "react"
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from "../../../../contexts/CyclesContext"


export function Countdown() {
  //vem do index da Home a interface para fazer o useContext abaixo:
  /* interface CyclesContextType {activeCycle: Cycle | undefined} 
  export const CyclesContext = createContext({} as CyclesContextType) */

    const { 
      activeCycle, 
      activeCycleId, 
      markCurrentCycleAsFinished, 
      amountSecondsPassed,
      setSecondsPassed, 

    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    // Reduzindo o CountDown - calculando a diferença de seg da data atual p quando iniciou o ciclo
    useEffect(() => {
      let interval: number
  
      if(activeCycle) {
        interval = setInterval(() => {
          const secondsDifference =  differenceInSeconds(
            new Date(), 
            activeCycle.startDate
        )
  
        if(secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
  
          setSecondsPassed(totalSeconds) // p/ setar o 0 no final do countdown.
  
          clearInterval(interval)
  
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
  
      // P/ deletar intervalos que n precisa mais
      return () => {
        clearInterval(interval)
      }
    }, [ // Array de dependências do useEffect
      activeCycle, 
      totalSeconds, 
      activeCycleId, 
      setSecondsPassed, 
      markCurrentCycleAsFinished
    ])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60) // arredonda p baixo p n ter número quebrado
    const secondsAmount = currentSeconds % 60
  
    const minutes = String(minutesAmount).padStart(2, '0') //preenche uma string com caracter. Vai incluir o 0 no começo da contagem
    const seconds = String(secondsAmount).padStart(2, '0') //preenche uma string com caracter. Vai incluir o 0 no começo da contagem
  
    // Colocando o countDown no título da janela - timer apenas se tiver ciclo ativo 
    useEffect(() => {
      if (activeCycle) {
        document.title= `${minutes}:${seconds}`
      }
    }, [minutes, seconds, activeCycle])
  
  return(
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}