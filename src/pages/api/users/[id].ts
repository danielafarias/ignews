import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
   console.log(request.query)
    const users = [
        { id: 1, name: 'Daniela' },
        { id: 2, name: 'Paola'},
        { id: 3, name: 'Giulia'}
    ];

    return response.json(users);
}