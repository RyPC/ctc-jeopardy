import React, { useRef } from "react";
import { Stack, Heading, Button, Text, useToast } from "@chakra-ui/react";

interface LandingScreenProps {
    onUploadJSON: (
        questions: Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    ) => void;
    onManualEntry: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
    onUploadJSON,
    onManualEntry,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const questions = JSON.parse(content);

                // Validate the JSON structure
                if (!Array.isArray(questions)) {
                    throw new Error("JSON must contain an array of questions");
                }

                const validQuestions = questions.every(
                    (q) =>
                        q.category &&
                        q.question &&
                        q.answer &&
                        typeof q.points === "number"
                );

                if (!validQuestions) {
                    throw new Error(
                        "Each question must have category, question, answer, and points"
                    );
                }

                onUploadJSON(questions);
                toast({
                    title: "Questions loaded successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Error loading questions",
                    description:
                        error instanceof Error
                            ? error.message
                            : "Invalid JSON format",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <Stack direction="column" align="center" gap={8}>
            <Heading
                as="h2"
                size="xl"
                color="#9d4edd"
                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                fontWeight="bold"
            >
                Create Your Jeopardy Game
            </Heading>
            <Stack direction="row" gap={8} justify="center" w="full">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    h="200px"
                    w="300px"
                    bg="#0f3460"
                    color="#9d4edd"
                    border="3px solid #9d4edd"
                    _hover={{
                        bg: "#16213e",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 25px rgba(157, 77, 221, 0.4)",
                        borderColor: "#8b5cf6",
                    }}
                    transition="all 0.3s"
                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                    fontWeight="bold"
                >
                    <Stack>
                        <Heading
                            size="md"
                            color="#9d4edd"
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                        >
                            Upload JSON
                        </Heading>
                        <Text fontSize="sm" color="#a8a8db">
                            Import your questions from a JSON file
                        </Text>
                    </Stack>
                </Button>

                <Button
                    onClick={onManualEntry}
                    size="lg"
                    h="200px"
                    w="300px"
                    bg="#0f3460"
                    color="#9d4edd"
                    border="3px solid #9d4edd"
                    _hover={{
                        bg: "#16213e",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 25px rgba(157, 77, 221, 0.4)",
                        borderColor: "#8b5cf6",
                    }}
                    transition="all 0.3s"
                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                    fontWeight="bold"
                >
                    <Stack>
                        <Heading
                            size="md"
                            color="#9d4edd"
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                        >
                            Manual Entry
                        </Heading>
                        <Text fontSize="sm" color="#a8a8db">
                            Create your questions manually
                        </Text>
                    </Stack>
                </Button>
            </Stack>
        </Stack>
    );
};
