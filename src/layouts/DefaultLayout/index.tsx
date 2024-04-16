import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

// Outlet - é um espaço para inserir um centeúdo
// Usado para o componente carregar o conteúdo específico 
export function DefaultLayout() { 
  return(
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}