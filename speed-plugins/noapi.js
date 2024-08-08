const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const Jimp = require('jimp')
const ffmpeg = require('fluent-ffmpeg')
const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
	"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
}
function _token(host) {
	return new Promise(async (resolve, reject) => {
		axios.request({
			url: host, method: 'GET', headers
		}).then(({ data }) => {
			let $ = cheerio.load(data)
			let token = $('#token').attr('value')
			resolve(token)
		})
	})
}

Spotifysearch = async (query) => {
    try {
        let url = await fetch('https://sa.caliph.eu.org/api/search/tracks?q=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let res = await url.json();
        console.log(res)
        return res; 
    } catch (error) {
        console.error(error); // Log any errors
        return null; // Or handle the error appropriately
    }
}

module.exports = {
  Spotifysearch 
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})