import React, { useState } from "react";
import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const Datatable = ({ title, columns, rows }) => {
  const getRowId = (row) => row._id;
  return (
    <div className="datatable">
      <h3>{title}</h3>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        initialState={
          {
            pagination:{
              paginationModel:{
                pageSize:15,
              },
            },
          }
        }
        slots={{ toolbar: GridToolbar }}
        slotProps={
          {
            toolbar:{
              showQuickFilter:true,
              quickFilterProps:{debounceMs:500},

            }
          }
        }
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        // disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
      />
      
    </div>
  );
};

export default Datatable;
