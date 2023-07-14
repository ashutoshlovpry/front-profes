import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { BACKEND_HOST ,HOST} from '../constant'
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
// import IconButton from '@material-ui/core/IconButton';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import temp from "../..public/add_post.png"
function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());
 const changeNavigation=(e,newValue)=>{

console.log(newValue);
switch (newValue){
    case 0:
        console.log("000");
    case 1:
        console.log("!11");
    case 2:
        console.log("22");
        addPost()
}

 }
  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);
  const addPost=()=>{
    setOpen(true)

  }

  const sumitPost=()=>{
    let data={}
    data.titie =document.getElementById('title')
    data.content=document.getElementById('title')
    



  }


  const handleFileUpload=(e)=>{

  }
  return (
    <>
    <img src={process.env.PUBLIC_URL+"/images/add_post.png"}></img>
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItem button key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))}
      </List>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
           changeNavigation(event,newValue)
          }}
        >
            
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          <BottomNavigationAction label="Post" icon={ <AddCircleOutlineTwoToneIcon />
} />

        </BottomNavigation>
      </Paper>
    </Box>
    <Modal
        //keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
          required
          id="title"
          label="Title"
          variant='filled'
          error={error.name}
        />
          <TextareaAutosize
          required
          id="content"
          label="Write something..."
          variant='filled'
          error={error.name}
        /><br/>

<input
        accept="image/*" // Specify the accepted file types
        id="upload-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-file">
          <AddPhotoAlternateTwoToneIcon />
      </label>
 <Button variant="contained" href="#contained-buttons"  onClick={sumitPost}>submit
</Button>
        </Box>
        </>
      </Modal>
    </>
  );
}

const messageExamples = [
    {
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: '/static/images/avatar/5.jpg',
    },
    {
      primary: 'Birthday Gift',
      secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      person: '/static/images/avatar/1.jpg',
    },
    {
      primary: 'Recipe to try',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      person: '/static/images/avatar/2.jpg',
    },
    {
      primary: 'Yes!',
      secondary: 'I have the tickets to the ReactConf for this year.',
      person: '/static/images/avatar/3.jpg',
    },
    {
      primary: "Doctor's Appointment",
      secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
      person: '/static/images/avatar/4.jpg',
    },
    {
      primary: 'Discussion',
      secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
      person: '/static/images/avatar/5.jpg',
    },
    {
      primary: 'Summer BBQ',
      secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
      person: '/static/images/avatar/1.jpg',
    },
  ];