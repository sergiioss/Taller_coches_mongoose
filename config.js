module.exports = {
    port:process.env.PORT || 3000,
    db:process.env.MONGODB || "mongodb+srv://sergio:123@cluster0.upkpzm5.mongodb.net/?retryWrites=true&w=majority",
    SECRET_TOKEN: 'miclavedetokens'
}