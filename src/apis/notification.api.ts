import http from './../utils/http'

const url = 'api/notification'


export const getNotification = (pageNo:number) => {
    return http.get(url, {
        params: {
            pageNo: pageNo,
            pageSize: 10,
            sortBy: 'created_at',
            sortDir: 'desc'
        }
    })
}
 

export const getCountUnread = () => {
    return http.get(url + '/count-unread')
}

export const markAsRead = (notiId: string) => {
    return http.post(url + '/mark-as-read', null,  {
        params: {
            notiId 
        }
    })
}


