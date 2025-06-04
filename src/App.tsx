import React, { useState } from "react";
import { ChakraProvider, Box, Heading, Container } from "@chakra-ui/react";
import { LandingScreen } from "./components/LandingScreen";
import { CategorySetupScreen } from "./components/CategorySetupScreen";
import { ManualEntryScreen } from "./components/ManualEntryScreen";
import { BoardScreen } from "./components/BoardScreen";
import { Screen, Category } from "./types";

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [questionCount, setQuestionCount] = useState(5);
    const [questions, setQuestions] = useState<
        Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    >([]);

    const handleUploadJSON = (
        uploadedQuestions: Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    ) => {
        setQuestions(uploadedQuestions);
        const uniqueCategories = Array.from(
            new Set(uploadedQuestions.map((q) => q.category))
        );
        const categoriesWithCounts = uniqueCategories.map((name) => ({
            name,
            questionCount: uploadedQuestions.filter((q) => q.category === name)
                .length,
        }));

        // Set the global question count to match the maximum questions per category
        const maxQuestionsPerCategory = Math.max(
            ...categoriesWithCounts.map((c) => c.questionCount)
        );
        setQuestionCount(maxQuestionsPerCategory);

        setCategories(categoriesWithCounts);
        setCurrentScreen("board");
    };

    const handleManualEntry = () => {
        setCurrentScreen("category-setup");
    };

    const handleAddCategory = () => {
        if (currentCategory && questionCount > 0) {
            setCategories([
                ...categories,
                { name: currentCategory, questionCount },
            ]);
            setCurrentCategory("");
        }
    };

    const handleStartManualEntry = () => {
        if (categories.length > 0) {
            setCurrentScreen("manual-entry");
        }
    };

    const handleCompleteManualEntry = (
        newQuestions: Array<{
            category: string;
            question: string;
            answer: string;
            points: number;
        }>
    ) => {
        setQuestions(newQuestions);
        setCurrentScreen("board");
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case "landing":
                return (
                    <LandingScreen
                        onUploadJSON={handleUploadJSON}
                        onManualEntry={handleManualEntry}
                    />
                );
            case "category-setup":
                return (
                    <CategorySetupScreen
                        categories={categories}
                        currentCategory={currentCategory}
                        questionCount={questionCount}
                        onCategoryChange={setCurrentCategory}
                        onQuestionCountChange={setQuestionCount}
                        onAddCategory={handleAddCategory}
                        onStartManualEntry={handleStartManualEntry}
                        onBack={() => setCurrentScreen("landing")}
                    />
                );
            case "manual-entry":
                return (
                    <ManualEntryScreen
                        categories={categories}
                        questionCount={questionCount}
                        onBack={() => setCurrentScreen("category-setup")}
                        onComplete={handleCompleteManualEntry}
                    />
                );
            case "board":
                return (
                    <BoardScreen
                        onBack={() => setCurrentScreen("landing")}
                        categories={categories}
                        questions={questions}
                        questionCount={questionCount}
                    />
                );
        }
    };

    return (
        <ChakraProvider>
            <Box minH="100vh" bg="#1a1a2e" position="relative">
                {/* Background Logo */}
                <Box
                    position="fixed"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="900px"
                    height="600px"
                    opacity="0.03"
                    zIndex="0"
                    pointerEvents="none"
                    backgroundImage="url('/ctclogo.svg')"
                    backgroundSize="contain"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                />
                <Box
                    as="header"
                    bg="#16213e"
                    color="#9d4edd"
                    py={8}
                    borderBottom="4px solid"
                    borderColor="#0f3460"
                    boxShadow="0 4px 20px rgba(0,0,0,0.5)"
                    position="relative"
                    zIndex="1"
                >
                    <Container maxW="container.xl">
                        <Heading
                            as="h1"
                            size="2xl"
                            textAlign="center"
                            textShadow="3px 3px 0 #0f3460, 6px 6px 10px rgba(0,0,0,0.8)"
                            fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            letterSpacing="wider"
                            fontWeight="bold"
                        >
                            CTC JEOPARDY!
                        </Heading>
                    </Container>
                </Box>

                <Container
                    maxW="container.xl"
                    py={8}
                    position="relative"
                    zIndex="1"
                >
                    {renderScreen()}
                </Container>
            </Box>
        </ChakraProvider>
    );
}

export default App;
