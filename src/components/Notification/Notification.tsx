import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { getNotification } from '../../apis/notification.api'
import './Notification.css'

const Notification = () => {
  const [list, setList] = useState<any>([])

  useEffect(() => {
    getNotification().then((res) => {
      setList(res.data.data.content[0])
    })
  }, [])

  const renderContent = (item: any) => {
    return item.notificationContent
      .replace('{{actorUsername}}', item.actorUsername)
      .replace('{{entityType}}', item.entityType === 'Post' ? 'bài đăng' : '')
  }

  return (
    <Stack
      direction={'column'}
      sx={{
        position: 'absolute',
        top: '24px',
        right: '30px',
        width: '300px',
        zIndex: 9999,
        background: 'white',
        boxShadow: `1px 2px 5px 0px rgba(0,0,0,0.75);`,
        padding: '10px',
        color: 'black',
        borderRadius: '10px',
        maxHeight: '200px',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
    >
      <ul className='notificationsbtn nav navbar-nav navbar-right'>
        <div id='notification-container' className='dropdown-menu' role='menu' aria-labelledby='drop3'>
          <section className='panel'>
            <header className='panel-heading'>Thông báo</header>
            <div id='notification-list' className='list-group list-group-alt'>
              <div>
                <div className='noty-manager-list-item noty-manager-list-item-error'>
                  {list.map((item: any) => {
                    return (
                      <div className='activity-item'>
                        {' '}
                        <i className='fa fa-shopping-cart text-success'></i>{' '}
                        <div className='activity'> {renderContent(item)} </div> c
                        <div className='activity'> {renderContent(item)} </div>{' '}
                        <div className='activity'> {renderContent(item)} </div>{' '}
                        <div className='activity'> {renderContent(item)} </div>{' '}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <footer className='panel-footer'>
              <a href='#' className='pull-right'>
                <i className='fa fa-cog'></i>
              </a>
              <a>Xem thêm</a>
            </footer>
          </section>
        </div>
      </ul>
    </Stack>
  )
}

export default Notification
