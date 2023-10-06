import ListHelperCard from '../FavoriteHelpers/ListHelperCard/ListHelperCard'
import { useState } from 'react'

const Step3 = () => {
  const [idHouseChosen, setIdHouseChosen] = useState<string>('')

  const listHelpers = [
    {
      id: 'skks',
      name: 'kkisks',
      gender: { id: 'hshsh', name: 'nam' },
      birhday: '08/02/1999',
      education: { id: 'jjsjs', name: 'kssks' },
      skills: [
        { id: 'JSJJSJ', skillName: 'string' },
        { id: 'OAOOA', skillName: 'string' }
      ]
    }
  ]

  const choose = (id: string, flag: boolean) => {
    if (flag === true) setIdHouseChosen(id)
    else setIdHouseChosen('')
  }

  return (
    <div>
      <ListHelperCard listHelpers={listHelpers} idChosen={idHouseChosen} choose={choose}></ListHelperCard>
    </div>
  )
}

export default Step3
