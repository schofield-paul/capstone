import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../slices/authSlice';
import { addGroupPost } from '../../slices/groupsSlice';
import { Divider } from '@mui/material';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddGroupPost = (props) => {
  const { groupId } = props;
  const { userAuth } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [color, setColor] = useState('');

  const submitPost = async (e) => {
    e.preventDefault();

    await dispatch(addGroupPost({ groupId, content }));
    setContent('');
    setSnackbarMessage('Howl posted!');
    setColor('#64b5f6');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="white"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const labelClass = 'font-rubikmono text-left pb-3';

  const commentBox =
    'w-full appearance-none border-slate-400 leading-tight block rounded-lg p-5 bg-bright-white focus:border-bold-blue focus:outline-none';

  const disabledBox =
    'w-full appearance-none leading-tight block rounded-lg p-5  border-slate-400 w-full bg-slate-200/50 focus:border-bold-blue focus:outline-none';

  const buttonClass =
    'text-sm px-4 py-3 text-bright-white rounded-lg bg-bold-purple font-semibold ease-in-out duration-100 hover:bg-pale-purple';

  const disabledButtonClass =
    'cursor-default text-sm px-4 py-3 text-bright-white rounded-lg bg-pale-purple font-semibold';

  return (
    <div>
      <div>
        <form onSubmit={submitPost}>
          <div className="flex flex-wrap mb-5">
            <div className="w-full flex flex-col">
              <label className={labelClass}>ADD Post</label>
              <textarea
                id="content"
                name="content"
                value={content}
                className={userAuth && userAuth.id ? commentBox : disabledBox}
                required
                placeholder={
                  userAuth && userAuth.id
                    ? 'awoooo...'
                    : 'must be logged in to howl'
                }
                rows={3}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              className={
                content && userAuth && userAuth.id
                  ? buttonClass
                  : disabledButtonClass
              }
              disabled={userAuth && userAuth.id ? false : true}
              type="submit"
            >
              POST HOWL
            </button>
          </div>
        </form>
        <div className="my-5">
          <Divider />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <SnackbarContent
          message={snackbarMessage}
          action={action}
          autoHideDuration={3000}
          style={{
            backgroundColor: `${color}`,
          }}
        />
      </Snackbar>
    </div>
  );
};

export default AddGroupPost;
