import { getUsers, addUser } from "@/data/users";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET' :
            const users = getUsers();
            res.status(200).json(users);
            break;
        case 'POST' :
            const { name, email } = req.body;
            if (!name || !email) {
                res.status(400).json({ error: 'Name and Email are required' });
                return;
            }   
            const newUser = addUser({ name, email });
            res.status(201).json(newUser);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}