import { HeaderContainer, HeaderContent, TextHeader } from "./style";

export function Header () {
  return(
    //  HeaderContainer, SafeArea, Text
    <HeaderContainer>
      <HeaderContent>
        <TextHeader>Consumo da API ViaCep</TextHeader>
      </HeaderContent>
    </HeaderContainer>
  );
};

