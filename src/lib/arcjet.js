import arcjet, { protectSignup } from '@arcjet/next';

const aj=arcjet({
    key:process.env.ARCJET_KEY,
    rules:[
        protectSignup({
            email:{
                mode:'LIVE',
                block:['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS']
            },
            bots:{
                mode:'LIVE',
                allow:[],
            },
            rateLimit:{
                mode:'LIVE',
                interval:'10m',
                max:40,
            }

        })
    ]
})
export default aj;