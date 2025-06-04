import React from "react";
import { Stack, Heading, Button, Text } from "@chakra-ui/react";

interface LandingScreenProps {
    onUploadCSV: () => void;
    onManualEntry: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
    onUploadCSV,
    onManualEntry,
}) => {
    return (
        <Stack direction="column" align="center" gap={8}>
            <Heading as="h2" size="xl" color="#5557AF">
                Create Your Jeopardy Game
            </Heading>
            <Stack direction="row" gap={8} justify="center" w="full">
                <Button
                    onClick={onUploadCSV}
                    size="lg"
                    h="200px"
                    w="300px"
                    bg="#6231D8"
                    color="white"
                    _hover={{
                        bg: "#5557AF",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                    }}
                    transition="all 0.3s"
                >
                    <Stack>
                        <Heading size="md">Upload CSV</Heading>
                        <Text fontSize="sm" color="#B0A0E2">
                            Import your questions from a CSV file
                        </Text>
                    </Stack>
                </Button>

                <Button
                    onClick={onManualEntry}
                    size="lg"
                    h="200px"
                    w="300px"
                    bg="#6231D8"
                    color="white"
                    _hover={{
                        bg: "#5557AF",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                    }}
                    transition="all 0.3s"
                >
                    <Stack>
                        <Heading size="md">Manual Entry</Heading>
                        <Text fontSize="sm" color="#B0A0E2">
                            Create your questions manually
                        </Text>
                    </Stack>
                </Button>
            </Stack>
        </Stack>
    );
};
