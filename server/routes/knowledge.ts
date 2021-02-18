// import npm dependencies
import { Router, Request, Response } from 'express';
// import Schemas or Models
import Knowledges from '../schema/knowledgeSchema';
// import middlewares
import {TokenAuth} from '../middlewares/tokenAuth'

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

routerKnow.post('/',TokenAuth, (req: Request, res: Response) => {
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

routerKnow.put('/:id',TokenAuth,(req:Request,res:Response)=>{
    const date = new Date();
    const id = req.params.id;
    const body = req.body;
    Knowledges.findByIdAndUpdate(id,{
        name: body.name,
        type: body.type,
        description: body.description,
        id_project: body.id_project,
        image: body.image,
        updated_at: date
    })
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

routerKnow.delete('/:id',TokenAuth,(req:Request,res:Response)=>{
    const id = req.params.id;
    Knowledges.findByIdAndRemove(id)
    .exec((err)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Hubo un error en la eliminación'
                }
            })
        }
    })
    return res.json({
        ok: true,
        data: {
            message: 'Eliminado Correctamente'
        }
    })
});

routerKnow.get('/front', (req: Request, res: Response) => {
    Knowledges.find({
        type: "FRONTEND"
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
        type: "BACKEND"
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