import { model, Schema, models } from "mongoose"

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    hashedPassword: {type: String},
    images: {type: String},
    wishlist: [{type: Object}], 
    orders: [{type: Object}], 
}, {
    timestamps: true,
});

export const User = models.User || model('User', UserSchema);