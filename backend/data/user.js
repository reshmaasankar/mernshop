import bcrypt from 'bcryptjs';
const users = [
    {
        name:'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name:'Reshma',
        email: 'reshma@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name:'Alok',
        email: 'alok@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
];

export default users;