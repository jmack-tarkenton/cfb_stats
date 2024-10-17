require('dotenv').config();
const cfbDataAPIkey = process.env.CFBDATA_APIKEY;

class CfbDataRepo{
    key=cfbDataAPIkey;
    baseUrl='https://api.collegefootballdata.com/';
    constructor() {
        this.key=process.env.CFBDATA_APIKEY;
    }

    async doFetch(url) {
        const response= await fetch(this.baseUrl + url, {
            headers: {
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    }

    async getSchedule(year,team){
        return await this.doFetch(`games?year=${year}&team=${team}&seasonType=regular`);
    }
}

module.exports={ default: CfbDataRepo};