const moment = require('moment');
require('moment-timezone')

moment.tz.setDefault('Asia/Tokyo')

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

    this.doTweet(
        this.generateTweetText(
            this.calcPassedTimeRatio()
        )
    );

};

/**
 * 現在時刻、当月がどれだけの割合経過しているかを計算する
 * @return float - 経過した割合(0~100%)
 */
exports.calcPassedTimeRatio = () => {

    // 時刻取得
    const currentTime = moment();
    const startMonthTime = moment(currentTime).startOf('months');
    const endMonthTime = moment(currentTime).endOf('months');

    // 経過割合計算
    const passedTime = currentTime.diff(startMonthTime);
    const monthTime = endMonthTime.diff(startMonthTime);

    const passedTimeRatio = passedTime / monthTime;

    return passedTimeRatio;

}

/**
 * 実際にツイートするテキストを生成する
 * 例えばこんなツイート--------
 * 1月
 * ▓▓░░░░░░░░░░░░░ 13%
 * -------------------------
 * @param float passedTimeRatio - 経過した割合 (0~1)
 */
exports.generateTweetText = (passedTimeRatio) => {    

    const month = moment().format('M')
    const progressBar = this.generateProgressBar(passedTimeRatio);
    const passedTimeRatio_percent = Math.round(passedTimeRatio * 100);

    return `${month}月\n${progressBar} ${passedTimeRatio_percent}%`;

}

/**
 * プログレスバーのテキストを生成する
 * 例えばこんなテキスト--------
 * ▓▓░░░░░░░░░░░░░
 * -------------------------
 * ブロックを塗る数は四捨五入で決定する
 * @param passedTimeRatio - 何%時間が過ぎたか (0~1)
 */
exports.generateProgressBar = (passedTimeRatio) => {

    const blockWidth = 15;

    const filledBlockWidth = Math.round(blockWidth * passedTimeRatio);

    return "▓".repeat(filledBlockWidth) + '░'.repeat(blockWidth - filledBlockWidth)

}

/**
 * 与えられた文字列をツイートする
 * @param String text - ツイートする文字列
 */
exports.doTweet = (text) => {

    const Twitter = require('twitter');
 
    const client = new Twitter({
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