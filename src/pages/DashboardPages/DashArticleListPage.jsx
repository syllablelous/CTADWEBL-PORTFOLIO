import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Switch, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

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

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    isActive: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticleList(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      content: [],
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEditing(false);
      setEditArticleId(null);
      setNewArticle({
        name: '',
        title: '',
        content: [],
        isActive: true,
      });
    }, 300);
  };

  const handleEdit = (id) => {
    const articleToEdit = articleList.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle({ ...articleToEdit });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      await loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      const articleToUpdate = articleList.find(article => article._id === id);
      if (articleToUpdate) {
        await updateArticle(id, { ...articleToUpdate, isActive: !isActive });
        await loadArticles();
      }
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
        await loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'content',
      headerName: 'Content Preview',
      flex: 2,
      renderCell: (params) => (
        <Typography
          sx={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}
        >
          {params.value.join(' ')}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Switch
            checked={params.value}
            onChange={() => handleToggleActive(params.row._id, params.value)}
            color='primary'
          />
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%', width: '100%' }}>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack direction='row' sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h2' fontWeight='bold'>
          Articles
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
          Add Article
        </Button>
      </Stack>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='add-article-modal'
        aria-describedby='add-article-modal-description'
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
            {isEditing ? 'Edit Article' : 'Add Article'}
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
                  label='Enter name'
                  variant='standard'
                  value={newArticle.name}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, name: e.target.value })
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
                  label='Enter title'
                  variant='standard'
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
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
                  label='Enter content'
                  variant='standard'
                  multiline
                  rows={4}
                  value={newArticle.content.join('\n')}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, content: e.target.value.split('\n') })
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
                  onClick={handleSaveArticle}
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
                  {isEditing ? 'Update Article' : 'Add Article'}
                </Button>
              </Stack>
            </FormControl>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        <DataGrid
          rows={articleList}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        />
      </Box>
    </>
  );
};

export default DashArticleListPage;