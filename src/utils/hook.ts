import { useMediaQuery } from 'react-responsive'

export enum EBreakPoint {
  xs = 0,
  sm = 600,
  md = 900,
  lg = 1200,
  xl = 1536
}

export const useResposive = () => {
  const isFromXs = useMediaQuery({ minWidth: EBreakPoint.xs })
  const isFromMd = useMediaQuery({ minWidth: EBreakPoint.md })
  const isFromLg = useMediaQuery({ minWidth: EBreakPoint.lg })

  return {
    isFromXs,
    isFromMd,
    isFromLg
  }
}
