import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  button2: {
    marginLeft: 20,
    backgroundColor: "red",
  },

}));

const UsersButtonBlock = ({handleChangeName, addUser, handleClickSave, handleClickCancel, name}) => {
  const classes = useStyles();
  const inputRef = useRef(null);

  useEffect(() => {
    if (addUser) {
      inputRef?.current?.focus();
    }
  }, [addUser]);

  return (
    <div>
      <h2>Name</h2>
      <TextField
        id="outlined-password-input"
        label="Name"
        type="text"
        variant="outlined"
        value={name}
        onChange={e => handleChangeName(e.target.value)}
        placeholder="Enter name"
        inputRef={inputRef}
        size="small"
      />
      <div className="action_content--buttons">
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleClickSave}
          size="small"
          >
            Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleClickCancel}
          className={classes.button2}
          size="small"
        >
          Cancel
        </Button>
      </div>

      <style jsx>
        {`
          .button--type2 {
            margin-left: 15px;
          }

          .action_content--buttons {
            margin-top: 15px;
          }

          .button--delete {
            margin-left: 20px;
            vertical-align: middle;
          }
        `}
      </style>
    </div>
  )
}

export default UsersButtonBlock;