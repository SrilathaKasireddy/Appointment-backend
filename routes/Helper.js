import { client } from "../app.js";
import { ObjectId } from "mongodb";


export async function getAllHomes(request) {
    return await client.db("users")
        .collection("users")
        .find(request.query)
}


export async function getUserByName(UserName) {
    //db.users.findOne({username: username });
    return await client.db("users").collection("users").findOne({ UserName: UserName });
}
export async function getUserById(id) {
    //db.users.findOne({_id: id });
    return await client.db("users").collection("users").findOne({ _id: ObjectId(id) });
}

export async function createUser(data) {
    //db.users.insertOne(data);
    return await client.db("users").collection("users").insertOne(data);
}

export async function getUserByEmail(Email) {
    //db.users.findOne({username: username });
    return await client.db("users").collection("users").findOne({ Email: Email });
}



