import { CandidatoProps } from "@/pages";
import {
    Box,
    Flex, Image, Input, Text,
    VStack
} from "@chakra-ui/react";

import { useEffect } from "react";

interface ApuracaoCmpProps {
    apuracao: Array<CandidatoProps>,
    qtdEleitores: number
}

export const ApuracaoCmp = ({ apuracao, qtdEleitores }: ApuracaoCmpProps) => {
    useEffect(() => {

    }, [])

    var senadores = apuracao.filter((e) => e.canVldTipo == 1);
    var presidentes = apuracao.filter((e) => e.canVldTipo == 2);

    if (senadores.length > 1) {
        var empateSen = senadores[0].canNumVotos == senadores[1].canNumVotos;
    }

    if (presidentes.length > 1) {
        var empatePre = presidentes[0].canNumVotos == presidentes[1].canNumVotos;
    }

    senadores.sort((a, b) => b.canNumVotos - a.canNumVotos);
    presidentes.sort((a, b) => b.canNumVotos - a.canNumVotos);

    return (
        <VStack justifyContent="center" alignItems="center" w="100%" h="100%" spacing="0.1rem" overflowX="auto" >
            <Text pb="0.5rem" fontSize="0.9rem">Aperte 'CONFIRMAR' para Continuar</Text>
            <Flex alignItems="flex-start" justifyContent="center" h="100%" w="100%" gap="5rem">
                <VStack >
                    <Text fontSize="1.3rem">Presidentes: </Text>
                    {presidentes?.map((e, i) => {
                        return (
                            <VStack justifyContent="flex-start" alignItems="flex-start" w="100%">
                                <VStack w="100%" alignItems="flex-start" justifyContent="flex-start" spacing="0">
                                    <Text fontSize="1rem" m="0" h="1.2rem" w="100%">Nome: {e.canDesName} - {e.canDesPartido} </Text>
                                    {i == 0 && !empatePre && <Text w="100%" m="0" fontSize="0.7rem" color="green">Vencedor</Text>}
                                </VStack>

                                <Text fontSize="0.7rem">Votos: {e.canNumVotos}</Text>
                            </VStack>
                        )
                    })}
                    <Text fontSize="0.7rem" w="100%">Numero de Eleitores: {qtdEleitores}</Text>
                    <Text fontSize="0.7rem" w="100%">Votos Nulos/Brancos: {Math.max(0, (qtdEleitores - presidentes.length))}</Text>
                </VStack>
                <VStack>
                    <Text fontSize="1.3rem">Senadores: </Text>
                    {senadores?.map((e, i) => {
                        return (
                            <VStack justifyContent="flex-start" alignItems="flex-start" w="100%">
                                <Flex w="100%" alignItems="center" justifyContent="flex-start">
                                    <Text fontSize="1rem">Nome: {e.canDesName} - {e.canDesPartido} </Text>
                                    {i == 0 && !empateSen && <Text fontSize="0.8rem" color="green">&nbsp; Vencedor</Text>}
                                </Flex>
                                <Text fontSize="0.7rem">Votos: {e.canNumVotos}</Text>
                            </VStack>
                        )
                    })}
                    <Text fontSize="0.7rem" w="100%">Numero de Eleitores: {qtdEleitores}</Text>
                    <Text fontSize="0.7rem" w="100%">Votos Nulos/Brancos: {Math.max(0, (qtdEleitores - senadores.length))}</Text>
                </VStack>
            </Flex>
        </VStack>
    )

};