import mongoose,{Schema} from 'mongoose';

const date = new Date();

const typeValidate = {
    values: ['FRONTEND','BACKEND'],
    message: '{VALUE} no es un tipo válido'
}

const knowledgeSchema = new Schema({
    id_project:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        default: []
    }],
    name:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    type:{
        type: String,
        enum: typeValidate,
        required: [true, "Se necesita el stack"]
    },
    description:{
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    image:{
        type: String,
        required: [true, "Senecesita la Imagen"]
    },
    created_at:{
        type: Date,
        required: [true, "Se necesita la fecha de creación"],
        default: date
    },
    updated_at:{
        type: Date,
        required: [true, "Se necesita la fecha de actualización"],
        default: date
    }
})

export default mongoose.model('Knowledges',knowledgeSchema);