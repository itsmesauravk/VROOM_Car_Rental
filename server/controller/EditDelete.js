// Importing required schemas
const Request = require('../schema/Requests'); // Importing schema for requests
const User = require('../schema/User'); // Importing schema for users
const Distributor = require('../schema/Distributor'); // Importing schema for distributors

// Handling the edit and delete request
const editDelete = async (req, res) => {
    try {
        // Extracting id from request parameters
        const { id } = req.params;
        // Extracting method from request body
        const { method } = req.body;

        // Checking if id or method is missing
        if (!id || !method) {
            return res.status(400).json({
                message: 'Please provide the id and method', // Returning error message
            });
        }

        // If method is 'delete'
        if (method === 'delete') {
            // Attempt to delete user with provided id
            const isUser = await User.findByIdAndDelete(id);
            // Deleting requests associated with sender user
            const deleteRequestSender = await Request.deleteMany({ senderUser: id });

            // If user is not found, attempt to delete distributor
            if (!isUser) {
                const isDist = await Distributor.findByIdAndDelete(id);
                // Deleting requests associated with receiver distributor
                const deleteRequestReceiver = await Request.deleteMany({ receiverDistributor: id });

                // If distributor or requests associated with it are not found, return failure response
                if (!isDist || !deleteRequestReceiver) {
                    return res.status(400).json({
                        success: false,
                        message: "No user or Distributor found",
                    });
                }
            }

            // If deletion is successful, send success response
            res.status(200).json({
                success: true,
                message: "Successfully deleted",
            });
        }
    } catch (error) {
        console.log(error); // Logging any errors to console
    }
};

// Exporting the editDelete function to be used elsewhere
module.exports = {
    editDelete,
};
