module.exports=async function handler(req,res){console.log('Mercado Pago webhook:',req.method,req.query,req.body);return res.status(200).json({received:true});}
