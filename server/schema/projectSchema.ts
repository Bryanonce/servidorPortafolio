import mongoose,{Schema} from 'mongoose';

const date = new Date();

const ProjectSchema = new Schema({
    id_knowledge:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Knowledges',
        default: []
    }],
    title:{
        type: String,
        required: [true, "Se necesita el título del proyecto"]
    },
    description:{
        type: String,
        required: [true, "Se encesita la descripción"]
    },
    image:{
        type: String,
        required: [true, "Se necesita la imagen del projecto"]
    },
    url:{
        type: String,
        required: [true, "Se necesita la URL del proyecto"]
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
});

export default mongoose.model('Projects',ProjectSchema);