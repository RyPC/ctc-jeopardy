import React, { useState } from "react";
import {
    Stack,
    Heading,
    Button,
    Text,
    Box,
    Input,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Badge,
} from "@chakra-ui/react";

interface Team {
    name: string;
    score: number;
}

interface TeamSetupScreenProps {
    onBack: () => void;
    onStartGame: (teams: Team[]) => void;
}

export const TeamSetupScreen: React.FC<TeamSetupScreenProps> = ({
    onBack,
    onStartGame,
}) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [currentTeamName, setCurrentTeamName] = useState("");

    const handleAddTeam = () => {
        if (currentTeamName.trim() && teams.length < 6) {
            setTeams([...teams, { name: currentTeamName.trim(), score: 0 }]);
            setCurrentTeamName("");
        }
    };

    const handleRemoveTeam = (index: number) => {
        setTeams(teams.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTeam();
        }
    };

    return (
        <Stack direction="column" align="center" gap={8} w="full" maxW="800px">
            <Stack direction="column" align="center" gap={2}>
                <Heading
                    as="h2"
                    size="xl"
                    color="#9d4edd"
                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                    textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                    fontWeight="bold"
                >
                    Set Up Teams
                </Heading>
                <Text color="#a8a8db" textAlign="center">
                    Add teams that will be playing Jeopardy
                </Text>
            </Stack>

            <Box
                w="full"
                p={6}
                bg="#16213e"
                border="2px solid #9d4edd"
                borderRadius="lg"
                boxShadow="0 4px 15px rgba(0,0,0,0.5)"
            >
                <Stack direction="column" gap={6}>
                    <FormControl>
                        <FormLabel
                            color="#9d4edd"
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                        >
                            Team Name
                        </FormLabel>
                        <HStack>
                            <Input
                                value={currentTeamName}
                                onChange={(e) =>
                                    setCurrentTeamName(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Enter team name"
                                bg="#0f3460"
                                color="white"
                                border="1px solid #9d4edd"
                                _placeholder={{ color: "#a8a8db" }}
                                _focus={{ borderColor: "#8b5cf6" }}
                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            />
                            <Button
                                onClick={handleAddTeam}
                                bg="#9d4edd"
                                color="white"
                                _hover={{ bg: "#8b5cf6" }}
                                isDisabled={
                                    !currentTeamName.trim() || teams.length >= 6
                                }
                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                fontWeight="bold"
                            >
                                Add Team
                            </Button>
                        </HStack>
                        <Text fontSize="sm" color="#a8a8db" mt={2}>
                            Add 1-6 teams
                        </Text>
                    </FormControl>
                </Stack>
            </Box>

            {teams.length > 0 && (
                <Box w="full">
                    <Stack direction="column" gap={4}>
                        <HStack justify="space-between" align="center">
                            <Heading
                                size="md"
                                color="#9d4edd"
                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            >
                                Teams ({teams.length}/6)
                            </Heading>
                            <Badge
                                colorScheme="purple"
                                fontSize="sm"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                Ready to play!
                            </Badge>
                        </HStack>

                        <Grid
                            templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                            gap={4}
                        >
                            {teams.map((team, index) => (
                                <GridItem key={index}>
                                    <Box
                                        p={4}
                                        bg="#0f3460"
                                        border="1px solid #9d4edd"
                                        borderRadius="md"
                                        position="relative"
                                    >
                                        <HStack
                                            justify="space-between"
                                            align="center"
                                        >
                                            <Text
                                                color="white"
                                                fontWeight="bold"
                                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                                fontSize="lg"
                                            >
                                                {team.name}
                                            </Text>
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleRemoveTeam(index)
                                                }
                                                fontSize="xs"
                                            >
                                                Remove
                                            </Button>
                                        </HStack>
                                        <Text
                                            color="#a8a8db"
                                            fontSize="sm"
                                            mt={1}
                                        >
                                            Starting Score: 0
                                        </Text>
                                    </Box>
                                </GridItem>
                            ))}
                        </Grid>

                        <Button
                            onClick={() => onStartGame(teams)}
                            bg="#9d4edd"
                            color="white"
                            _hover={{ bg: "#8b5cf6" }}
                            size="lg"
                            mt={4}
                            isDisabled={teams.length === 0}
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            fontWeight="bold"
                            h="60px"
                            fontSize="xl"
                        >
                            Start Jeopardy Game
                        </Button>
                    </Stack>
                </Box>
            )}

            <Button
                onClick={onBack}
                variant="outline"
                borderColor="#9d4edd"
                color="#9d4edd"
                _hover={{ bg: "#16213e" }}
                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                fontWeight="bold"
            >
                Back
            </Button>
        </Stack>
    );
};
