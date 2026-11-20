const admin=require('firebase-admin');
if(!admin.apps.length)admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))});
const db=admin.firestore();
async function isAdmin(e){try{const u=await admin.auth().verifyIdToken((e.headers.authorization||'').slice(7));return (await db.doc('admins/'+u.uid).get()).exists}catch{return false}}
module.exports={admin,db,isAdmin};
