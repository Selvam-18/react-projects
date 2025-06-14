import { useState } from "react";

export function useInput(defalutValue, validationFn) {
    const [inputValue, setInputValue] = useState(defalutValue);
    const [editedInput, setEditedInput] = useState(false);

    const validInput = validationFn(inputValue)

    function handleInput(event) {
        setInputValue(event.target.value);
        setEditedInput(false)
    }

    function handleBlur() {
        setEditedInput(true)
    }

    function handleReset() {
        setEditedInput(false)
        setInputValue('')
    }

    return {
        inputValue,
        handleInput,
        handleBlur,
        hasError: editedInput && !validInput,
        handleReset
    }
}