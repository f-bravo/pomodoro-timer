import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Alinhando o form no centro
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

// Butão base do Start e Stop button para o countdown
export const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

// Butão de Start - só precisou colcoar as cores
export const StartCountDownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  // Quando o button não estiver habilitado não faça hover.
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }    
`

export const StopCountDownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};

  // Quando o button não estiver habilitado não faça hover.
  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }    
`
