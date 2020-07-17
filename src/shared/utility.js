export const updatedObject = (oldObject, updatedObjectElements) => {
    return {
        ...oldObject,
        ...updatedObjectElements
    }

}

export const checkValidity = (value, rules) => {
    let valid = true;
    if (rules.required) {
        valid = value.trim() !== ''  && valid
    }
    if (rules.maxLength) {
        valid = value.length <= rules.maxLength  && valid
    }

    if (rules.minLength) {
        valid = value.length >= rules.minLength  && valid
    }

    return valid;

}