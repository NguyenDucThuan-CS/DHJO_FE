// YourReactComponent.tsx
import React, { useEffect } from 'react'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'

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
  connect('thuan nguuyen')
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
