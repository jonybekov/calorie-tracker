
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

const SALT = 10;

module.exports = (userRepository) => ({
    async getUserByToken(token) {
        return userRepository.findUserByToken(token)
    },

    async checkAuth(login, password) {
        const user = await userRepository.findUserByLogin(login);
        
        console.log(user);
        if(!user) {
            throw Error(`User not found by ${login}`)
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            throw Error('Username or password is wrong')
        }

        const accessToken = uuidv4();
        const updatedUser = await userRepository.updateUserTokenById(user.id, accessToken);
        delete updatedUser.password;
        return updatedUser;
    },

    async registerUser(firstName, lastName, avatar, login, password) {
        const passwordHash = await bcrypt.hash(password, SALT);
        const token = uuidv4();
        const newUser = await userRepository.saveUser(firstName, lastName, avatar, login, passwordHash, token)
        delete newUser.password;
        return newUser;
    }
})