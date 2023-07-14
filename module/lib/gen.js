module.exports = async(type,name,id,text,icon)=>{
  const fetch = require("node-fetch");
  const config = require("../../config.json");
  return await fetch(`http://${config.server}/?type=${type}&name=${name}&id=${id}&content=${text}&icon=${icon}`)
    .then(res=>res.blob())
    .catch(()=>{});
}