import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
interface IconHamburgerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}
const IconHamburger = ({ onClick }: IconHamburgerProps) => {
  return (
    <IconButton
      size='large'
      aria-label='account of current user'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={onClick}
      color='inherit'
    >
      <MenuIcon />
    </IconButton>
  )
}

export default IconHamburger
