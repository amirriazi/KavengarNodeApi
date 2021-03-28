const https = require("https");
const querystring = require("querystring");

class KavenegarApiAsync {
    constructor(options) {
        this.options = { ...options };
        this.options.host = "api.kavenegar.com";
        this.options.version = "v1";
    }
    async _request(action, method, params) {
        const path = `https://${this.options.host}/${this.options.version}/${this.options.apikey}/${action}/${method}.json`;
        const postData = querystring.stringify(params);

        const post_options = {
            method,
            host: this.options.host,
            port: 443,
            path: path,
            headers: {
                "Content-Length": postData.length,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.request(post_options, (res) => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error(`Status Code: ${res.statusCode}`));
                }
                const data = [];
                res.on("data", (chunk) => {
                    data.push(chunk);
                });
                res.on("end", () => resolve(Buffer.concat(data).toString()));
            });

            req.on("error", reject);

            if (postData) {
                req.write(postData);
            }

            req.end();
        });
    }

    async send(data) {
        return await this._request("sms", "send", data);
    }

    async SendArray(data) {
        return await this._request("sms", "sendarray", data);
    }

    async Status(data, callback) {
        return await this._request("sms", "status", data, callback);
    }
    async StatusLocalMessageid(data, callback) {
        return await this._request("sms", "statuslocalmessageid", data, callback);
    }
    async Select(data, callback) {
        return await this._request("sms", "select", data, callback);
    }
    async SelectOutbox(data, callback) {
        return await this._request("sms", "selectoutbox", data, callback);
    }
    async LatestOutbox(data, callback) {
        return await this._request("sms", "latestoutbox", data, callback);
    }
    async CountOutbox(data, callback) {
        return await this._request("sms", "countoutbox", data, callback);
    }
    async Cancel(data, callback) {
        return await this._request("sms", "cancel", data, callback);
    }
    async Receive(data, callback) {
        return await this._request("sms", "receive", data, callback);
    }
    async CountInbox(data, callback) {
        return await this._request("sms", "countinbox", data, callback);
    }
    async CountPostalCode(data, callback) {
        return await this._request("sms", "countpostalcode", data, callback);
    }
    async SendByPostalCode(data, callback) {
        return await this._request("sms", "sendbypostalcode", data, callback);
    }
    async VerifyLookup(data, callback) {
        return await this._request("verify", "lookup", data, callback);
    }
    async AccountInfo(data, callback) {
        return await this._request("account", "info", data, callback);
    }
    async AccountConfig(data, callback) {
        return await this._request("account", "config", data, callback);
    }
    async CallMakeTTS(data, callback) {
        return await this._request("call", "maketts", data, callback);
    }

    // And Other methods refactor in the same way!
}

module.exports = KavenegarApiAsync;
