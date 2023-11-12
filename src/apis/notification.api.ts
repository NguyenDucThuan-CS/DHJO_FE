import http from './../utils/http'

const url = 'api/notification'


export const getNotification = () => {
    return http.get(url)
}
 
 


