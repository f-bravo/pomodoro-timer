import { HandPalm, Play } from "phosphor-react";
import { 
  HomeContainer, 
  StartCountDownButton, 
  StopCountDownButton, 
} from "./styles";

import { FormProvider, useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'

// A lib n tem export default. Por isso importa td e da um apelido
import * as zod from 'zod'
import { createContext, useState } from "react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

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
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

// Formulário de criação de um novo ciclo - validando um obj
// Schema de validação  
const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  MinuteAmountInput: zod.number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

 export function Home(){
  // O estado vai armazenar uma lista[] de ciclos. Inicie o estado com uma lista vazia
  const [cycles, setCycles] = useState<Cycle[]>([])
  // mantendo o estado com o ID do ciclo ativo: o id pode ser nulo. É iniciado com null
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // Novo estado que vai armazenar os segundos que já passaram desde que o ciclo foi ativo (countdown)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema), 
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

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
  
  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset()
  }
 
  // AO interromper volta p estado inicial da aplicação
  // Seta o ciclo ativo de votla p nulo
  function handleInterruptCycle() {
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
  //console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  // console.log(cycles)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <CyclesContext.Provider 
        value={{ 
          activeCycle, 
          activeCycleId, 
          markCurrentCycleAsFinished, 
          amountSecondsPassed,
          setSecondsPassed, 
        }}
      >
        <FormProvider {...newCycleForm}> {/* spreed, repassa as props do newCycleForm para o <FormProvider>   */}
          <NewCycleForm />
        </FormProvider>
        <Countdown />
      </CyclesContext.Provider> 

      { activeCycle ? (
        <StopCountDownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24}/>
          Interrromper
        </StopCountDownButton>
      ) : (

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      )}
       
      </form>
    </HomeContainer>
     
  );
 }