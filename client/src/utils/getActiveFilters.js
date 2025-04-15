export const getActiveFilters = () => {
    const checkedInputs = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );
    return Array.from(checkedInputs).map((input) => input.value);
};
