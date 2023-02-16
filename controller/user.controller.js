
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const checkAuth = require("../middileware/authentication");
const axios = require('axios').default;
const user = require("../modals/user.modal");
const https = require("https");
const crypto = require("crypto");
const accessKey = 'V52C2BXXC3KWR0MGHK2C';
const secretKey = 'rxerxO2ZTMP8VITcpiCQdwdu1fk6aps0l5tB4JAOuBw1H0MM8wHlYGSbusVKmuKa';
const log = false;

const Coinpayments = require('coinpayments');


 CoinpaymentsCredentials = {
  key: '78d787154436bb6481af1c1d65bddf81c3e135f561212c5cba74cf210868dd25',
  secret: '490bd23DfBf26787dBf17e225401f99dfaB8eA48d0C5cCbC41072Be6C6cef1C5'
}
const client = new Coinpayments(CoinpaymentsCredentials)




exports.getSignature = async (req, res, next) => {
    // try {
    //     const Task = await user.find({});
    //     res.send(Task);
    // } catch (err) {
    //     throw new Error(err);
    // }



          
        async function makeRequest(method, urlPath, body = null) {
            console.log("ddadsa")
            try {
              httpMethod = 'GET';
              httpBaseURL = "api.tazapay.com";
              httpURLPathforSign = '/v1/user/rajeev.verma@marketwicks.com'; // use only path without params.
              salt = generateRandomString(6);
              timestamp = Math.round(new Date().getTime() / 1000);
              signature = sign(
                httpMethod,
                httpURLPathforSign,
                salt,
                timestamp,
                accessKey,
                secretKey
              );
          
              const options = {
                hostname: httpBaseURL,
                port: 443,
                path: urlPath,
                method: httpMethod,
                headers: {
                  "Content-Type": "application/json",
                  salt,
                  timestamp,
                  signature,
                  accessKey,
                },
              };
          
              return await httpRequest(options, body, log);
            } catch (error) {
              console.error("Error generating request options");
              throw error;
            }
          }
    function sign() {
      let salt = generateRandomString(6);
              let timestamp = Math.round(new Date().getTime() / 1000);
      console.log("fdsfdsfsd",salt)
      console.log("fdsfdsfsd",timestamp)
      console.log("fdsfdsfsd",accessKey)
      // console.log("fdsfdsfsd",urlPath)
      // console.log("fdsfdsfsd",method)
      console.log("fdsfdsfsd",req.query.urlpath)
      console.log("fdsfdsfsd",req.query.httpmethod)
        try {
          let toSign =
          req.query.httpmethod?.toUpperCase() + req.query.urlpath + salt + timestamp + accessKey + secretKey;
          log && console.log(`toSign: ${toSign}`);
      
          let hash = crypto.createHmac("sha256", secretKey);
          hash.update(toSign);
          const signature = Buffer.from(hash.digest("hex")).toString("base64");
          log && console.log(`signature: ${signature}`);
          console.log(`signature: ${signature}`);
          res.status(200).json({
            status: true,
            banners:signature,
            salt:salt,
            timestamp:timestamp,
            accessKey:accessKey
         })
          return signature;
        } catch (error) {
          console.error("Error generating signature");
          throw error;
        }
       
      }
      
      function generateRandomString(size) {
        try {
          return crypto.randomBytes(size).toString("hex");
        } catch (error) {
          console.error("Error generating salt");
          throw error;
        }
      }
      
      async function httpRequest(options, body) {
        return new Promise((resolve, reject) => {
          try {
            let bodyString = "";
            if (body) {
              bodyString = JSON.stringify(body);
              bodyString = bodyString == "{}" ? "" : bodyString;
            }
      
            log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
            const req = https.request(options, (res) => {
              let response = {
                statusCode: res.statusCode,
                headers: res.headers,
                body: "",
              };
      
              res.on("data", (data) => {
                response.body += data;
              });
      
              res.on("end", () => {
                response.body = response.body ? JSON.parse(response.body) : {};
                log &&
                  console.log(`httpRequest response: ${JSON.stringify(response)}`);
      
                if (response.statusCode !== 200) {
                  return reject(response);
                }
      
                return resolve(response);
              });
            });
      
            req.on("error", (error) => {
              return reject(error);
            });
      
            req.write(bodyString);
            req.end();
          } catch (err) {
            return reject(err);
          }
        });
      }
      sign();
  

}

// exports.signup = async (req, res) => {
   
//     try {
        
//         const users = await new user(req.body);
   
//         const finduser = await user.find({ key: req.body.key });
    
//         if (finduser.length >= 1) {

//             return res.status(500).json({
//                 status: false,
//                 message: "user already exists please use other email address !"
//             })

//         }

//         const newuser = await users.save();
//         if(newuser._id){
//             res.json({
//                 status: true,
//                 message: "Signup Successfully !"
//             });
//         }else{
//             res.status(400).json({
//                 message: "All fields are required !"
//             });
//         }

