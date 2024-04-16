import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
    
    a {
      width: 3rem;
      height: 3rem;
      // Somente para centralizar 
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${props => props.theme['gray-100']};

      // p/ centralizar o ícone. 
      // Com hover, a borda faz o ícone subir se n tiver a borda transparente p fixar a altura sem fazer o ícone pular ao por o mouse com hover
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      
      &:hover {
        border-bottom: 3px solid ${(props => props.theme['green-500'])};
      }
      //Estilização do link - 
      //Por conta no NavLink ao clicar no ícone(Rotas(timer, History)) ativa de forma automática e coloca uma class chamada active 
      //Se clica no Timer ele fica verde. Se clica no histórico ele fica verde. Um por vez
      &.active {
        color:  ${props => props.theme['green-500']};
      }
   }  
  }
`