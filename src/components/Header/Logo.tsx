import { Typography } from '@mui/material'
import { Variant, OverridableStringUnion, TypographyPropsVariantOverrides } from '@mui/material/styles/createTypography'

interface LogoProps {
  variant: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides> | undefined
  display: {
    xs: string
    md: string
  }
}
const Logo = ({ variant, display }: LogoProps) => {
  return (
    <Typography
      variant={variant}
      noWrap
      component='a'
      href='/'
      sx={{
        mr: 2,
        display: display,
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      LOGO
    </Typography>
  )
}

export default Logo
