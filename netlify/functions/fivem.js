const {isAdmin}=require('./_a');
exports.handler=async e=>{
 if(!(await isAdmin(e)))return{statusCode:403,body:'forbidden'};
 const q=e.queryStringParameters||{};if(!['logs','bans','inventory'].includes(q.path))return{statusCode:400,body:'bad path'};
 const r=await fetch(process.env.FIVEM_API+'/'+q.path+'?id='+encodeURIComponent(q.id||''),{headers:{'x-secret':process.env.FIVEM_SECRET}});
 return{statusCode:200,body:await r.text()}};
