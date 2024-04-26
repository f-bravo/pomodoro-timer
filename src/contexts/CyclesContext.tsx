import { ReactNode, createContext, useState, useReducer } from "react"
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

// informações armazenadas dentro do contexto:
interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ 
  children,
}: CyclesContextProviderProps) {
  // O estado vai armazenar uma lista[] de ciclos. Inicie o estado com uma lista vazia
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null,
    }
  )
  
  // Novo estado que vai armazenar os segundos que já passaram desde que o ciclo foi ativo (countdown)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  // Mostrando na tela o ciclo ativo:
  //Com base no id do ciclo ativo, vai percorrer tds os ciclos armazenados e retornar o ciclo com o mesmo id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }
  
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // P facilitar e n instalar lib. O ID será o timeValue em Milisegundo
    
    //Criando o novo ciclo: id, task, minuteAmount
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0) // resetando os segundos a cada novo ciclo
  }
 
  // AO interromper volta p estado inicial da aplicação
  // Seta o ciclo ativo de votla p nulo
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())    
  }

  return(
    <CyclesContext.Provider 
      value={{
        cycles, 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle, 
      }}
    >
      { children }
    </CyclesContext.Provider>
  )
}