import React from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { options, categoryMaps } from "./data";
import { QuizContext } from "../../context/context";

export default function SelectComponent({ onClose }) {
    const [isInvalid, setIsInvalid] = React.useState(false);
    const { questions, setQuestions, fetchData, amount, setAmount, setCategoryName, setCategory, setDifficulty, setHidden, } = React.useContext(QuizContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount === '') {
            setIsInvalid(true);
        } else {
            onClose();
            setHidden(true)
            if (questions.length !== 0) {
                setQuestions([]);
            }
            await fetchData();
        }
    };

    const Numbers = ['10', '15', '20', '25', '30', '40', '50']
    const level = ["easy", "medium", "hard"]

    return (
        <form action="post" onSubmit={handleSubmit}>
            <div className={`m-4 flex w-full flex-col justify-center items-center gap-4`}>
                <Select
                    isRequired
                    isInvalid={isInvalid}
                    label="Number of Questions"
                    className="max-w-xs max-h-fit"
                    placeholder="Select numbers..."
                    onChange={(e) => {
                        setAmount(e.target.value)
                        if (isInvalid) setIsInvalid(false);
                    }}
                >
                    {Numbers.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Category"
                    className="max-w-xs max-h-fit"
                    placeholder="Select Category"
                    onChange={(e) => {
                        setCategory(e.target.value)
                        setCategoryName(categoryMaps.get(e.target.value))
                    }}
                >
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Difficulty Level"
                    className="max-w-xs max-h-fit"
                    placeholder="Select Difficulty"
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    {level.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit" color="primary">
                    Get Quiz
                </Button>
            </div >
        </form>
    );
}