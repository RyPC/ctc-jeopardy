import React from "react";
import { Stack, Heading, Button, Text } from "@chakra-ui/react";

interface BoardScreenProps {
    onBack: () => void;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({ onBack }) => {
    return (
        <Stack direction="column" align="center" gap={6}>
            <Heading as="h2" size="xl" color="#5557AF">
                Jeopardy Board
            </Heading>
            <Text>Your game board will appear here</Text>
            <Button
                onClick={onBack}
                bg="#6231D8"
                color="white"
                _hover={{ bg: "#5557AF" }}
            >
                Back to Start
            </Button>
        </Stack>
    );
};
