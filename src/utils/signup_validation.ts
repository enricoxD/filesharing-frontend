interface PasswordValidation {
    minChars: boolean,
    lowercase: boolean,
    uppercase: boolean,
    digit: boolean,
    noSpace: boolean
}

export default function checkPassword(password: string): true | PasswordValidation {
    const charArray = password.split('');
    const minChars = password.length >= 8;
    const lowercase = charArray.some((it) => it.toLowerCase() == it)
    const uppercase = charArray.some((it) => it.toUpperCase() == it)
    const digit = charArray.some((it) => it >= '0' && it <= '9')
    const noSpace = !charArray.some((it) => it === ' ')

    if (minChars && lowercase && uppercase && digit && noSpace)
        return true

    return {
        minChars: minChars,
        lowercase: lowercase,
        uppercase: uppercase,
        digit: digit,
        noSpace: noSpace,
    }
}