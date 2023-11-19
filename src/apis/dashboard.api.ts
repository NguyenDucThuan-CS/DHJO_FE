import http from './../utils/http'

const url = 'api/dashboard/owner'

const getDashboardInfo = () => {
    return http.get(url)
}

export default getDashboardInfo;


