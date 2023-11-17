// YourReactComponent.tsx
import React, { useEffect } from 'react'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { getAuthInfo } from '../apis/auth.api'


const Socket: React.FC = () => {
  let stompClient: any = null

  function connect(username: string) {
    let socket = new SockJS('http://localhost:8080/notify')
    stompClient = over(socket)
    stompClient.connect({ username: username }, function () {
      console.log('Web Socket is connected')
      stompClient.subscribe('user/queue/notification', function (message: any) {
        console.log('message', message)
      })
    })
  }

 useEffect(() => {
  getAuthInfo().then((res) => {
    connect(res.data.data.username)
  })
  
 }, [])

  const onError = (err: any) => {
    console.log(err)
  }

  return (
    <div>
      
    </div>
  )
}

export default Socket
