import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'

// A lib n tem export default. Por isso importa td e da um apelido
import * as zod from 'zod'
import { useEffect, useState } from "react";

import { differenceInSeconds, interval } from "date-fns";

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

// Interface de formatos dos ciclos
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

 export function Home(){
  // O estado vai armazenar uma lista[] de ciclos. Inicie o estado com uma lista vazia
  const [cycles, setCycles] = useState<Cycle[]>([])
  // mantendo o estado com o ID do ciclo ativo: o id pode ser nulo. É iniciado com null
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // Novo estado que vai armazenar os segundos que já passaram desde que o ciclo foi ativo (countdown)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema), 
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  // Mostrando na tela o ciclo ativo:
  //Com base no id do ciclo ativo, vai percorrer tds os ciclos armazenados e retornar o ciclo com o mesmo id do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Reduzindo o CountDown - calculando a diferença de seg da data atual p quando iniciou o ciclo
  useEffect(() => {
    let interval: number

    if(activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    // P/ deletar intervalos que n precisa mais
    return () => {
      clearInterval(interval)
    }

  }, [activeCycle])

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

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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

  //console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task"
            list="task-suggestions" 
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Project 001" />

          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinuteAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
       
        </form>
      </HomeContainer>
     
  );
 }