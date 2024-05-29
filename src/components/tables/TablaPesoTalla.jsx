import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import { listarRegistroMedicoPorPerfilPaciente, eliminarRegistroMedico } from '../../services/api';
import { transformFromWcfDate } from '../../utils/helpers';
import { useRegistroMedico } from '../../contexts/RegistroMedicoContext';

const columns = [
  { id: 'date', label: 'Fecha', minWidth: 100 },
  { id: 'weight', label: 'Peso (kg)', minWidth: 100, align: 'right' },
  { id: 'height', label: 'Talla (cm)', minWidth: 100, align: 'right' },
  { id: 'actions', label: 'Acciones', minWidth: 50, align: 'center' },
];

function createData(id, date, weight, height) {
  return { id, date, weight, height };
}

export default function ColumnGroupingTable() {
  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');
  const { registros, setRegistros } = useRegistroMedico();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      const response = await listarRegistroMedicoPorPerfilPaciente(perfilActivo.id);
      if (response.Success && response.RegistrosMedicos) {
        const fetchedRows = response.RegistrosMedicos.map((registro) =>
          createData(
            registro.registroMedicoId,
            transformFromWcfDate(registro.fecha),
            registro.datos.peso,
            registro.datos.talla
          )
        );
        setRegistros(fetchedRows);
      } else {
        setRegistros([]);
      }
    } catch (error) {
      console.error('Error fetching registros:', error);
      setRegistros([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await eliminarRegistroMedico(selectedId);
        setRegistros(registros.filter((row) => row.id !== selectedId));
      } catch (error) {
        console.error('Error deleting registro:', error);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 300, margin: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {registros
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">{row.weight}</TableCell>
                    <TableCell align="right">{row.height}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleClickOpen(row.id)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={registros.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación de eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este registro médico?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
