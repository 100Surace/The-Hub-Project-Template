import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  modules,
  selectItem,
  currentId,
  onEdit,
  onDelete,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedModuleIds;

    if (event.target.checked) {
      newSelectedModuleIds = modules.map((module) => module.id);
    } else {
      newSelectedModuleIds = [];
    }

    setSelectedModuleIds(newSelectedModuleIds);
  };

  const handleSelectOne = (event, id) => {
    selectItem(id);

    const selectedIndex = selectedModuleIds.indexOf(id);
    let newSelectedModuleIds = [];

    if (selectedIndex === -1) {
      newSelectedModuleIds = newSelectedModuleIds.concat(selectedModuleIds, id);
    } else if (selectedIndex === 0) {
      newSelectedModuleIds = newSelectedModuleIds.concat(
        selectedModuleIds.slice(1)
      );
    } else if (selectedIndex === selectedModuleIds.length - 1) {
      newSelectedModuleIds = newSelectedModuleIds.concat(
        selectedModuleIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedModuleIds = newSelectedModuleIds.concat(
        selectedModuleIds.slice(0, selectedIndex),
        selectedModuleIds.slice(selectedIndex + 1)
      );
    }

    setSelectedModuleIds(newSelectedModuleIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box maxWidth={500}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search module"
          variant="outlined"
        />
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button>Import</Button>
          <Button>Export</Button>
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={onDelete}>Delete</Button>
        </ButtonGroup>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedModuleIds.length === modules.length}
                    color="primary"
                    indeterminate={
                      selectedModuleIds.length > 0 && selectedModuleIds.length < modules.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.slice(0, limit).map((module) => (
                <TableRow
                  hover
                  key={module.ids}
                  selected={selectedModuleIds.indexOf(module.ids) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedModuleIds.indexOf(module.ids) !== -1}
                      onChange={(event) => handleSelectOne(event, module.ids)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {module.moduleName}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={modules.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  modules: PropTypes.array.isRequired,
  selectItem: PropTypes.func,
  currentId: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Results;
