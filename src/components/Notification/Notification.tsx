import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { getNotification } from '../../apis/notification.api'
import NoNoti from '../NoNoti/NoNoti'
import './Notification.css'

const Notification = () => {
  const [list, setList] = useState<any>([])
  const [pageNo, setPageNo] = useState<number>(0)
  const [showMore, setShowMore] = useState<boolean>(true)

  useEffect(() => {
    getNotification(pageNo).then((res) => {
      setList([...res.data.data.content[0], ...list])
      if(res.data.data.last) {
        setShowMore(false)
      }
    })
  }, [pageNo])

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
        color: 'black',
        maxHeight: '300px',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
      className='noti_list'
    >
      <ul className='notificationsbtn nav navbar-nav navbar-right'>
        <div id='notification-container' className='dropdown-menu' role='menu' aria-labelledby='drop3'>
          <section className='panel'>
            <header className='panel-heading' style={{fontSize: '17px', fontWeight:'bold', padding:'20px'}}>Thông báo</header>
            <div id='notification-list' className='list-group list-group-alt'>
              <div>
                <div className='noty-manager-list-item noty-manager-list-item-error'>
                  {list?.map((item: any, index:any) => {
                    return (
                      <div className='activity-item' key = {index} style={{background: item.read ? 'unset':'#f3f5f7', borderTop: '1px solid #f5f5f5'}}>
                        {' '}
                        <i className='fa fa-shopping-cart text-success'></i>{' '}
                        <div className='activity'> {renderContent(item)} </div>
                      </div>
                    )
                  })}

                  {
                    !list.length && <NoNoti />
                  }
                </div>
              </div>
            </div>
            <footer className='panel-footer'>
              <a href='#' className='pull-right'>
                <i className='fa fa-cog'></i>
              </a>
              {showMore && <a onClick = {() => {
                setPageNo(pageNo + 1)
              }}>Xem thêm</a>}
            </footer>
          </section>
        </div>
      </ul>
    </Stack>
  )
}

export default Notification
