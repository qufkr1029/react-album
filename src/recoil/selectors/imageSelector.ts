import { selector } from "recoil";
import axios from "axios";
import { searchState } from "../atoms/searchState";
import { pageState } from "../atoms/pageState";

const API_URL = 'https://api.unsplash.com/search/photos'
const API_KEY = 'u-4ofew7BeIfxKNE4nFX_OEYfl6VErs57DQL-Q0DheY'
const PER_PAGE = 30

export const imageData = selector({
    key: 'imageData',
    get: async ({ get }) => {
        const serachValue = get(searchState)
        const pageValue = get(pageState)
        const requestURL = `${API_URL}?query=${serachValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`

        // API 호출
        try {
            const res = await axios.get(requestURL)
            console.log('axious 호출 res: ', res)
            return res.data
            
        } catch (error) {
            console.log(error)
        }
    }
})