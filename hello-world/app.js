// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    console.log(process.env.SAMPLE_KEY)
    console.log(genarateTweetText(90))

    return 0
};

// ツイートテキスト生成
// 例　▓▓░░░░░░░░░░░░░ 13% 
// 15個のブロック ブロック数は四捨五入
function genarateTweetText(passedTimeRatio) {

    passedTimeRatioBlockAmount = Math.round(passedTimeRatio / (100/15))
    console.log("passedTimeRatioBlockAmount: " + passedTimeRatioBlockAmount)

    text = ''

    for (i = 0; i < passedTimeRatioBlockAmount; i++) {
        text += '▓'
    }

    for (i = 0; i < 15 - passedTimeRatioBlockAmount; i++) {
        text += '░'
    }

    text += ` ${passedTimeRatio}%`

    return text
}