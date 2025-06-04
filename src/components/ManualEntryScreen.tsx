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
    onComplete: (
        questions: Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    ) => void;
}

export const ManualEntryScreen: React.FC<ManualEntryScreenProps> = ({
    categories,
    onBack,
    questionCount,
    onComplete,
}) => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [questions, setQuestions] = useState<
        Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    >([]);
    const [allQuestions, setAllQuestions] = useState<
        Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    >([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const currentCategory = categories[currentCategoryIndex];
    const progress = (currentCategoryIndex / categories.length) * 100;
    const currentQuestionNumber = questions.length + 1;
    const currentPoints = currentQuestionNumber * 200;

    const handleAddQuestion = async () => {
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

        const newQuestion = {
            category: currentCategory.name,
            question: currentQuestion,
            answer: currentAnswer,
            points: currentPoints,
        };

        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setCurrentQuestion("");
        setCurrentAnswer("");

        // If we've added all questions for this category, move to next category
        if (updatedQuestions.length === questionCount) {
            // Add current category's questions to allQuestions
            setAllQuestions((prev) => [...prev, ...updatedQuestions]);

            if (currentCategoryIndex < categories.length - 1) {
                setCurrentCategoryIndex(currentCategoryIndex + 1);
                setQuestions([]);
            } else {
                setIsLoading(true);
                try {
                    // Download all questions as JSON
                    const jsonString = JSON.stringify(
                        allQuestions.concat(updatedQuestions),
                        null,
                        2
                    );
                    const blob = new Blob([jsonString], {
                        type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "jeopardy-questions.json";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                    // Show completion toast and transition to board
                    toast({
                        title: "All categories completed!",
                        description: "Questions have been downloaded as JSON",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        onCloseComplete: () =>
                            onComplete(allQuestions.concat(updatedQuestions)),
                    });
                } finally {
                    setIsLoading(false);
                }
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
                    Category {currentCategoryIndex + 1} of {categories.length}
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
                            Question {currentQuestionNumber} of {questionCount}
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
                        isLoading={isLoading}
                        loadingText={
                            questions.length + 1 === questionCount
                                ? currentCategoryIndex < categories.length - 1
                                    ? "Completing Category..."
                                    : "Finishing..."
                                : "Adding Question..."
                        }
                    >
                        {questions.length + 1 === questionCount
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
