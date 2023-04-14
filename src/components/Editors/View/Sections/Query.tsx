import * as React from 'react'
import EditorSection from '../../../Parts/Editor/EditorSection'
import MonacoEditor from '../../../Parts/Monaco/Editor'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FieldTree from '../../../Parts/Trees/Field'
import EditorSearch from '../../../Parts/Editor/EditorSearch'
import ScrollBox from '../../../Parts/ScrollBox'
import Columns from '../../../Parts/Columns'
import { useTheme } from '@mui/material/styles'
import { useStore, selectors } from '../store'

export default function Query() {
  const updateHelp = useStore((state) => state.updateHelp)
  return (
    <Columns>
      <EditorSection name="Query" onHeadingClick={() => updateHelp('query')}>
        <QueryEditor />
      </EditorSection>
      <QueryFields />
    </Columns>
  )
}

function QueryEditor() {
  const theme = useTheme()
  const query = useStore((state) => state.descriptor.query)
  const editor = useStore((state) => state.editor)
  const updateDescriptor = useStore((state) => state.updateDescriptor)
  return (
    <MonacoEditor
      height={theme.spacing(34)}
      value={query}
      language="sql"
      onChange={(text) => updateDescriptor({ query: text })}
      onMount={(ref) => {
        // @ts-ignore
        editor.current = ref
        editor.current.focus()
      }}
    />
  )
}

function QueryFields() {
  const theme = useTheme()
  // TODO: currently, we make it controlled just because it fixes field selection background color
  const [selected, setSelected] = React.useState<string>()
  const fieldTree = useStore(selectors.fieldTree)
  const editor = useStore((state) => state.editor)
  const searchTerm = useStore((state) => state.searchTerm)
  const updateState = useStore((state) => state.updateState)
  if (!fieldTree) return null
  return (
    <Box sx={{ borderLeft: 'solid 1px #ddd', height: '100%' }}>
      <Box sx={{ padding: 2, borderBottom: 'solid 1px #ddd' }}>
        <Columns layout={[6, 6]}>
          <Typography variant="h4">Fields</Typography>
          <EditorSearch
            value={searchTerm || ''}
            onChange={(value) => updateState({ searchTerm: value })}
          />
        </Columns>
      </Box>
      <ScrollBox height={theme.spacing(34)}>
        <FieldTree
          tree={fieldTree}
          selected={selected}
          onPathChange={setSelected}
          onPathDoubleClick={(path) => {
            if (editor.current) {
              editor.current.trigger('keyboard', 'type', { text: `"${path}"` })
              editor.current.focus()
            }
          }}
        />
      </ScrollBox>
    </Box>
  )
}
