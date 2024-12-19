import { getConnection } from "./connectionMongoDB";

const getFormattedDate = () => {
    const now = new Date();
    const options = {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hourCycle: 'h23'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }, ,
        { value: hours }, ,
        { value: minutes }
    ] = formatter.formatToParts(now);

    return `${hours}:${minutes}-${month}/${day}/${year}`;
};

const addUser = async (user) => {
    try {
        const dataBase = await getConnection();
        console.log(user);
        const userData = {
            ...user,
            date: getFormattedDate()
        };

        const result = await dataBase.collection('users').insertOne(userData);
        console.log(result);
        console.log('registrer added');
        return result.insertedId;
    } catch (error) {
        console.error(error);
        throw new Error('Error: ' + error);
    }
};

const addTokenRequest = async (user) => {
    try {
        const dataBase = await getConnection();
        console.log(user);
        const userData = {
            ...user,
            date: getFormattedDate()
        };

        const result = await dataBase.collection('tokens').insertOne(userData);
        console.log(result);
        console.log('registrer added');

    } catch (error) {
        console.error(error);
        throw new Error('Error: ' + error);
    }
};

const getUser = async () => {
    try {
        const dataBase = await getConnection();
        const users = await dataBase.collection('users').find().toArray();
        console.log(users);
        return users;
    } catch (error) {
        console.error(error);
    }
}

export { addUser, getUser, addTokenRequest };