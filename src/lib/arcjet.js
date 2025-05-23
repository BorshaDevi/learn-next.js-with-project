import arcjet, { detectBot, protectSignup, shield, slidingWindow, validateEmail } from '@arcjet/next';

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


export const ajLogin=arcjet({
    key:process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules:[
        validateEmail({
            mode:'LIVE',
            deny:['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS']
        }),
        shield({
            mode:'LIVE',
        }),
        detectBot({
            mode:'LIVE',
            allow:[],
        }),
        slidingWindow({
            mode:'LIVE',
            interval:'1m',
            max:2,
        })

    ]
})

export default aj;