import {
    Box,
    Flex, Image, Input, Text,
    VStack
} from "@chakra-ui/react";

import { useEffect } from "react";

export const FimCmp = ({ setStage, setDigits }) => {
    useEffect(() => {
        setTimeout(function () {
            setDigits(Array.from({ length: 12 }, () => -1))
            setStage(3)
        }, 3000);

    }, [])
    return (
        <VStack justifyContent="center" alignItems="center" w="100%" h="100%" >
            <Flex>
                <Text fontSize="4rem">FIM</Text>
            </Flex>
            <Text>Voto computado com sucesso.</Text>
        </VStack>
    )

};