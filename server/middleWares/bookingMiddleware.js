const authorizeUser = (req, res, next) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = req.params.userId
    if (userId !== user.id) {
        return res.status(401).json({
            message: "Unauthorized: Please log in or provide a valid token."
        })
    }

    req.user = user;
    next();
}

export default authorizeUser