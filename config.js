module.exports = {
    port:process.env.PORT || 3000,
    db:process.env.MONGODB || "mongodb+srv://taller:123@taller.xccwcj8.mongodb.net/?retryWrites=true&w=majority",
    SECRET_TOKEN: 'miclavedetokens'
}