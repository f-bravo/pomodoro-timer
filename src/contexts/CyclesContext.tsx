import { ReactNode, createContext, useState } from "react"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

// Interface de formatos dos ciclos
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // O estado vai armazenar uma lista[] de ciclos. Inicie o estado com uma lista vazia
  const [cycles, setCycles] = useState<Cycle[]>([])
  // mantendo o estado com o ID do ciclo ativo: o id pode ser nulo. É iniciado com null
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // Novo estado que vai armazenar os segundos que já passaram desde que o ciclo foi ativo (countdown)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Mostrando na tela o ciclo ativo:
  //Com base no id do ciclo ativo, vai percorrer tds os ciclos armazenados e retornar o ciclo com o mesmo id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return{ ...cycle, finishedDate: new Date()}
      } else {
        return cycle
        }
      })
    )
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

    // Add o novo ciclo a listagem de ciclos. para adicionar uma nova informação no array:
    // Precisa copiar tds os ciclos existentes e add o novo ciclo no final
    // Sempre que o estado depender de uma informação anterior use o formato arrow function
    setCycles((state) => [...state, newCycle])

    //Quando cria um novo ciclo, seta o ciclo recem criado como sendo o ciclo ativo
    setActiveCycleId(id)

    setAmountSecondsPassed(0) // resetando os segundos a cada novo ciclo
  }
 
  // AO interromper volta p estado inicial da aplicação
  // Seta o ciclo ativo de votla p nulo
  function interruptCurrentCycle() {
    // P/ cada ciclo se for o ciclo ativo vai retornar td info + setar a data atual como interrupetdDate. Se não, n altera nada e return Cicle sem alteração
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
        return{ ...cycle, interruptedDate: new Date()}
        } else {
          return cycle
          }
      }),
    )
    setActiveCycleId(null)

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