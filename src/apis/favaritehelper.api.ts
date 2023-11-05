import http from './../utils/http'

const url = 'api/favourite'


export const addFavoriteHelper = (id:string) => {
    return http.post(url, null, {
        params: {
            helperId: id
        }
      })
}

export const removeFavoriteHelper = (id:string) => {
    return http.delete(url,  {
        params: {
            helperId: id
        }
      })
}

export const getFavoriteHelpers = () => {
    return http.get(url+'/list')
}
