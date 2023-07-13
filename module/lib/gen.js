module.exports = async(type,name,id,text,icon)=>{
  const fetch = require("node-fetch");
  return await fetch(`http://localhost:3000/?type=${type}&name=${name}&id=${id}&content=${text}&icon=${icon}`)
    .then(res=>res.blob());
}