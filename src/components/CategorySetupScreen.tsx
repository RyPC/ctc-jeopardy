import React from "react";
import {
    Stack,
    Heading,
    Button,
    Text,
    Box,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { Category } from "../types";
import { MIN_CATEGORIES } from "../constants";

interface CategorySetupScreenProps {
    categories: Category[];
    currentCategory: string;
    questionCount: number;
    onCategoryChange: (category: string) => void;
    onQuestionCountChange: (count: number) => void;
    onAddCategory: () => void;
    onStartManualEntry: () => void;
    onBack: () => void;
}

export const CategorySetupScreen: React.FC<CategorySetupScreenProps> = ({
    categories,
    currentCategory,
    questionCount,
    onCategoryChange,
    onQuestionCountChange,
    onAddCategory,
    onStartManualEntry,
    onBack,
}) => {
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
                    Set Up Categories
                </Heading>
                <Text color="#a8a8db" textAlign="center">
                    Create categories for your Jeopardy game
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
                <Grid templateColumns="repeat(2, 1fr)" gap={8} w="full">
                    <GridItem>
                        <Stack direction="column" gap={4}>
                            <FormControl>
                                <FormLabel
                                    color="#9d4edd"
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                >
                                    Category Name
                                </FormLabel>
                                <Input
                                    value={currentCategory}
                                    onChange={(e) =>
                                        onCategoryChange(e.target.value)
                                    }
                                    placeholder="Enter category name"
                                    bg="#0f3460"
                                    color="white"
                                    border="1px solid #9d4edd"
                                    _placeholder={{ color: "#a8a8db" }}
                                    _focus={{ borderColor: "#8b5cf6" }}
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                />
                            </FormControl>

                            <Button
                                onClick={onAddCategory}
                                bg="#9d4edd"
                                color="white"
                                _hover={{ bg: "#8b5cf6" }}
                                isDisabled={!currentCategory}
                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                fontWeight="bold"
                            >
                                Add Category
                            </Button>
                        </Stack>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel
                                color="#9d4edd"
                                fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                            >
                                Questions per Category
                            </FormLabel>
                            <NumberInput
                                min={1}
                                max={10}
                                value={questionCount}
                                onChange={(_, value) =>
                                    onQuestionCountChange(value)
                                }
                            >
                                <NumberInputField
                                    bg="#0f3460"
                                    color="white"
                                    border="1px solid #9d4edd"
                                    _focus={{ borderColor: "#8b5cf6" }}
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper
                                        color="#9d4edd"
                                        _hover={{
                                            bg: "#8b5cf6",
                                            color: "white",
                                        }}
                                    />
                                    <NumberDecrementStepper
                                        color="#9d4edd"
                                        _hover={{
                                            bg: "#8b5cf6",
                                            color: "white",
                                        }}
                                    />
                                </NumberInputStepper>
                            </NumberInput>
                            <Text fontSize="sm" color="#a8a8db" mt={2}>
                                This will apply to all categories
                            </Text>
                        </FormControl>
                    </GridItem>
                </Grid>
            </Box>

            {categories.length > 0 && (
                <Stack direction="column" gap={4} w="full">
                    <Heading
                        size="md"
                        color="#9d4edd"
                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                    >
                        Added Categories ({categories.length}/{MIN_CATEGORIES}):
                    </Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        {categories.map((cat, index) => (
                            <Box
                                key={index}
                                p={4}
                                border="1px solid #9d4edd"
                                borderRadius="md"
                                bg="#0f3460"
                            >
                                <Text
                                    fontWeight="bold"
                                    color="white"
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                >
                                    {cat.name}
                                </Text>
                                <Text
                                    color="#9d4edd"
                                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                                >
                                    {questionCount} questions
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                    <Button
                        onClick={onStartManualEntry}
                        bg="#9d4edd"
                        color="white"
                        _hover={{ bg: "#8b5cf6" }}
                        mt={4}
                        isDisabled={categories.length < MIN_CATEGORIES}
                        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
                        fontWeight="bold"
                        size="lg"
                        h="60px"
                        fontSize="xl"
                    >
                        {categories.length < MIN_CATEGORIES
                            ? `Add ${
                                  MIN_CATEGORIES - categories.length
                              } more categories`
                            : "Start Adding Questions"}
                    </Button>
                </Stack>
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
                Back to Start
            </Button>
        </Stack>
    );
};
