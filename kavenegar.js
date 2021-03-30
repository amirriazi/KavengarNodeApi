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

    async Status(data) {
        return await this._request("sms", "status", data);
    }
    async StatusLocalMessageid(data) {
        return await this._request("sms", "statuslocalmessageid", data);
    }
    async Select(data) {
        return await this._request("sms", "select", data);
    }
    async SelectOutbox(data) {
        return await this._request("sms", "selectoutbox", data);
    }
    async LatestOutbox(data) {
        return await this._request("sms", "latestoutbox", data);
    }
    async CountOutbox(data) {
        return await this._request("sms", "countoutbox", data);
    }
    async Cancel(data) {
        return await this._request("sms", "cancel", data);
    }
    async Receive(data) {
        return await this._request("sms", "receive", data);
    }
    async CountInbox(data) {
        return await this._request("sms", "countinbox", data);
    }
    async CountPostalCode(data) {
        return await this._request("sms", "countpostalcode", data);
    }
    async SendByPostalCode(data) {
        return await this._request("sms", "sendbypostalcode", data);
    }
    async VerifyLookup(data) {
        return await this._request("verify", "lookup", data);
    }
    async AccountInfo(data) {
        return await this._request("account", "info", data);
    }
    async AccountConfig(data) {
        return await this._request("account", "config", data);
    }
    async CallMakeTTS(data) {
        return await this._request("call", "maketts", data);
    }
}

module.exports = KavenegarApiAsync;
