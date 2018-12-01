class Helper {
    static baseUrl() {
        return "https://api.foursquare.com/v2/";
    }
    static auth() {
        const keys = {
            client_id: "2PWFS01LZ4GGTUFBIRV2DJTP1NRJ5E3JTBUUHQX1B2OOUJHJ",
            client_secret: "NDWVQEPKZK3LDC151TQ4I2S25EP5SOYYB1XUTDIUJJMJGFP2",
            v: "20182709"
        };

        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&")
    }

    static urlBuilder(urlPrams) {

        if (!urlPrams) {
            return ""
        }

        return Object.keys(urlPrams)
            .map(key => `${key}=${urlPrams[key]}`)
            .join("&")

    }
    static headers() {
        return {
            Accept: "application/json"
        }
    }


    static simpleFetch(endPoint, method, urlPrams) {

        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseUrl()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlPrams
        )}`,
            requestData
        ).then(res => res.json());
    }
}

export default class SquareAPI {

    static search(urlPrams) {
        return Helper.simpleFetch("venues/search", "GET", urlPrams);
    }

    static getVenuesDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }

}