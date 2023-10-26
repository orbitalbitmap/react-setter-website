import { Box } from '@mui/material';
import colorOptions from "./colorOptions";
import ropeGrades from "./ropeGrades";
import ropeTypes from "./ropeTypes";
import { colorHexValues } from './colorOptions';
import RouteSectionEditCell from '../components/route/RouteSectionEditCell';
import RouteGradeEditCell from '../components/route/RouteGradeEditCell';
import dayjs from 'dayjs';
import RouteDateEditCell from '../components/route/RouteDateEditCell';
import RouteSetterEditCell from '../components/route/RouteSetterEditCell';
import RouteColorPicker from '../components/route/RouteColorPicker';
import RouteStyleEditCell from '../components/route/RouteStyleEditCell';
import RouteStationEditCell from '../components/route/RouteStationEditCell';
import RouteNameEditCell from '../components/route/RouteNameEditCell';


const getRopeColumnDefs = (sectionInfoList, setterInfoList) => {
  return [
    { 
      field: 'station',
      editable: true,
      headerAlign: 'center',
      headerName: 'Station',
      sortable: false,
      type: 'number',
      width: 100,
      renderEditCell: (params) => (
        <RouteStationEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
        />
      ),
    },
    { 
      field: 'climbName',
      editable: true,
      headerAlign: 'center',
      headerName: 'Name',
      sortable: false,
      type: 'string',
      width: 150,
      renderEditCell: (params) => (
        <RouteNameEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
        />
      ),
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
        <RouteSectionEditCell
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
      align: 'center',
      field: 'ropeStyle',
      editable: true,
      headerAlign: 'center',
      headerName: 'Rope Style',
      sortable: false,
      type: 'singleSelect',
      valueOptions: ropeTypes,
      width: 150,
      renderEditCell: (params) => {
        return (
        <RouteStyleEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
          valueOptions={params.colDef.valueOptions}
        />
      )}
    },
    { 
      align: 'center',
      field: 'grade',
      editable: true,
      headerAlign: 'center',
      headerName: 'Grade',
      sortable: false,
      valueOptions: ropeGrades,
      width: 150,
      renderEditCell: (params) => {
        return (
        <RouteGradeEditCell
          row={params.row}
          field={params.field}
          id={params.id}
          value={params.value}
          valueOptions={params.colDef.valueOptions}
        />
      )}
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
      renderEditCell: (params) => <RouteColorPicker {...params} />
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
        <RouteSetterEditCell
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
      field: 'dateSet',
      editable: true,
      headerAlign: 'center',
      headerName: 'Date Set',
      sortable: false,
      width: 150,
      renderEditCell: (params) => (
        <RouteDateEditCell
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

export default getRopeColumnDefs;