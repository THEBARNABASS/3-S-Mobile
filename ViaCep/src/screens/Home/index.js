import { useState } from "react";
import { BoxInput } from "../../components/BoxInput";
import { ContainerForm, ScrollForm } from "./style";
import Api from "../../services/api"

export function Home() {
  //Hooks - states
  const [cep, setCep] = useState("");
  const [cepInfo, setCepInfo] = useState({
    bairro:{
      texto: '',
      editable: false
    },
    logradouro: {
      texto: '',
      editable: false
    },
    localidade: {
      texto: '',
      editable: false
    },
    uf: {
      texto: '',
      editable: false
    }
  });
  
  const [alertLength, setAlertLength] = useState("");

  //Hooks - effects
  //Chama da API

  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    setCepInfo({
      bairro:{
        texto: '',
        editable: false
      },
      logradouro: {
        texto: '',
        editable: false
      },
      localidade: {
        texto: '',
        editable: false
      },
      uf: {
        texto: '',
        editable: false
      }
    })
  }

  //Função assincrona
  async function buscarCep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        setAlertLength("")
        //Preenche os campos com "..." enquanto consulta webservice.
        setCepInfo({
          bairro:{
            texto: '...',
            editable: false
          },
          logradouro: {
            texto: '...',
            editable: false
          },
          localidade: {
            texto: '...',
            editable: false
          },
          uf: {
            texto: '...',
            editable: false
          }
        })

        try {
          const response = await Api.get(`/${cep}/json/`)
          
          //Percorre o objeto cepInfo obtendo chave e valor de cada item contido no objeto
          Object.entries(cepInfo).forEach(([key, value]) => {
            //Procura dentro do objeto retornado pela responde.data se existe um algum valor igual a key do objeto cepInfo se tiver ele retorna
            const elementoEncontrado = Object.entries(response.data).find(([keyApi, valueApi]) => {
              if(key==keyApi){
                return [keyApi, valueApi];
              }          
            });
            //Verfica se elemento é igual a key e se o valor é diferente de vazio se sim ele passa o valor para oobjeto cepInfo
            if (elementoEncontrado[0] == key && elementoEncontrado[1] != "") {
              setCepInfo(prevState => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  texto: elementoEncontrado[1]
                }
              }));
            }else{
              //Habilita o editar em um campo caso a api via cep não traga nenhum valor para o campo.
              setCepInfo(prevState => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  texto: elementoEncontrado[1],
                  editable:true
                }
              }));
            }
          })
        } catch (error) {
          alert(`Cep não encontrado`);
        }
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        setAlertLength("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  };

  // useEffect(() => {
  //   console.log("UseEffects =", cepInfo);
  // }, [cepInfo]);

  // Código passado pelo professor
  /*
  useEffect(() => {
    const api = async () => {
    try {
      if (cep.length >= 8) {
        const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setRua(endereco.data.logradouro);
        setBairro(endereco.data.bairro);
        setCidade(endereco.data.localidade);
        setUf(endereco.data.uf);
      }

      
    } catch (error) {
      alert(`Erro ao buscar o CEP : ${error}`);
    }
  }

    api();
  }, [cep])
*/

  // Como Funciona o useEffects
  /*
    // ao carregar do componente
    useEffect(() => {
  
    }, []);//array dependências
  
  // ao carregar do componente
  // ao alterar do xpto
    useEffect(() => {
  
    }, [xpto]);//array dependências
  
    // ao carregar do componente
  // ao alterar do xpto
  // ao desmontar do componente
    useEffect(() => {
      return alert("fui desmontado,morri!!");
    }, [xpto]);//array dependências
  
  
  
  // ao carregar do componente
  // loop infinito
    useEffect(() => {
      return alert("fui desmontado,morri!!");
    });//sem array dependências - programador esqueceu!
  */
  return (
    //ScrollForm
    //ContainerForm
    //BoxInput
    //Label
    //Input
    <ScrollForm>
      <ContainerForm>
        <BoxInput
          textLabel="Informe o cep"
          placeholder="Exemplo"
          fieldValue={cep}
          editable={true}
          maxLength={9}
          minLength={8}
          textAlert={alertLength}
          onChangeText={(fieldValue) => {
            setCep(fieldValue)
          }}
          onBlur={() => {
            buscarCep(cep)
          }
          }
          keyboardType="numeric"
        />
        <BoxInput
          textLabel="Logradouro"
          placeholder="Logradouro..."
          fieldValue={cepInfo.logradouro.texto}
          maxLength={50}
          minLength={0}
          editable={cepInfo.logradouro.editable}
          onChangeText={(fieldValue) => {
            setCepInfo(prevState => ({
              ...prevState,
              logradouro: {
                ...prevState.logradouro,
                texto: fieldValue
              }
            }));
          }}
        />
        <BoxInput
          textLabel="Bairro"
          placeholder="Bairro..."
          fieldValue={cepInfo.bairro.texto}
          editable={cepInfo.bairro.editable}
          maxLength={50}
          minLength={0}
          onChangeText={(fieldValue) => {
            setCepInfo(prevState => ({
              ...prevState,
              bairro: {
                ...prevState.bairro,
                texto: fieldValue
              }
            }));
          }}
        />
        <BoxInput
          textLabel="Cidade"
          placeholder="Cidade..."
          fieldValue={cepInfo.localidade.texto}
          editable={cepInfo.localidade.editable}
          maxLength={50}
          minLength={0}
          onChangeText={(fieldValue) => {
            setCepInfo(prevState => ({
              ...prevState,
              localidade: {
                ...prevState.localidade,
                texto: fieldValue
              }
            }));
          }}
        />
        <BoxInput
          textLabel="UF"
          placeholder="UF..."
          fieldValue={cepInfo.uf.texto}
          editable={cepInfo.uf.editable}
          maxLength={50}
          minLength={0}
          onChangeText={(fieldValue) => {
            setCepInfo(prevState => ({
              ...prevState,
              uf: {
                ...prevState.uf,
                texto: fieldValue
              }
            }));
          }}
        />
      </ContainerForm>
    </ScrollForm>
  );
};