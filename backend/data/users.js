import bcrypt from "bcryptjs"

const users = [
    {
        name : 'Admin User',
        email : 'admin@example.com',
        password : bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name : 'User One',
        email : 'one@example.com',
        password : bcrypt.hashSync('123456', 10),
    },
    {
        name : 'User Two',
        email : 'two@example.com',
        password : bcrypt.hashSync('123456', 10),
    }
]

export default users