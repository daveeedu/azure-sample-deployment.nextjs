import { getUserById, deleteUserById } from "@/data/users";

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET': 
        const user = getUserById(id);
        if (!user) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        res.status(200).json(user);
        break;
        case 'DELETE':
            deleteUserById(id);
            res.status(204).end();
            break;
        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};