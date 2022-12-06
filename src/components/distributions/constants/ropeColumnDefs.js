import { Box } from '@mui/material';
import ColorPicker from '../components/ColorPicker'
import colorOptions from "./colorOptions";
import ropeGrades from "./ropeGrades";
import ropeTypes from "./ropeTypes";
import { colorHexValues } from './colorOptions';

const ropeColumnDefs = [
  { 
    field: 'station',
    editable: true,
    headerAlign: 'center',
    headerName: 'Station',
    sortable: false,
    type: 'number',
    width: 100,
  },
  { 
    field: 'climbName',
    editable: true,
    headerAlign: 'center',
    headerName: 'Name',
    sortable: false,
    type: 'string',
    width: 150,
  },
  { 
    field: 'sectionName',
    editable: true,
    headerAlign: 'center',
    headerName: 'Location',
    sortable: false,
    type: 'string',
    width: 150,
  },
  { 
    field: 'ropeStyle',
    editable: true,
    headerAlign: 'center',
    headerName: 'Rope Style',
    sortable: false,
    type: 'singleSelect',
    valueOptions: ropeTypes,
    width: 150,
    },
  { 
    field: 'grade',
    editable: true,
    headerAlign: 'center',
    headerName: 'Grade',
    sortable: false,
    type: 'singleSelect',
    valueOptions: ropeGrades,
    width: 150,
  },
  { 
    field: 'color',
    editable: true,
    headerAlign: 'center',
    headerName: 'Color',
    sortable: false,
    type: 'singleSelect',
    valueOptions: colorOptions,
    width: 150,
    renderCell: (params) => (
      <>
        <Box
          sx={{
            bgcolor: colorHexValues[params.value],
            width: '24px',
            height: '24px',
            borderRadius: '0.25rem',
            border: '1px solid black',
            mr: 2,
          }}
        />
        {params.value}
      </>
    ),
    renderEditCell: (params) => {
      console.log(params)
      return (
        <ColorPicker {...params} value={params.row.color}/>
      )
    }
  },
  { 
    field: 'setter',
    editable: true,
    headerAlign: 'center',
    headerName: 'Setter',
    sortable: false,
    type: 'string',
    width: 150,
  },
  { 
    field: 'dateSet',
    editable: true,
    headerAlign: 'center',
    headerName: 'Date Set',
    sortable: false,
    type: 'date',
    width: 150,
  },
  { 
    field: 'daysOld',
    editable: false,
    headerAlign: 'center',
    headerName: 'Days Old',
    sortable: false,
    width: 100, 
  },
];

export default ropeColumnDefs;