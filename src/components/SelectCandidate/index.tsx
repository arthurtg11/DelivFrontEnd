import { CandidatoProps } from "@/pages";
import {
    Box,
    Flex, Image, Text,
    VStack
} from "@chakra-ui/react";

import { useState } from "react";

interface SelectCandiateProps {
    stage: number,
    digits: number[],
    name: string
    candidato: CandidatoProps;
    whiteBool: boolean;
}


export const SelectCandiate = ({ stage, digits, name, candidato, whiteBool }: SelectCandiateProps) => {

    if (stage == 3)
        return (
            <VStack w="100%" h="100%" alignItems="center" >
                <Text fontSize="1rem" pt="1rem">Precione o botão 'Branco' para finalizar a urna.</Text>
                <VStack justifyContent="center" alignItems="center" w="100%" h="100%">

                    <Text>Digite seu titulo de eleitor:</Text>
                    <Flex pt="1rem">
                        <Flex gap="0.5rem">
                            {digits?.map((e, i) => {
                                return (
                                    <Flex key={i} border="2px solid black" h="3.8rem" w="2.5rem" fontSize="2rem" alignItems="center" justifyContent="center">
                                        <Text>
                                            {e == -1 ? '' : e}
                                        </Text>
                                    </Flex>)
                            })}
                        </Flex>
                    </Flex>
                </VStack>
            </VStack>
        );


    if ([4, 5, 6].includes(stage))
        return (
            <VStack w="100%" spacing={0} minH="28rem" >
                <Text h="0.1rem" fontSize="1rem" w="100%" px="2rem" mt="0.5rem">Eleitor: {name}</Text>
                <Flex w="100%" alignItems="flex-start" p="2rem" >
                    <VStack w="80%" alignItems="flex-start" >
                        <Text>SEU VOTO PARA</Text>
                        <Flex alignItems="center" justifyContent="center" w="100%" pt="1rem">
                            <Text ml="10%">{stage != 6 ? 'SENADOR' : 'PRESIDENTE'}</Text>
                        </Flex>
                        <Flex gap="0.5rem" pt="1rem">
                            {digits.map(e => {
                                return (
                                    <Flex border="2px solid black" h="3.8rem" w="2.5rem" fontSize="2rem" alignItems="center" justifyContent="center">
                                        <Text>
                                            {e == -1 ? '' : e}
                                        </Text>
                                    </Flex>)
                            })}
                        </Flex>
                        <VStack pt="2rem" w="100%" alignItems="flex-start" justifyContent="flex-start" minH="6rem">
                            {whiteBool ?
                                (<>
                                    <Text>Voto em Branco.</Text>
                                    <Text>Precione confirme para continuar</Text>
                                </>)
                                :
                                (<>
                                    <Text>Nome: {candidato?.canDesName}</Text>
                                    <Text>Partido: {candidato?.canDesPartido}</Text>
                                </>)}
                        </VStack>
                    </VStack>
                    <VStack>
                        <VStack alignItems="flex-start" justifyContent="center" spacing={0} border="1px solid black" borderRadius="0.5rem" >
                            {whiteBool ?
                                <Flex h="10rem" w="7.8rem" borderRadius="0.5rem" borderBottomEndRadius="0rem" borderBottomStartRadius="0rem" bgColor="white" />
                                : <Image src={candidato?.canDesPhoto.length == 0 || candidato?.canDesPhoto == undefined ? "/default.png" : candidato?.canDesPhoto} h="10rem" w="8rem" borderRadius="0.5rem" borderBottomEndRadius="0rem" borderBottomStartRadius="0rem" />}

                            <Flex bgColor="white" w="100%" mt="0" alignItems="center" justifyContent="center" borderBottomEndRadius="0.5rem" borderBottomStartRadius="0.5rem">
                                <Text fontSize="1.1rem">{stage != 6 ? 'SENADOR' : 'PRESIDENTE'}</Text>
                            </Flex>
                        </VStack>
                        {candidato?.canDesNameVice && (<Text fontSize="0.9rem" w="100%">Vice: {candidato?.canDesNameVice}</Text>)}
                    </VStack>
                </Flex>
                <Box w="100%" h="0.2rem" bgColor="black" />
                <VStack spacing="0rem" fontSize="1.1rem" w="100%" alignItems="flex-start" px="1rem">
                    <Text>Aperta a tecla:</Text>
                    <Text>CONFIRMA para CONFIRMAR este voto.</Text>
                    <Text>CORRIGE para CORRIGIR este voto.</Text>
                </VStack>
            </VStack>
        );
};