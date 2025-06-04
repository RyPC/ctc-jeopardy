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
    const [questions, setQuestions] = useState<any[]>([]);

    const handleUploadCSV = () => {
        // TODO: Implement CSV upload
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
            // setQuestionCount(5);
        }
    };

    const handleStartManualEntry = () => {
        if (categories.length > 0) {
            setCurrentScreen("manual-entry");
        }
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case "landing":
                return (
                    <LandingScreen
                        onUploadCSV={handleUploadCSV}
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
                    />
                );
            case "board":
                return (
                    <BoardScreen onBack={() => setCurrentScreen("landing")} />
                );
        }
    };

    return (
        <ChakraProvider>
            <Box minH="100vh" bg="white">
                <Box
                    as="header"
                    bg="#6231D8"
                    color="white"
                    py={8}
                    borderBottom="4px solid"
                    borderColor="#B0A0E2"
                    boxShadow="md"
                >
                    <Container maxW="container.xl">
                        <Heading
                            as="h1"
                            size="2xl"
                            textAlign="center"
                            textShadow="2px 2px 0 #5557AF"
                        >
                            CTC Jeopardy
                        </Heading>
                    </Container>
                </Box>

                <Container maxW="container.xl" py={8}>
                    {renderScreen()}
                </Container>
            </Box>
        </ChakraProvider>
    );
}

export default App;
