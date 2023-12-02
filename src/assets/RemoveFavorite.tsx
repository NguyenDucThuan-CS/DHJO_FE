import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system'
const StyledFavoriteIcon = styled(FavoriteIcon)({
  color: 'pink',
});

export const RemoveFavorite = () => {
  return (
    <StyledFavoriteIcon />
  )
}

