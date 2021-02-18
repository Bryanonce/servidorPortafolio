// import npm dependencies
import { Router, Request, Response } from 'express';
// import Schemas or Models
import Knowledges from '../schema/knowledgeSchema';

export const routerKnow = Router();

routerKnow.get('/', (req: Request, res: Response) => {
    Knowledges.find({})
        .exec((err, knowledgeDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {}
                })
            }
            return res.json({
                ok: true,
                data: knowledgeDB
            });
        })
});

routerKnow.post('/', (req: Request, res: Response) => {
    const date = Date();
    const body = req.body;
    const knowledge = new Knowledges({
        name: body.name,
        type: body.type,
        description: body.description,
        id_project: body.id_project,
        image: body.image,
        created_at: date,
        updated_at: date
    });
    knowledge.save((err, knowledgesDB) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                data: {}
            })
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        })
    })
})

routerKnow.get('/front', (req: Request, res: Response) => {
    Knowledges.find({
        type: "frontend"
    })
        .exec((err, knowledgesDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {}
                })
            }
            return res.json({
                ok: true,
                data: knowledgesDB
            });
        })
});

routerKnow.get('/back', (req: Request, res: Response) => {
    Knowledges.find({
        type: "backend"
    })
        .exec((err, knowledgesDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {}
                })
            }
            return res.json({
                ok: true,
                data: knowledgesDB
            });
        })
});

routerKnow.get('/search/:id', (req: Request, res: Response) => {
    let id = req.params.id
    Knowledges
    .findById(id)
    .populate('id_project','title description image url')
    .exec((err,knowledgesDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            })
        }
        return res.json({
            ok: true,
            data: knowledgesDB
        })
    })
});