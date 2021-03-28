var KavenegarApiAsync = require("./kavenegar_api_async");
const main = async () => {
    var kp = new KavenegarApiAsync({
        apikey: "3868414677334B3432327A686A5A2F48376F2F594663434A3336485576414946344245682B53644238426B3D",
    });

    var result = await kp.send({
        message: "خدمات پیام کوتاه کاوه نگار",
        sender: "10004346",
        receptor: "09121014856,09021674294",
    });

    console.log(result);
};

main();
