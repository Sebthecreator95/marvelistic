import MD5 from "crypto-js/md5"
import axios from "axios"

const getHash=(ts, privateKey,publicKey) => {
    return MD5(ts+ privateKey + publicKey).toString()
}

class MarvelApi {
    static async getRequest(endpoint, parameters){
        
        const BASE_URL = "http://gateway.marvel.com/v1/public/"
        let ts = Date.now().toString();
        let publicKey = '43717d3337d682447a2a09b08c403b03'
        let privateKey = process.env.REACT_APP_PRIVATE_KEY;
        let hash = getHash(ts, privateKey, publicKey);
        let url = `${BASE_URL}${endpoint}?ts=${ts}&${parameters}apikey=${publicKey}&hash=${hash}`;
        try {
            let response = await axios.get(url);
           
            return response
          } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response;
            throw Array.isArray(message) ? message : [message];
          } 
    }

    // CHARACTERS

    static async allCharacters(offset){
        let result = await this.getRequest('characters',`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data.results

    }

    static async totalCharacters(){
        let result = await this.getRequest('characters',`orderBy=name&limit=10&`)
        console.log(result.data.data.total)
        return result.data.data.total

    }

    static async searchCharacters(search){
        let result = await this.getRequest('characters',`nameStartsWith=${search}&orderBy=name&limit=100&`)
        return result.data.data.results

    }

    static async getCharacterById(id){
        let result = await this.getRequest(`characters/${id}`,``)
        return result.data.data.results

    }

    static async characterComics(id){
        let result = await this.getRequest(`characters/${id}/comics`,`orderBy=title&limit=100&`)
        return result.data.data 

    }
    

    static async characterEvents(id){
        let result = await this.getRequest(`characters/${id}/events`,`orderBy=name&limit=100&`)
        return result.data.data

    }


    
    
    static async characterSeries(id){
        let result = await this.getRequest(`characters/${id}/series`,`orderBy=title&limit=100&`)
        return result.data.data

    }



    static async characterStories(id){
        let result = await this.getRequest(`characters/${id}/stories`,`orderBy=id&limit=100&`)
        return result.data.data

    }

    







    //COMICS
    //Fetches lists of comics
    static async allComics(offset){
        let result = await this.getRequest(`comics`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches comic filtered by id.
    static async getComic(id){
        let result = await this.getRequest(`comics/${id}`,``)
        return result.data.data.results

    }

    //Fetches lists of characters filtered by a comic id.
    static async comicCharacters(id, offset){
        let result = await this.getRequest(`comics/${id}/characters`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of creators filtered by a comic id.
    static async comicCreators(id, offset){
        let result = await this.getRequest(`comics/${id}/creators`,`orderBy=firstName&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of events filtered by a comic id.
    static async comicEvents(id){
        let result = await this.getRequest(`comics/${id}/events`,`orderBy=name&limit=100&`)
        return result.data.data

    }

    //Fetches lists of stories filtered by a comic id.
    static async comicStories(id){
        let result = await this.getRequest(`comics/${id}/stories`,`orderBy=id&limit=100&`)
        return result.data.data

    }




    //CREATORS
    //Fetches lists of creators
    static async allCreators(offset){
        let result = await this.getRequest(`creators`,`orderBy=firstName&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of events filtered by a creator id.
    static async getCreator(id){
        let result = await this.getRequest(`creators/${id}`,``)
        return result.data.data.results

    }

    //Fetches lists of comics filtered by a creator id.
    static async creatorComics(id, offset){
        let result = await this.getRequest(`creators/${id}/comics`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of events filtered by a creator id.
    static async creatorEvents(id){
        let result = await this.getRequest(`creators/${id}/events`,`orderBy=name&limit=100&`)
        return result.data.data

    }

    //Fetches lists of series filtered by a creator id.
    static async creatorSeries(id){
        let result = await this.getRequest(`creators/${id}/series`,`orderBy=title&limit=100&`)
        return result.data.data

    }

    //Fetches lists of stories filtered by a creator id.
    static async creatorStories(id){
        let result = await this.getRequest(`creators/${id}/stories`,`orderBy=id&limit=100&`)
        return result.data.data

    }



    //EVENTS
    //Fetches lists of events
    static async allEvents(offset){
        let result = await this.getRequest(`events`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches Event by id.
    static async getEvent(id){
        let result = await this.getRequest(`events/${id}`,``)
        return result.data.data.results

    }

    //Fetches lists of characters filtered by a event id.
    static async eventCharacters(id, offset){
        let result = await this.getRequest(`events/${id}/characters`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of comics filtered by a event id.
    static async eventComics(id, offset){
        let result = await this.getRequest(`events/${id}/comics`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of creators filtered by a event id.
    static async eventCreators(id, offset){
        let result = await this.getRequest(`events/${id}/creators`,`orderBy=firstName&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of series filtered by a event id.
    static async eventSeries(id, offset){
        let result = await this.getRequest(`events/${id}/series`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of stories filtered by a event id.
    static async eventStories(id, offset){
        let result = await this.getRequest(`events/${id}/stories`,`orderBy=id&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of series.
    static async allSeries(offset){
        let result = await this.getRequest(`series`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches series filtered by id.
    static async getSeries(id){
        let result = await this.getRequest(`series/${id}`,``)
        return result.data.data.results

    }

    //Fetches lists of charcters filtered by series id.
    static async seriesCharacters(id, offset){
        let result = await this.getRequest(`series/${id}`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of comics filtered by series id.
    static async seriesComics(id, offset){
        let result = await this.getRequest(`series/${id}/comics`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }


    //Fetches lists of creators filtered by series id.
    static async seriesCreators(id, offset){
        let result = await this.getRequest(`series/${id}/creators`,`orderBy=firstName&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of events filtered by series id.
    static async seriesEvents(id, offset){
        let result = await this.getRequest(`series/${id}/events`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches lists of stories filtered by series id.
    static async seriesStories(id, offset){
        let result = await this.getRequest(`series/${id}/stories`,`orderBy=id&limit=100&offset=${offset}&`)
        return result.data.data

    }



    //STORIES
    //Fetches lists of stories
    static async allStories(offset){
        let result = await this.getRequest(`stories`,`orderBy=id&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches story filtered by id.
    static async getStory(id){
        let result = await this.getRequest(`stories/${id}`,``)
        return result.data.data.results

    }


    //Fetches list of characters filtered by story id
    static async storyCharacters(id, offset){
        let result = await this.getRequest(`stories/${id}/characters`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches list of comics filtered by story id
    static async storyComics(id, offset){
        let result = await this.getRequest(`stories/${id}/comics`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }


    //Fetches list of creators filtered by story id
    static async storyCreators(id, offset){
        let result = await this.getRequest(`stories/${id}/creators`,`orderBy=firstName&limit=100&offset=${offset}&`)
        return result.data.data

    }

    //Fetches list of events filtered by story id
    static async storyEvents(id, offset){
        let result = await this.getRequest(`stories/${id}/events`,`orderBy=name&limit=100&offset=${offset}&`)
        return result.data.data

    }


    //Fetches list of series filtered by story id
    static async storySeries(id, offset){
        let result = await this.getRequest(`stories/${id}/series`,`orderBy=title&limit=100&offset=${offset}&`)
        return result.data.data

    }
    
}


export default MarvelApi;

