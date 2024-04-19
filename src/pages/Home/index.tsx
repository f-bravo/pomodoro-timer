import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'

// A lib n tem export deafult. Por isso importa td e da um apelido
import * as zod from 'zod'

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
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema), 
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
       
        </form>
      </HomeContainer>
     
  );
 }