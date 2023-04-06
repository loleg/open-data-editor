import * as React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import ConfigPanel from './Panels/Config'

export default function Layout() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: theme.spacing(48),
        borderTop: 1,
        borderColor: 'divider',
        paddingX: 2,
      }}
    >
      <ConfigPanel />
    </Box>
  )
}
