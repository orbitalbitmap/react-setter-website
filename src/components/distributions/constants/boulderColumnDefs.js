import { Box } from '@mui/material';
import ColorPicker from '../components/ColorPicker'
import colorOptions from "./colorOptions";
import boulderGrades from './boulderGrades';
import { colorHexValues } from './colorOptions';


const getBoulderColumnDefs = (sectionInfoList, setterInfoList) => {
  const sectionList = sectionInfoList.map((section) => section.name);
  const setterList = setterInfoList.map((setter) => {
    return setter.placardName
      ? setter.placardName
      : setter.firstName
  });

  return [
    { 
      align: 'center',
      field: 'position',
      editable: true,
      headerAlign: 'center',
      headerName: 'Position',
      sortable: false,
      type: 'number',
      width: 100,
    },
    { 
      align: 'center',
      field: 'grade',
      editable: true,
      headerAlign: 'center',
      headerName: 'Grade',
      sortable: false,
      type: 'singleSelect',
      valueOptions: boulderGrades,
      width: 150,
    },
    { 
      align: 'center',
      field: 'sectionName',
      editable: true,
      headerAlign: 'center',
      headerName: 'Location',
      sortable: false,
      type: 'singleSelect',
      valueOptions: sectionList,
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
        return (
          <ColorPicker {...params} value={params.value} climbId={params.row.id} />
        )
      }
    },
    { 
      align: 'center',
      field: 'setter',
      editable: true,
      headerAlign: 'center',
      headerName: 'Setter',
      sortable: false,
      type: 'singleSelect',
      valueOptions: setterList,
      width: 150,
    },
    { 
      align: 'center',
      field: 'dateSet',
      editable: true,
      headerAlign: 'center',
      headerName: 'Date Set',
      sortable: false,
      type: 'date',
      width: 150,
    },
    { 
      align: 'center',
      field: 'daysOld',
      editable: false,
      headerAlign: 'center',
      headerName: 'Days Old',
      sortable: false,
      width: 100, 
    },
  ];
}

export default getBoulderColumnDefs;