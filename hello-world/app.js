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
exports.lambdaHandler = (event, context) => {

    // tweet(
    //     generateTweetText(
    //         calcPassedTimeRatio()
    //     )
    // );

};

/**
 * 現在時刻、当月がどれだけの割合経過しているかを計算する
 * @return float - 経過した割合(0~100%)
 */
// function calcPassedTimeRatio() {

//     return passedTimeRatio;
// }

/**
 * 実際にツイートするテキストを生成する
 * 例えばこんなツイート--------
 * 1月
 * ▓▓░░░░░░░░░░░░░ 13%
 * -------------------------
 * @param passedTimeRatio - 経過した割合(0~100％)
 */
function generateTweetText(passedTimeRatio) {

    tweetText = `${generateProgressBar(passedTimeRatio)} ${passedTimeRatio}%`;

    return tweetText;
}

/**
 * プログレスバーのテキストを生成する
 * 例えばこんなテキスト--------
 * ▓▓░░░░░░░░░░░░░
 * -------------------------
 * ブロックを塗る数は四捨五入で決定する
 * @param passedTimeRatio - 何%時間が過ぎたか 0~100(％)
 */
function generateProgressBar(passedTimeRatio) {

    const blockWidth = 15;

    filledBlockWidth = Math.round(passedTimeRatio / (100　/　blockWith));
    console.log("filledBlockWidth: " + filledBlockWidth);

    progressBar = '';

    // プログレスバーのうち塗られている部分
    for (i = 0; i < filledBlockWidth; i++) {
        progressBar += '▓';
    }

    // プログレスバーのうち塗られていない部分
    for (i = 0; i < blockWith - filledBlockWidth; i++) {
        progressBar += '░';
    }

    return progressBar;
}

/**
 * 与えられた文字列をツイートする
 * @param String text - ツイートする文字列
 */
function tweet(text) {
    var Twitter = require('twitter');
 
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.post('statuses/update', {status: text}, function(error, tweet, response) {

        if (error) {
            console.log(error)
            throw error;
        }

        console.log(tweet);
        console.log(response);

    })
}