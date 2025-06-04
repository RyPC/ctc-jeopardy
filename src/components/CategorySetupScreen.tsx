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
        <Stack direction="column" align="center" gap={8}>
            <Heading as="h2" size="xl" color="#5557AF">
                Set Up Categories
            </Heading>

            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={8}
                w="full"
                maxW="800px"
            >
                <GridItem>
                    <Stack direction="column" gap={4}>
                        <FormControl>
                            <FormLabel>Category Name</FormLabel>
                            <Input
                                value={currentCategory}
                                onChange={(e) =>
                                    onCategoryChange(e.target.value)
                                }
                                placeholder="Enter category name"
                            />
                        </FormControl>

                        <Button
                            onClick={onAddCategory}
                            bg="#6231D8"
                            color="white"
                            _hover={{ bg: "#5557AF" }}
                            isDisabled={!currentCategory}
                        >
                            Add Category
                        </Button>
                    </Stack>
                </GridItem>

                <GridItem>
                    <FormControl>
                        <FormLabel>Questions per Category</FormLabel>
                        <NumberInput
                            min={1}
                            max={10}
                            value={questionCount}
                            onChange={(_, value) =>
                                onQuestionCountChange(value)
                            }
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Text fontSize="sm" color="gray.500" mt={2}>
                            This will apply to all categories
                        </Text>
                    </FormControl>
                </GridItem>
            </Grid>

            {categories.length > 0 && (
                <Stack direction="column" gap={4} w="full" maxW="800px">
                    <Heading size="md" color="#5557AF">
                        Added Categories ({categories.length}/{MIN_CATEGORIES}):
                    </Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        {categories.map((cat, index) => (
                            <Box
                                key={index}
                                p={4}
                                border="1px solid"
                                borderColor="#B0A0E2"
                                borderRadius="md"
                                bg="white"
                            >
                                <Text fontWeight="bold">{cat.name}</Text>
                                <Text color="#5557AF">
                                    {questionCount} questions
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                    <Button
                        onClick={onStartManualEntry}
                        bg="#6231D8"
                        color="white"
                        _hover={{ bg: "#5557AF" }}
                        mt={4}
                        isDisabled={categories.length < MIN_CATEGORIES}
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
                borderColor="#6231D8"
                color="#6231D8"
                _hover={{ bg: "#B0A0E2" }}
            >
                Back to Start
            </Button>
        </Stack>
    );
};
