import mongoose,{Schema} from 'mongoose';
import uniqueVal from 'mongoose-unique-validator';

const date = new Date();

const rolValidate = {
    values: ['SUPER_ADMIN','USER'],
    message: '{VALUE} no es un tipo válido'
}

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, "Se necesita el usuario"],
        unique: true
    },
    name:{
        type: String,
        required: [true, "Se necesita el nombre"]
    },
    password:{
        type: String,
        required: [true, "Se necesita el password"]
    },
    rol:{
        type: String,
        default: 'USER',
        required: [true, "Se necesita el rol"],
        enum: rolValidate
    },
    last_entry:{
        type: Date,
        required: [true, "Se necesita ingresar la ultima entrada"],
        defaul: date
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

UserSchema.plugin(uniqueVal,{
    message: '{PATH} ya se encuentra registrado'
});

export default mongoose.model('Users', UserSchema);