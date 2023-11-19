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
 
 


