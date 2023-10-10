import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import PerInfo from './PerInfo'
import ChangePassword from './ChangePassword'
import AddAdress from './AddAddress'
import useStyles from './style'
export default function LabTabs() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const classes = useStyles()
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Thông tin cá nhân' value='1' />
            <Tab label='Bảo mật' value='2' />
            <Tab label='Địa chỉ' value='3' />

          </TabList>
        </Box>
        <TabPanel value='1' className={classes.tabPanel}>
          <PerInfo />
        </TabPanel>
        <TabPanel value='2' className={classes.tabPanel}>
          <ChangePassword />
        </TabPanel>
        <TabPanel value='3' className={classes.tabPanel}>
          <AddAdress />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