//     } catch (error) {
//         res.status(400).json({
//             message: "Something went wrong."
//         });
//     }


// }

exports.cryptoPay = async (req , res) => {

  CoinpaymentsCreateTransactionOpts = {
    cmd:'create_transaction',
    currency1: 'USD',
    currency2: req.query.coin,
    amount: req.query.amount,
    buyer_email: req.query.email,
    buyer_name:req.query.name,
    success_url:req.query.success_url,
    cancel_url:req.query.cancel_url
  }
  client.createTransaction(CoinpaymentsCreateTransactionOpts).then(trans => {
   
    res.status(200).json(trans)

        }).catch(err =>{
    res.status(500).json(err)
        })
}



      exports.getTransaction = async (req , res) => {
        CoinpaymentsGetTxOpts = {
          txid: req?.query?.txnid
          // full?: number
        }
        client.getTx(CoinpaymentsGetTxOpts).then(daa =>{
          res.status(200).json(daa)
        }).catch(err =>{
          res.status(500).json(err)
              })
        
      }


exports.createInvoice = async (req, res, next) => {

// console.log(req.query)

    try {
        let params = {
            "product": {
              "description": "RAMP payment",
              "name": ""+req.query.name
            },
            "invoice": {
              "amount": req.query.amount,
              "currencyFrom": "EUR"
            },
            "settlement": {
              "currency": "BTC"
            },
            "notifyEmail": ""+req.query.email,
            "notifyUrl": "https://dashboard.magnimarkets.com/#/auth/signup",
            "returnUrl": "https://dashboard.magnimarkets.com/#/auth/signup",
            "reference": "fgfgfgffgfgf"
          }
          

        axios.post('https://confirmo.net/api/v3/invoices',params,{
            headers: {
              Authorization:'Bearer WMbYvjOn60PBrk7w5UjFRWC0HmkQfLWY7Xt3zMmtItaKRrY9sayQ0sJLfoBTTR4T' //the token is a variable which holds the token
            }
           })
        .then(function (response) {
          // handle success
          // console.log(response.data);
          res.status(200).json(response.data)
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
          res.status(500).json(error)
        })
    } catch (err) {
        throw new Error(err);
    }
}

exports.getInvoice = async (req, res, next) => {


    try {
        axios.get('https://confirmo.net/api/v3/invoices/'+req.query.id,{
            headers: {
              Authorization:'Bearer WMbYvjOn60PBrk7w5UjFRWC0HmkQfLWY7Xt3zMmtItaKRrY9sayQ0sJLfoBTTR4T' //the token is a variable which holds the token
            }
           })
        .then(function (response) {
          // handle success
        //   console.log(response.data);
        res.status(200).json(response.data)
        })
        .catch(function (error) {
          // handle error
        //   console.log(error);
        })
    } catch (err) {
        throw new Error(err);
    }
}


exports.signup = async (req, res) => {
   
    try {
        
        const users = await new user(req.body);
   
        const finduser = await user.find({ name: req.body.name });
    
        if (finduser.length >= 1) {

            return res.status(500).json({
                status: false,
                message: "email already exists please use other email address !"
            })

        }

        const pass = await bcrypt.hash(req.body.password, saltRounds);

        users.password = pass;

        const newuser = await users.save();
        if(newuser._id){
            res.json({
                status: true,
                message: "Signup Successfully !"
            });
        }else{
            res.status(400).json({
                message: "All fields are required !"
            });
        }

    } catch (error) {
        res.status(400).json({
            message: "Something went wrong."
        });
    }


}

exports.login = (req, res) => {

    user.findOne({ email: req.body.email })
        .then(users => {
            if (!users.email) {
                return res.status(404).json({
                    message: "email address doesn't exist"
                })
            }

            let userData = users

            bcrypt.compare(req.body.password, users.password, (err, result) => {

                if (!result) {
                    return res.status(500).json({
                        message: "unAthorized User",
                        result
                    })
                }

                if (result) {

                    const token = jwt.sign({ userData }, 'secret', { expiresIn: "7d" });

                    return res.status(200).json({
                        status: true,
                        message: "Authentication Successful",
                        token: token,
                        userData
                    })
                }

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}


// exports.login = (req, res) => {

//     user.findOne({ email: req.body.email })
//         .then(users => {
//             if (!users.email) {
//                 return res.status(404).json({
//                     message: "email address doesn't exist"
//                 })
//             }

//             let userData = users

//             bcrypt.compare(req.body.password, users.password, (err, result) => {

//                 if (!result) {
//                     return res.status(500).json({
//                         message: "unAthorized User",
//                         result
//                     })
//                 }

//                 if (result) {

//                     const token = jwt.sign({ userData }, 'secret', { expiresIn: "7d" });

//                     return res.status(200).json({
//                         status: true,
//                         message: "Authentication Successful",
//                         token: token,
//                         userData
//                     })
//                 }

//             });

//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });

// }