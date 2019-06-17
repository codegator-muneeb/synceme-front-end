export class ApiConfig{
    //static localApiHost = "http://localhost:"
    static apiHost = "https://syncme.io:";
    static mqttPort = "3000"
    static leavePort = "3008"
    static userPort = "3002"
    static devicePort = "3001"
    static mqttBaseUrl = `${ApiConfig.apiHost}${ApiConfig.mqttPort}/mqtt`
    static leaveBaseUrl = `${ApiConfig.apiHost}${ApiConfig.leavePort}/leaves`
    static userBaseUrl = `${ApiConfig.apiHost}${ApiConfig.userPort}/user`
    static deviceBaseUrl = `${ApiConfig.apiHost}${ApiConfig.devicePort}/devices`
}