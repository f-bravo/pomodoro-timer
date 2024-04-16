// Códigos de definição de tipos do Type script

import 'styled-components' // importa para usar ele e nã ocriar algo novo
import { defaultTheme } from '../styles/themes/default'

// Aqui guarda o valor que é inferido de forma automática pelo
// type scrip de quais são as propriedades que eixstem dentro do thema
// dentro da variável ThemeType

// N precisa gravar. Tenha um exemplo no Github e copie ele p ostros projetos
type ThemeType = typeof defaultTheme

// aqui cria uma tipagem para o 'styled-components'. A tipagem que será usada
// [e a que for definida aqui
declare module 'styled-components' {
  export interface defaultTheme extends ThemeType {}
}