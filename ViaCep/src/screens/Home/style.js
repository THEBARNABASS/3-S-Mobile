import styled from "styled-components/native";

// export const ScrollForm = styled.ScrollView`
//   height: 80%;
//   background-color:red;
//  `

export const ScrollForm = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // onContentSizeChange:{
  //   width:60,
  //   heigth:60,
  // }
}))`
  padding-top:20px;
  /* flex-grow:1; */
  /* height: 100%; */
  /* background-color: red; */
`;

export const ContainerForm = styled.SafeAreaView`
  /* padding: 35px; */
  width:75%;
  /* height:30px; */
  /* background-color:gray; */
  gap:10px;
`