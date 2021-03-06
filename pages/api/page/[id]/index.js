import {deletePage, getPage, patchPage} from "../../../../server/queries/page.queries";

const fs = require('fs');
const path = require('path');

export default async (req, res, next) => {

    switch (req.method) {
        case 'PATCH':
            try{
                // GET ID FROM URL
                const id = req.query.id;

                // GET BODY WITH DATA
                const body = req.body;

                // GET PAGE WITH ID
                const page = await getPage(id);

                // UPDATE PAGE WITH ID
                await patchPage(id,body);

                // MESSAGE
                const string = `mise à jour de la page : ${page.title}`

                res.json({
                    data:body,
                    success:string
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        case 'GET':
            try{
                // GET ID FROM URL
                const id = req.query.id;

                // GET PAGE WITH ID
                const page = await getPage(id);

                // RESPONSE FROM API
                res.json({
                    data:page
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;

        case 'DELETE':
            try {
                // GET ID FROM URL
                const id = req.query.id;

                // GET PAGE WITH ID
                const page = await getPage(id);

                // DELETE PAGE
                await deletePage(id);

                // MESSAGE
                const string = `Supression de la page : ${page.slug}`;

                // RESPONSE FROM API
                res.json({
                    success: string,
                })

            } catch (e) {

                // API RETURNS ERROR
                res.json({error: e.message})

                // SERVER RETURNS ERROR
                console.error(e)

            }
            break;
    }

}