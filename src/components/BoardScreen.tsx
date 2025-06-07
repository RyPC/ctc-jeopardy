import React, { useState } from "react";
import {
    Stack,
    Heading,
    Button,
    Text,
    Grid,
    GridItem,
    Box,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    HStack,
    Badge,
    Flex,
} from "@chakra-ui/react";
import { Category } from "../types";

interface BoardScreenProps {
    onBack: () => void;
    categories: Category[];
    questions: Array<{
        category: string;
        question: string;
        answer: string;
        points: number;
    }>;
    questionCount: number;
    teams?: Array<{
        name: string;
        score: number;
    }>;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
    onBack,
    categories,
    questions,
    questionCount,
    teams = [],
}) => {
    const bgColor = useColorModeValue("#6231D8", "#5557AF");
    const hoverBgColor = useColorModeValue("#5557AF", "#6231D8");
    const textColor = "white";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedQuestion, setSelectedQuestion] = useState<{
        question: string;
        answer: string;
        points: number;
        cardKey: string;
    } | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [clickedCards, setClickedCards] = useState<Set<string>>(new Set());
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [teamScores, setTeamScores] = useState(
        teams.map((team) => ({ ...team }))
    );

    // Group questions by category
    const questionsByCategory = categories.map((category) => {
        return questions.filter((q) => q.category === category.name);
    });

    const currentTeam =
        teamScores.length > 0 ? teamScores[currentTurnIndex] : null;

    const handleCardClick = (
        question: {
            question: string;
            answer: string;
            points: number;
        },
        cardKey: string
    ) => {
        if (clickedCards.has(cardKey)) return; // Don't allow clicking if already clicked

        setSelectedQuestion({
            ...question,
            cardKey,
        });
        setShowAnswer(false);
        onOpen();
    };

    const handleClose = () => {
        onClose();
        setShowAnswer(false);
    };

    const handleMarkAsUsed = () => {
        if (selectedQuestion) {
            setClickedCards((prev) =>
                new Set(prev).add(selectedQuestion.cardKey)
            );

            // Rotate to next team's turn
            if (teamScores.length > 0) {
                setCurrentTurnIndex((prev) => (prev + 1) % teamScores.length);
            }
        }
        handleClose();
    };

    const updateTeamScore = (teamIndex: number, pointsToAdd: number) => {
        setTeamScores((prev) =>
            prev.map((team, index) =>
                index === teamIndex
                    ? { ...team, score: team.score + pointsToAdd }
                    : team
            )
        );
    };

    return (
        <Stack direction="column" align="center" gap={8} w="full">
            <Heading
                as="h2"
                size="xl"
                color="#9d4edd"
                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                fontWeight="bold"
            >
                JEOPARDY!
            </Heading>

            {/* Team Scores and Current Turn */}
            {teamScores.length > 0 && (
                <Box w="full" maxW="1200px">
                    <VStack spacing={4}>
                        {/* Team Scores */}
                        <Grid
                            templateColumns={`repeat(${Math.min(
                                teamScores.length,
                                3
                            )}, 1fr)`}
                            gap={4}
                            w="full"
                        >
                            {teamScores.map((team, index) => (
                                <GridItem key={index}>
                                    <Box
                                        p={4}
                                        bg={
                                            index === currentTurnIndex
                                                ? "#0f3460"
                                                : "#16213e"
                                        }
                                        border={
                                            index === currentTurnIndex
                                                ? "2px solid #9d4edd"
                                                : "1px solid #666"
                                        }
                                        borderRadius="md"
                                        textAlign="center"
                                        position="relative"
                                    >
                                        {index === currentTurnIndex && (
                                            <Badge
                                                position="absolute"
                                                top="-10px"
                                                right="-10px"
                                                colorScheme="purple"
                                                borderRadius="full"
                                                fontSize="xs"
                                            >
                                                Turn
                                            </Badge>
                                        )}
                                        <Text
                                            color="white"
                                            fontWeight="bold"
                                            fontSize="lg"
                                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                        >
                                            {team.name}
                                        </Text>
                                        <Text
                                            color="#9d4edd"
                                            fontSize="2xl"
                                            fontWeight="bold"
                                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                        >
                                            ${team.score}
                                        </Text>
                                    </Box>
                                </GridItem>
                            ))}
                        </Grid>
                    </VStack>
                </Box>
            )}

            <Grid
                templateColumns={`repeat(${categories.length}, 1fr)`}
                gap={4}
                w="full"
                maxW="1200px"
            >
                {/* Category Headers */}
                {categories.map((category, index) => (
                    <GridItem key={`header-${index}`}>
                        <Box
                            p={4}
                            bg="#8A7BC8"
                            color="white"
                            borderRadius="md"
                            textAlign="center"
                            fontWeight="bold"
                            fontSize="xl"
                            minH="100px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="none"
                            boxShadow="0 4px 6px rgba(0,0,0,0.15)"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            position="relative"
                            _after={{
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: "5%",
                                right: "5%",
                                height: "4px",
                                bg: "#B0A0E2",
                                borderRadius: "full",
                            }}
                            _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 8px rgba(0,0,0,0.2)",
                                transition: "all 0.2s",
                            }}
                        >
                            {category.name}
                        </Box>
                    </GridItem>
                ))}

                {/* Question Cells */}
                {Array.from({ length: questionCount }).map((_, rowIndex) =>
                    categories.map((category, colIndex) => {
                        const question =
                            questionsByCategory[colIndex][rowIndex];
                        const points = (rowIndex + 1) * 200;
                        const cardKey = `${colIndex}-${rowIndex}`;
                        const isQuestionAvailable = !!question;
                        const isClicked = clickedCards.has(cardKey);
                        const isClickable = isQuestionAvailable && !isClicked;

                        return (
                            <GridItem key={cardKey}>
                                <Box
                                    p={4}
                                    bg={
                                        isClicked
                                            ? "#2d2d2d"
                                            : isQuestionAvailable
                                            ? bgColor
                                            : "gray.300"
                                    }
                                    color={isClicked ? "#666" : textColor}
                                    borderRadius="md"
                                    textAlign="center"
                                    fontWeight="bold"
                                    fontSize="2xl"
                                    minH="100px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    cursor={
                                        isClickable ? "pointer" : "not-allowed"
                                    }
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                    opacity={isClicked ? 0.4 : 1}
                                    _hover={
                                        isClickable
                                            ? {
                                                  bg: hoverBgColor,
                                                  transform: "scale(1.02)",
                                                  transition: "all 0.2s",
                                              }
                                            : {}
                                    }
                                    onClick={() =>
                                        isClickable &&
                                        handleCardClick(question, cardKey)
                                    }
                                >
                                    {isClicked ? "✓" : `$${points}`}
                                </Box>
                            </GridItem>
                        );
                    })
                )}
            </Grid>

            <Button
                onClick={onBack}
                bg="#6231D8"
                color="white"
                _hover={{ bg: "#5557AF" }}
                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                fontWeight="bold"
            >
                Back to Start
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
                <ModalOverlay />
                <ModalContent minH="500px">
                    <ModalHeader
                        color="#5557AF"
                        fontSize="2xl"
                        textAlign="center"
                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                    >
                        <VStack spacing={2}>
                            <Text>
                                Question for ${selectedQuestion?.points}
                            </Text>
                            {currentTeam && (
                                <Badge
                                    colorScheme="purple"
                                    fontSize="md"
                                    px={3}
                                    py={1}
                                >
                                    {currentTeam.name}'s Turn
                                </Badge>
                            )}
                        </VStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={8} align="stretch" h="full">
                            <Box
                                p={8}
                                bg="#F7F7F7"
                                borderRadius="md"
                                border="2px solid"
                                borderColor="#B0A0E2"
                                minH="200px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="#5557AF"
                                    textAlign="center"
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                >
                                    {selectedQuestion?.question}
                                </Text>
                            </Box>

                            {showAnswer ? (
                                <VStack spacing={4}>
                                    <Box
                                        p={8}
                                        bg="#F7F7F7"
                                        borderRadius="md"
                                        border="2px solid"
                                        borderColor="#B0A0E2"
                                        minH="200px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        w="full"
                                    >
                                        <Text
                                            fontSize="2xl"
                                            fontWeight="bold"
                                            color="#6231D8"
                                            textAlign="center"
                                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                        >
                                            Answer: {selectedQuestion?.answer}
                                        </Text>
                                    </Box>

                                    {/* Score Update Buttons */}
                                    {teamScores.length > 0 &&
                                        selectedQuestion && (
                                            <VStack spacing={3} w="full">
                                                <Text
                                                    color="#5557AF"
                                                    fontWeight="bold"
                                                    fontSize="lg"
                                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                                >
                                                    Did {currentTeam?.name} get
                                                    it right?
                                                </Text>
                                                <HStack spacing={4} w="full">
                                                    <Button
                                                        flex={1}
                                                        bg="green.500"
                                                        color="white"
                                                        _hover={{
                                                            bg: "green.600",
                                                        }}
                                                        onClick={() => {
                                                            updateTeamScore(
                                                                currentTurnIndex,
                                                                selectedQuestion.points
                                                            );
                                                            handleMarkAsUsed();
                                                        }}
                                                        h="50px"
                                                        fontSize="lg"
                                                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                                        fontWeight="bold"
                                                    >
                                                        Correct (+$
                                                        {
                                                            selectedQuestion.points
                                                        }
                                                        )
                                                    </Button>
                                                    <Button
                                                        flex={1}
                                                        bg="red.500"
                                                        color="white"
                                                        _hover={{
                                                            bg: "red.600",
                                                        }}
                                                        onClick={() => {
                                                            updateTeamScore(
                                                                currentTurnIndex,
                                                                -Math.floor(
                                                                    selectedQuestion.points /
                                                                        2
                                                                )
                                                            );
                                                            handleMarkAsUsed();
                                                        }}
                                                        h="50px"
                                                        fontSize="lg"
                                                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                                        fontWeight="bold"
                                                    >
                                                        Wrong (-$
                                                        {Math.floor(
                                                            selectedQuestion.points /
                                                                2
                                                        )}
                                                        )
                                                    </Button>
                                                </HStack>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    borderColor="#8A7BC8"
                                                    color="#8A7BC8"
                                                    _hover={{ bg: "#f0f0f0" }}
                                                    onClick={handleMarkAsUsed}
                                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                                >
                                                    No Score Change & Close
                                                </Button>
                                            </VStack>
                                        )}

                                    {/* Fallback if no teams */}
                                    {teamScores.length === 0 && (
                                        <Button
                                            size="lg"
                                            bg="#8A7BC8"
                                            color="white"
                                            _hover={{ bg: "#5557AF" }}
                                            onClick={handleMarkAsUsed}
                                            h="60px"
                                            fontSize="xl"
                                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                            fontWeight="bold"
                                            w="full"
                                        >
                                            Close
                                        </Button>
                                    )}
                                </VStack>
                            ) : (
                                <Button
                                    size="lg"
                                    bg="#8A7BC8"
                                    color="white"
                                    _hover={{ bg: "#5557AF" }}
                                    onClick={() => setShowAnswer(true)}
                                    h="60px"
                                    fontSize="xl"
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                    fontWeight="bold"
                                >
                                    Reveal Answer
                                </Button>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Stack>
    );
};
