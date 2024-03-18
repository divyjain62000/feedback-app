exports.isValidEmailId = (emailId) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailId);
}

exports.isOnlyDigits = (data) => {
    const digitRegex = /^\d+$/;
    return digitRegex.test(data);
}