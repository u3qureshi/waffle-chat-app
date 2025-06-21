import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            trim: true
        },
    },
    {timestamps: true} // Automatically adds createdAt and updatedAt fields
);

const Message = mongoose.model("Message", messageSchema);

export default Message;