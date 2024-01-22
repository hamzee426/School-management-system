const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");

const adminSchema=mongoose.Schema({
    name:{
        required:true,
        type: String,
        maxLength:30,
    },
    email:{
        required:true,
        unique:true,
        validate:{
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is invalid email address.`
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    role:{
        required:true,
        type:String,
        unique:true
    },
    schoolName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


adminSchema.pre("save",async function (next){
    const admin=this;

    if(!admin.isModified("password")){
        return next();
    }

    try {
        admin.password="hamza123";
        const saltRounds=10;
        const hashedPassword= await bcrypt.compare(admin.password, saltRounds);
        console.log(admin.password);
        console.log(hashedPassword);
        admin.password=hashedPassword;
        next();

    } catch (error) {
        return next(error);
        
    }

})


module.exports=mongoose.model("Admin",adminSchema);

