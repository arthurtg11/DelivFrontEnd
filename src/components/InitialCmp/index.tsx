import {
    Flex, Text,
    VStack
} from "@chakra-ui/react";


interface InitialCmpProps {
    stage: number,
    digits: number[]
}

export const InitialCmp = ({ stage, digits }: InitialCmpProps) => {


    if (stage == 1)
        return (
    
            <VStack justifyContent="center" alignItems="center" w="100%" h="100%" >
                <Text>URNA NÃO INICIALIZADA</Text>
                <Flex>
                    <Text>Clique em confirmar para realizar a inicialização.</Text>
                </Flex>
            </VStack>
        );

    if (stage == 2)
        return (
            <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
                <Text>Digite a senha para alterar o status da urna.</Text>
                <Flex pt="1rem">
                    <Flex gap="0.5rem">
                        {digits.map((e, i) => {
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
        );
};