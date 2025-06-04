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
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
    onBack,
    categories,
    questions,
    questionCount,
}) => {
    const bgColor = useColorModeValue("#6231D8", "#5557AF");
    const hoverBgColor = useColorModeValue("#5557AF", "#6231D8");
    const textColor = "white";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedQuestion, setSelectedQuestion] = useState<{
        question: string;
        answer: string;
        points: number;
    } | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // Group questions by category
    const questionsByCategory = categories.map((category) => {
        return questions.filter((q) => q.category === category.name);
    });

    const handleCardClick = (question: {
        question: string;
        answer: string;
        points: number;
    }) => {
        setSelectedQuestion(question);
        setShowAnswer(false);
        onOpen();
    };

    const handleClose = () => {
        onClose();
        setShowAnswer(false);
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
                        const isQuestionAvailable = !!question;

                        return (
                            <GridItem key={`${colIndex}-${rowIndex}`}>
                                <Box
                                    p={4}
                                    bg={
                                        isQuestionAvailable
                                            ? bgColor
                                            : "gray.300"
                                    }
                                    color={textColor}
                                    borderRadius="md"
                                    textAlign="center"
                                    fontWeight="bold"
                                    fontSize="2xl"
                                    minH="100px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    cursor={
                                        isQuestionAvailable
                                            ? "pointer"
                                            : "not-allowed"
                                    }
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                    _hover={
                                        isQuestionAvailable
                                            ? {
                                                  bg: hoverBgColor,
                                                  transform: "scale(1.02)",
                                                  transition: "all 0.2s",
                                              }
                                            : {}
                                    }
                                    onClick={() =>
                                        isQuestionAvailable &&
                                        handleCardClick(question)
                                    }
                                >
                                    ${points}
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
                        Question for ${selectedQuestion?.points}
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
                                        color="#6231D8"
                                        textAlign="center"
                                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                    >
                                        Answer: {selectedQuestion?.answer}
                                    </Text>
                                </Box>
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
