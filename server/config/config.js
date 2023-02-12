const mongoose = require('mongoose')




const connectdDb = async()=>{
   try{
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://root:root@cluster0.xyqucy8.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser : true
    }).then(()=>{
        console.log('Db connected');
    })
   }catch(err){
    console.log(err);
   }
}
connectdDb();

module.exports = connectdDb;