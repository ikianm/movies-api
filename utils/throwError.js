const throwError = (statusCode, message) => {
    const error = new Error(message);
    error.stattsCode = statusCode;
    throw error;
};

export { throwError };