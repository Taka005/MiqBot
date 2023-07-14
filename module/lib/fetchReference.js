module.exports = async(message)=>{
  try{
    return await message.fetchReference();
  }catch{
    return null;
  }
}