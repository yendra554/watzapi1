const express = require("express");
const router = express.Router();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

const accountSid = 'ACb0931877bc3943d0ef22294eea2af31c';
const authToken = 'd1f4a809ffce0f7bee50dd940465dfb3'
const client = require('twilio')(accountSid, authToken);

/**************************************************CALL LIST*****************************************************/

router.get('/list/', async (req, res) => {

    try {
        const call = await client.calls.list({ limit: 25 })
            .then(calls => {
                return calls
            });

        res.status(200).json({
            status: true,
            data: call
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            message: 'Something went wrong.'
        })
    }

})


/**************************************************RECORDING MEDIA*****************************************************/


router.get('/GET_RECORDING_BY_CALLID/', async (req, res) => {
        const callID = req.query.callSid;
    try {
        const record = await client.recordings
        .list({callSid: callID, limit: 20})
        .then(recordings => {
            return recordings
        });
        res.status(200).json({
            status: true,
            data: record
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            message: 'Something went wrong.'
        })
    }

})

router.get('/recordById/', async (req, res) => {

    try {
        const record = await client.recordings('RE175be03145cb316fabb832f156b5e466')
              .fetch()
              .then(recording => {
                  return recording
              });

        res.status(200).json({
            status: true,
            data: record
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            message: 'Something went wrong.'
        })
    }

})

router.get('/sendOTP/', async (req, res) => {

    try {

        client.verify.services('VAeefe04474f8a0c4be41585827708e37b')
        .verifications
        .create({
            to: `+${req.query.phonenumber}`, channel: 'sms'
        })
        .then(verification => {
            res.status(200).json({
                status: verification,
            })
        }).catch(data =>{
            res.status(500).send({
                status:false,
                data
            })
        })
    } catch (error) {
        res.status(200).json({
            status: false,
            message: 'Something went wrong.'
        })
    }

})


router.get('/verifyPhone/', (req, res) => {
    if (req.query.phonenumber && (req.query.code).length === 5) {
        client
            .verify
            .services('VAeefe04474f8a0c4be41585827708e37b')
            .verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        status:true,
                        message: "User has been Verified!",
                        data
                    })
                }
            }).catch(data =>{
                res.status(500).send({
                    status:false,
                    message: "User Verified!",
                    data
                })
            })
    } else {
       if((req.query.code).length != 5){
            res.status(400).send({
            message: "Entered OTP is wrong please enter correct OTP",
            code: req.query.code
        })
       }
    }
})

module.exports = router;