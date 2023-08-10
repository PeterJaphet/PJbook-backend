import mongoose, {Schema} from 'mongoose';
import { userLogin } from '../types/auth';

const userSchema = new Schema <userLogin>({
    userId:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    dob:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    address:{
        type:String,
    }

}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;