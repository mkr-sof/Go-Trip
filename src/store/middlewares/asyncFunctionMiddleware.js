const asyncFunctionMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
    if (typeof action === "function") {
        try {
            await action(dispatch, getState);
        } catch (error) {
            console.error("Error in async middleware:", error);
        }
    } else {
        return next(action);
    }
};

export default asyncFunctionMiddleware;
