import mongoose from "mongoose"

const refreshSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },

    tokenHash : {
        type : String,
        required : true,
        index : true

    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    expiresAt : {
        type : Date,
        required : true
    },
    revokedAt : {
        type : Date,
        default : null
    }
})

const refreshModel = mongoose.model("RefreshSession",refreshSchema)

export default refreshModel