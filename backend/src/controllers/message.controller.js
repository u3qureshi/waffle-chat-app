import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        // Fetch all users except the current user
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        const filtereUsers = await User.find({ _id: { $ne: loggedInUserId } }) // Exclude the logged-in user
            .select('-password -__v') // Exclude password and version fields
            .sort({ createdAt: -1 }) // Sort users by creation date in descending order
            // .limit(10); // Limit the number of users returned to 10
        res.status(200).json(filtereUsers); // Send the filtered users as a response
    } catch (error) {
        console.error('Error fetching users for sidebar:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const {rid:recipientChatterId} = req.params; // Get the user ID from the request parameters for the recipient of the chat
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object

        const messages = await Message.find({
            $or:[
                {senderId: loggedInUserId, receiverId: recipientChatterId}, // Messages sent by the logged-in user to the recipient
                {senderId: recipientChatterId, receiverId: loggedInUserId} // Messages sent by the recipient to the logged-in user
            ]
        })

        res.status(200).json(messages); // Send the messages as a response
    } catch (error) {
        console.error('Error fetching messages by user ID:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body; // Get the message text and image from the request body
        const {rid:recipientChatterId} = req.params; // Get the recipient's user ID from the request parameters
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request object
        
        let imageurl;
        if(image) {
            /// Upload the image to cloudinary and get the URL
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
            
            const newMessage = new Message({
                text,
                image: imageurl, // Set the image URL in the message
                senderId: loggedInUserId, // Set the sender's user ID
                receiverId: recipientChatterId // Set the recipient's user ID
            });

            await newMessage.save(); // Save the new message to the database
            // todo: send the message to the recipient via socket.io via real time functionality
        }  
    
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}