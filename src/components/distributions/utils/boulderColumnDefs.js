import { Box, } from '@mui/material';
import colorOptions from "./colorOptions";
import boulderGrades from './boulderGrades';
import { colorHexValues } from './colorOptions';
import BoulderGradeEditCell from '../components/boulder/BoulderGradeEditCell';
import BoulderSectionEditCell from '../components/boulder/BoulderSectionEditCell';
import BoulderSetterEditCell from '../components/boulder/BoulderSetterEditCell';
import BoulderDateEditCell from '../components/boulder/BoulderDateEditCell';
import dayjs from 'dayjs';
import BoulderColorPicker from '../components/boulder/BoulderColorPicker';


const getBoulderColumnDefs = (sectionInfoList, setterInfoList) => {
  return [
    { 
      align: 'center',
      field: 'position',
      editable: false,
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
      valueOptions: boulderGrades,
      width: 150,
      renderEditCell: (params) => (
        <BoulderGradeEditCell
          row={params.row}
          field={params.field}
          id={params.row.id}
          value={params.value}
          valueOptions={params.colDef.valueOptions}
        />
      )
    },
    {
      align: 'center',
      field: 'sectionId',
      editable: true,
      headerAlign: 'center',
      headerName: 'Location',
      sortable: false,
      valueOptions: sectionInfoList,
      width: 150,
      renderEditCell: (params) => (
        <BoulderSectionEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
          formattedValue={params.formattedValue}
          valueOptions={params.colDef.valueOptions}
        />
      ),
      valueFormatter: (params) => {
        const matchingSection = sectionInfoList?.find(sectionInfo => sectionInfo.id === params.value);

        return matchingSection?.name
      }
    },
    { 
      field: 'color',
      editable: true,
      headerAlign: 'center',
      headerName: 'Color',
      sortable: false,
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
      renderEditCell: (params) => <BoulderColorPicker {...params} />
    },
    { 
      align: 'center',
      field: 'setter',
      editable: true,
      headerAlign: 'center',
      headerName: 'Setter',
      sortable: false,
      type: 'singleSelect',
      valueOptions: setterInfoList,
      width: 150,
      renderEditCell: (params) => (
        <BoulderSetterEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
          formattedValue={params.formattedValue}
          valueOptions={params.colDef.valueOptions}
        />
      ), 
      valueFormatter: params => params.value,
    },
    { 
      align: 'center',
      field: 'dateSet',
      editable: true,
      headerAlign: 'center',
      headerName: 'Date Set',
      sortable: false,
      width: 150,
      renderEditCell: (params) => (
        <BoulderDateEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
          formattedValue={params.formattedValue}
          valueOptions={params.colDef.valueOptions}
        />
      )
    },
    { 
      align: 'center',
      field: 'daysOld',
      editable: false,
      headerAlign: 'center',
      headerName: 'Days Old',
      sortable: false,
      width: 100, 
      valueFormatter: (params) => {
        const today = dayjs();
        const {dateSet} = params.api.getRow(params.id);
        const daysOld = today.diff(dateSet, 'day');
        
        return daysOld
      }
    },
  ];
}

export default getBoulderColumnDefs;