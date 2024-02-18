import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUserToken {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

userTokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 30 * 86400 });

const UserTokenModel = mongoose.model("UserToken", userTokenSchema);

export default UserTokenModel;
