// import npm dependences
import { Router, Request, Response } from 'express';
// import Schemas or Models
import Projects from '../schema/projectSchema';

export const routerPrj = Router();

routerPrj.get('/', (req: Request, res: Response) => {
    Projects.find({})
        .exec((err, projectsDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {}
                })
            }
            return res.json({
                ok: true,
                data: projectsDB
            });
        })
});

routerPrj.post('/', (req: Request, res: Response) => {
    const date = Date();
    const body = req.body;
    const project = new Projects({
        title: body.title,
        description: body.description,
        image: body.image,
        url: body.url,
        id_knowledge: body.id_knowledge,
        created_at: date,
        updated_at: date
    });
    project.save((err, projectsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            })
        }
        return res.json({
            ok: true,
            data: projectsDB
        })
    })
})

/*Buscar todas las tecnologias utilizadas en el proyecto con el ID:*/
routerPrj.get('/search/:id', (req: Request, res: Response) => {
    let id = req.params.id
    Projects
    .findById(id)
    .populate('id_knowledge','name type description image')
    .exec((err,projectsDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {}
            })
        }
        return res.json({
            ok: true,
            data: projectsDB
        })
    })
});

