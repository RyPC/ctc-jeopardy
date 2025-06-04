import React, { useState } from "react";
import {
    Stack,
    Heading,
    Button,
    Text,
    Box,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    Progress,
    useToast,
    Badge,
    HStack,
} from "@chakra-ui/react";
import { Category } from "../types";

interface Question {
    question: string;
    answer: string;
    points: number;
}

interface ManualEntryScreenProps {
    categories: Category[];
    onBack: () => void;
    questionCount: number;
}

export const ManualEntryScreen: React.FC<ManualEntryScreenProps> = ({
    categories,
    onBack,
    questionCount,
}) => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const toast = useToast();

    const currentCategory = categories[currentCategoryIndex];
    const progress = (currentCategoryIndex / categories.length) * 100;
    const currentQuestionNumber = questions.length + 1;
    const currentPoints = currentQuestionNumber * 200;

    const handleAddQuestion = () => {
        if (!currentQuestion || !currentAnswer) {
            toast({
                title: "Missing information",
                description: "Please fill in both question and answer",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newQuestion: Question = {
            question: currentQuestion,
            answer: currentAnswer,
            points: currentPoints,
        };

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion("");
        setCurrentAnswer("");

        // If we've added all questions for this category, move to next category
        if (questions.length + 1 === currentCategory.questionCount) {
            if (currentCategoryIndex < categories.length - 1) {
                setCurrentCategoryIndex(currentCategoryIndex + 1);
                setQuestions([]);
            } else {
                // TODO: Handle completion of all categories
                toast({
                    title: "All categories completed!",
                    description:
                        "You've added all questions for all categories",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Stack direction="column" align="center" gap={8} w="full" maxW="800px">
            <Stack direction="column" align="center" gap={2} w="full">
                <Heading as="h2" size="xl" color="#5557AF">
                    Manual Entry
                </Heading>
                <Text color="gray.600">
                    Category {currentCategoryIndex + 1} of {questionCount}
                </Text>
                <Progress
                    value={progress}
                    size="sm"
                    w="full"
                    colorScheme="purple"
                    borderRadius="full"
                />
            </Stack>

            <Box
                w="full"
                p={6}
                border="1px solid"
                borderColor="#B0A0E2"
                borderRadius="lg"
                bg="white"
            >
                <Stack direction="column" gap={6}>
                    <Heading size="md" color="#5557AF">
                        {currentCategory.name}
                    </Heading>
                    <Stack direction="column" gap={2}>
                        <Text color="gray.600">
                            Question {currentQuestionNumber} of{" "}
                            {currentCategory.questionCount}
                        </Text>
                        <Badge
                            colorScheme="purple"
                            fontSize="1em"
                            px={3}
                            py={1}
                            borderRadius="full"
                            alignSelf="start"
                        >
                            {currentPoints} points
                        </Badge>
                    </Stack>

                    <FormControl>
                        <FormLabel>Question</FormLabel>
                        <Textarea
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            placeholder="Enter your question"
                            size="lg"
                            rows={3}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Answer</FormLabel>
                        <Textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            placeholder="Enter the answer"
                            size="lg"
                            rows={3}
                        />
                    </FormControl>

                    <Button
                        onClick={handleAddQuestion}
                        bg="#6231D8"
                        color="white"
                        _hover={{ bg: "#5557AF" }}
                        size="lg"
                    >
                        {questions.length + 1 === currentCategory.questionCount
                            ? currentCategoryIndex < categories.length - 1
                                ? "Complete Category"
                                : "Finish All Categories"
                            : "Add Question"}
                    </Button>
                </Stack>
            </Box>

            <Button
                onClick={onBack}
                variant="outline"
                borderColor="#6231D8"
                color="#6231D8"
                _hover={{ bg: "#B0A0E2" }}
            >
                Back to Categories
            </Button>
        </Stack>
    );
};
