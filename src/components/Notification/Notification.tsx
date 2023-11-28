import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCountUnread, getNotification } from '../../apis/notification.api'
import NoNoti from '../NoNoti/NoNoti'
import { useNavigate } from 'react-router-dom'
import './Notification.css'
import { ownerGetPostById } from '../../apis/post.api'
import { markAsRead } from '../../apis/notification.api'
import { useDispatch } from 'react-redux'
import { doUpdateNumNoti } from '../../redux/slice/notification'
const Notification = () => {
  const [list, setList] = useState<any>([])
  const [pageNo, setPageNo] = useState<number>(0)
  const [showMore, setShowMore] = useState<boolean>(true)
  const history = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    getNotification(pageNo).then((res) => {
      setList([...res.data.data.content[0]])
      if(res.data.data.last) {
        setShowMore(false)
      }
    })
  }, [pageNo])
  const renderTab = (item: any) => {
    if(!item.applied && !item.confirmed && !item.finished && !item.overdue) return 1
    if (item.applied === true) return 2
    if (item.confirmed === true) return 3
    if (item.finished === true) return 4
    if (item.overdue === true) return 5
    
    return 0
  }
  const renderContent = (item: any) => {
    const handleClick = () => {
      markAsRead(item.id).then((res) => {
        getCountUnread().then((res) => {
          dispatch(doUpdateNumNoti(res.data.data))
        })
      })
      if(window.location.href.split('/').includes('owner')) {
        if(item.entityType == 'Post') {
          ownerGetPostById(item.entityId).then((res) => {
            const tab = renderTab(res.data.data) 
            history(`/owner/my-news?tab=${tab}&&postId=${item.entityId}`)
          })
        }
      }

      else if(window.location.href.split('/').includes('helper')) {
        if(item.entityType == 'Post') {
          history(`/helper?postId=${item.entityId}`)
        }

        //if()
      
  
      }
      


      else if(item.entityType == 'Post') {

      }
    }

    return <div className='activity' onClick = {handleClick}>{item.notificationContent
    .replace('{{actorUsername}}', item.actorUsername)
    .replace('{{entityType}}', item.entityType === 'Post' ? 'bài đăng' : '')}</div>
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
        maxHeight: '1000px',
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
                        {renderContent(item)}
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
