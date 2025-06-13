import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { createUser, fetchUsers, updateUser } from '../../services/UserService';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Switch, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  p: 4,
  outline: 'none',
  maxHeight: '85vh',
  overflowY: 'auto',
  textAlign: 'center',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
    '&:hover': {
      background: '#555',
    },
  },
};


const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    isActive: true,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEditing(false);
      setEditUserId(null);
      setNewUser({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        username: '',
        password: '',
        address: '',
        isActive: true,
      });
    }, 300);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: '' });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    try {
      if (isEditing) {
        const updatedUser = { ...newUser };
        if (!updatedUser.password) {
          delete updatedUser.password;
        }
        await updateUser(editUserId, updatedUser);
      } else {
        await createUser(newUser);
      }

      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const columns1 = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,

      valueGetter: (value, params) => `${params.firstName || ''} ${params.lastName || ''}`,
    },
    { field: 'age', headerName: 'Age', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1, sortable: true },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
            color='primary'
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack direction='row' sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h2' fontWeight='bold'>
          Users
        </Typography>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            right: '20px',
            top: '100px',
            zIndex: 1000,
          }}
        >
          Add User
        </Button>
      </Stack>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='add-user-modal'
        aria-describedby='add-user-modal-description'
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={{
          ...modalStyle,
          opacity: open ? 1 : 0,
          transform: open ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
          transition: 'all 0.3s ease-in-out',
        }}>
          <Typography
            id='keep-mounted-modal-title'
            variant='h4'
            component='h2'
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'primary.main',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 1
            }}
          >
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>
          <Stack
            id='transition-modal-description'
            direction='column'
            spacing={3}
            sx={{
              mt: 2,
              '& .MuiFormControl-root': {
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
            }}
          >
            <FormControl fullWidth variant='standard'>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter first name'
                  variant='standard'
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter last name'
                  variant='standard'
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter age'
                  variant='standard'
                  value={newUser.age}
                  onChange={(e) =>
                    setNewUser({ ...newUser, age: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>

              <Stack direction='row' sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1 }} />
                <FormControl fullWidth variant='standard'>
                  <InputLabel
                    id='demo-simple-select-standard-label'
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    IconComponent={ExpandMoreIcon}
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={newUser.gender}
                    onChange={(e) =>
                      setNewUser({ ...newUser, gender: e.target.value })
                    }
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'primary.light',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: 'primary.main',
                      },
                      '& .MuiSelect-icon': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter mobile number'
                  variant='standard'
                  value={newUser.contactNumber}
                  onChange={(e) =>
                    setNewUser({ ...newUser, contactNumber: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter email'
                  variant='standard'
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter username'
                  variant='standard'
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter password'
                  type='password'
                  variant='standard'
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              }}>
                <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  label='Enter address'
                  variant='standard'
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'primary.light',
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'primary.main',
                    },
                  }}
                />
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                <Button
                  variant='outlined'
                  onClick={handleClose}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  onClick={handleSaveUser}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  {isEditing ? 'Update User' : 'Add User'}
                </Button>
              </Stack>
            </FormControl>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        <DataGrid
          rows={users.map((user) => ({
            id: user._id,
            ...user,
          }))}
          columns={columns1}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelctionOnClick
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        />
      </Box>

    </>
  )
};

export default UsersPage;