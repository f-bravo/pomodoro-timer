import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

// Essa div é para poder arrastar a tabela com scroll em mobile
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; // Se a tabela for maior que o tamanho do container vai criar uma barra de rolagem
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // faz com que exista apenas uma borda entre os campos e não a soma de cada borda
    min-width: 600px; // QUando a tela for menor força o scroll a aparecer

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      // borda superior a esquerda
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      // borda superior a direita
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      font-size: 0.875rem;
      line-height: 1.6;
      padding: 1rem;
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      color: ${(props) => props.theme['gray-300']};

     &:first-child {
      width: 50%; // a primeira coluna ocupa 50% do espaço
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

// Component Status:
// Para o componente status receber uma propriedade: crie uma interface
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  // A bolinha do status é o before
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`