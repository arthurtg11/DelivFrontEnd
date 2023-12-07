import { ApuracaoCmp } from "@/components/ApuracaoCmp";
import { FimCmp } from "@/components/FimCmp";
import { InitialCmp } from "@/components/InitialCmp";
import { SelectCandiate } from "@/components/SelectCandidate";
import { AuthContext, SignCredentials } from "@/contexts/AuthContext";
import { setupApiClient } from "@/services/api";
import { api } from "@/services/apiClient";
import { withSSRGuest } from "@/utils/withSSRGuest";
import {
  Button,
  Flex, SimpleGrid, Text, VStack
} from "@chakra-ui/react";
import { motion, useAnimation } from 'framer-motion';
import { destroyCookie, parseCookies } from "nookies";
import { FormEvent, useContext, useState, useEffect } from "react";

interface UrnaProps {
  stageStart: number,
  draggable?: boolean
}

export type CandidatoProps = {
  canCod: number,
  canDesName: string,
  canVldTipo: number,
  canDesNameVice: string,
  canDesPartido: string,
  canNumNumero?: number,
  canNumVotos?: number,
  canDesPhoto?: string
}

export const Urna = ({ stageStart }: UrnaProps) => {
  const { user, signOut, signIn } = useContext(AuthContext);
  const [stage, setStage] = useState(stageStart);
  const [digits, setDigits] = useState(Array.from({ length: stageStart == 1 ? 6 : 12 }, () => -1));
  const [chosenCan, setChosenCan] = useState<Array<number>>([]);
  const [candidato, setCandidato] = useState<CandidatoProps>({
    canCod: 0,
    canDesName: "",
    canVldTipo: 1,
    canDesNameVice: "",
    canDesPartido: "",
    canDesPhoto: ""
  });
  const [whiteBool, setWhiteBool] = useState<boolean>(false);
  const [apuracao, setApuracao] = useState<Array<CandidatoProps>>();
  const [qtdEleitores, setQtdEleitores] = useState<number>(0);



  function handleDigit(number: number) {
    if (stage == 1)
      return;

    var tmp = [...digits];
    if (tmp.indexOf(-1) != -1) {
      tmp[tmp.indexOf(-1)] = number;
      setDigits(tmp)
    }
  }

  async function loginAdm() {
    await api
      .post("/login", {
        "username": "admin",
        "password": digits.join('')
      })
      .then((e) => {
        console.log(e.data)
        if (e.data.urnVldAtiva === 1) {
          setDigits(Array.from({ length: 12 }, () => -1))
          setStage(3)
        } else {
          setApuracao(e.data.candidatos);
          setQtdEleitores(e.data.eleitores)
          //
          // setDigits(Array.from({ length: 6 }, () => -1))
          setStage(8)
        }

      }).catch((e) => {
        setDigits(Array.from({ length: 6 }, () => -1))
      });
  }

  async function loginUser() {
    try {
      var nameRtn = await signIn({ email: digits.join(''), password: '11' });
      setDigits(Array.from({ length: 3 }, () => -1))
      setStage(4)
    } catch (err) {
      setDigits(Array.from({ length: 12 }, () => -1))
    }
  }

  async function handleConfirm() {
    if (digits.indexOf(-1) != -1 && stage != 1 && !whiteBool)
      return

    if (stage == 1)
      setStage(2)

    if (stage == 2)
      await loginAdm();


    if (stage == 3)
      await loginUser();


    if (4 == stage) {
      setDigits(Array.from({ length: 3 }, () => -1))

      var tmp = [...chosenCan]
      if (!whiteBool)
        tmp.push(candidato.canCod)
      else
        tmp.push(0)

      setChosenCan(tmp)
      setCandidato(null)
      setStage(5)
    }

    if (5 == stage) {
      setDigits(Array.from({ length: 2 }, () => -1))

      var tmp = [...chosenCan]
      if (!whiteBool)
        tmp.push(candidato.canCod)
      else
        tmp.push(0)

      setChosenCan(tmp)
      setCandidato(null)
      setStage(6)
    }

    if (6 == stage) {
      var tmp = [...chosenCan]
      if (!whiteBool)
        tmp.push(candidato.canCod)
      else
        tmp.push(0)

      setChosenCan(tmp)
      setCandidato(null)
      await registerVotes(tmp)
      setStage(7)
    }

    if (8 == stage) {
      setChosenCan([])
      setCandidato(null)
      setApuracao(null)
      setQtdEleitores(null)
      setStage(1)
      setDigits(Array.from({ length: 6 }, () => -1));
      destroyCookie(undefined, "ec.refreshToken");
      destroyCookie(undefined, "ec.token");
    }
    setWhiteBool(false)
  }

  function handleCorrige() {
    setWhiteBool(false)
    if (stage == 2)
      setDigits(Array.from({ length: 6 }, () => -1))

    if (stage == 3)
      setDigits(Array.from({ length: 12 }, () => -1))

    if ([4, 5].includes(stage)) {
      setDigits(Array.from({ length: 3 }, () => -1))
      setCandidato(null)
    }
    if (6 == stage) {
      setDigits(Array.from({ length: 2 }, () => -1))
      setCandidato(null)
    }
  }

  function handleBranco() {
    if (stage == 3) {
      setStage(2)
      setDigits(Array.from({ length: 6 }, () => -1))
    }
    if ([4, 5, 6].includes(stage)) {
      setWhiteBool(true)
      if ([4, 5].includes(stage))
        setDigits(Array.from({ length: 3 }, () => -1))

      if (stage == 6)
        setDigits(Array.from({ length: 2 }, () => -1))
    }

  }

  async function registerVotes(votos) {
    await api.post("/candidato/register/votes", {
      "votes": votos
    }).catch((e) => {
      setStage(3)
    }).finally(() => {
      setChosenCan([])
    })
  }

  useEffect(() => {
    console.log(stage)
    if ([4, 5, 6].includes(stage)) {
      if (digits.indexOf(-1) == -1) {
        api.get("/candidato/" + digits.join("") + "/" + (stage != 6 ? 1 : 2)).then((e) => {
          setCandidato({
            canCod: e.data.canCod,
            canDesName: e.data.canDesName,
            canVldTipo: e.data.canVldTipo,
            canDesNameVice: e.data.canDesNameVice,
            canDesPartido: e.data.canDesPartido,
            canDesPhoto: e.data.canDesPhoto
          })
        }).catch((e) => {
          setCandidato({
            canCod: 0,
            canDesName: "VOTO NULO",
            canVldTipo: 1,
            canDesNameVice: "",
            canDesPartido: "N/",
            canDesPhoto: ""
          })
        })
      }
    }

  }, [digits])


  return (
    <Flex alignItems="center" justifyContent="center" w="100%" h="100vh" bgColor="black" color="black" fontSize="1.4rem">
      <Flex
        userSelect="none"
        backgroundColor="white"
        w="60%"
        minW="60rem"
        h="60%"
        minH="35rem"
        alignItems="center"
        justifyContent="flex-start"
        p="2rem"
        borderRadius="0.2rem"
        gap="2rem"
        bgColor="#403a3a"
      >
        <Flex bgGradient="linear(to-r, #e7e7e7, #c1c1c1)" borderColor="#555555" h="90%" w="60%" alignItems="flex-start" borderRadius="0.5rem" border="1px solid black">
          <motion.div
            key={`component-${stage}`}
            initial={{ opacity: 0 }}  // Opacidade inicial
            animate={{ opacity: 1 }}  // Opacidade final
            exit={{ opacity: 0 }}     // Opacidade ao sair
            transition={{ duration: 1 }}  // Duração da transição em segundos
            style={{
              height: '100%',
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}>
            {[1, 2].includes(stage) && <InitialCmp stage={stage} digits={digits} />}
            {[3, 4, 5, 6].includes(stage) && <SelectCandiate whiteBool={whiteBool} candidato={candidato} name={user?.usnDesName} stage={stage} digits={digits} />}
            {stage == 7 && <FimCmp setStage={setStage} setDigits={setDigits} />}
            {stage == 8 && <ApuracaoCmp apuracao={apuracao} qtdEleitores={qtdEleitores} />}
          </motion.div>
        </Flex>
        <VStack w="35%" minW="25rem" h="90%" p="2rem" borderRadius="0.2rem">
          <Flex w="100%">
            <SimpleGrid columns={3} w="100%" pl="0.8rem" alignItems="center" justifyContent="center" h="18rem" spacingX="1rem" >
              {Array.from({ length: 9 }, (_, index) => index + 1).map(e => {
                return (
                  <Button key={e} onClick={() => handleDigit(e)} h="3.2rem" w="5.2rem" bgColor="#000000" color="white" fontSize="1.6rem" boxShadow="5px 5px 10px rgba(0, 0, 0, 0.3)">{e}</Button>
                )
              })}
              <Flex display="hidden" h="3.2rem" w="5.2rem" bgColor="#403a3a" color="#403a3a" >0</Flex>
              <Button key={0} onClick={() => handleDigit(0)} h="3.2rem" w="5.2rem" bgColor="#000000" mt="0.1rem" color="white" fontSize="1.6rem" boxShadow="5px 5px 10px rgba(0, 0, 0, 0.3)">0</Button>
              <Flex display="hidden" h="3.2rem" w="5.2rem" bgColor="#403a3a" color="#403a3a" >0</Flex>

            </SimpleGrid>
          </Flex>
          <Flex gap="1rem" pt="2rem">
            <Button bgColor="white" onClick={handleBranco}>
              Branco
            </Button>
            <Button bgColor="#f09046" onClick={handleCorrige}>
              Corrige
            </Button>
            <Button bgColor="#48c079" onClick={handleConfirm}>
              Confirmar
            </Button>
          </Flex>
        </VStack>

      </Flex>
    </Flex>
  );
};

export default Urna;


export const getServerSideProps = async (ctx) => {
  destroyCookie(ctx, "ec.refreshToken");
  destroyCookie(ctx, "ec.token");

  const apiClient = setupApiClient(ctx);
  var stage;
  await apiClient
    .get("/configNoAuth/urna/stats")
    .then((e) => {
      stage = e.data.urnVldAtiva;
    })
    .catch(() => {

    });

  stage = (stage == 1 ? 3 : 1);

  return {
    props: {
      stageStart: stage
    },
  };
};

