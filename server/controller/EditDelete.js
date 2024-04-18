const Request = require('../schema/Requests')
const User = require('../schema/User')
const Distributor = require('../schema/Distributor')



//handling the edit and delete request
const editDelete = async(req,res)=>{
    try {
        const {id} = req.params
        const {methode} = req.body
        if(!id || !methode){
            return res.status(400).json({
                message:'please provide the id and methode'
            })
        }
        if(methode == 'delete'){
            const isUser = await User.findByIdAndDelete(id)
            const dltRequest = await Request.deleteMany({senderUser:id})
            if(!isUser){
                const isDist = await Distributor.findByIdAndDelete(id)
                const dltRequest = await Request.deleteMany({receiverDistributor:id})
                if(!isDist || !dltRequest){
                    return res.status(400).json({success:false, message:"No user or Distributor found"})
                }
        }
        res.status(200).json({success:true, message:"Successfully deleted"})
        }
        

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    editDelete
}