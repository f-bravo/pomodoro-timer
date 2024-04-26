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
import { useContext } from "react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

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
  const { activeCycle ,createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema), 
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  
  // função chamada diretamente de um evento (handle)
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      
        <FormProvider {...newCycleForm}> {/* spreed, repassa as props do newCycleForm para o <FormProvider>   */}
          <NewCycleForm />
        </FormProvider>
        <Countdown />
      

      { activeCycle ? (
        <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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