// import npm dependences
import { Router, Request, Response } from 'express';
// import Schemas or Models
import Projects from '../schema/projectSchema';
// import middlewares
import {TokenAuth} from '../middlewares/tokenAuth'

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

routerPrj.post('/',TokenAuth, (req: Request, res: Response) => {
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

routerPrj.put('/:id',TokenAuth,(req:Request,res:Response)=>{
    const date = new Date();
    const id = req.params.id;
    const body = req.body;
    Projects.findByIdAndUpdate(id,{
        title: body.title,
        description: body.description,
        image: body.image,
        url: body.url,
        id_knowledge: body.id_knowledge,
        updated_at: date
    })
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

routerPrj.delete('/:id',TokenAuth,(req:Request,res:Response)=>{
    const id = req.params.id;
    Projects.findByIdAndRemove(id)
    .exec((err)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    messaje: 'Error al eliminar el registro'
                }
            })
        }
        return res.json({
            ok: true,
            data: {
                message: 'Registro eliminado correctamente'
            }
        })
    })
});

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

