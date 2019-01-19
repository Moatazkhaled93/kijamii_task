import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link, Route, Switch } from 'react-router-dom';
const styles = theme => ({
  root: {
    width: '100%',
  }, table: {
    minWidth: 700,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  grow: {
    flexGrow: 1,
  }, TableCell: {
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class TemporaryDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tvmazes: [],
      personal: [],
      film: [],
      
      url: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    
if(this.state.url ==''){
  this.setState({ url: 'http://api.tvmaze.com/search/shows?q=' });
 
}
    axios.get(this.state.url + e.target.value)
      .then((response) => {
       if(this.state.url =='http://api.tvmaze.com/search/shows?q=') {
         this.setState({ tvmazes: response.data });}
         else{
          this.setState({ personal: response.data });

         }
      })
      .catch((err) => {

      });
  }
  handleClickOpen = (e) => {
    this.setState({ open: true });
    axios.get(`http://api.tvmaze.com/shows/` + e.target.value)
      .then((response) => {
        this.setState({ film: response.data });
      })
      .catch((err) => {

      });
  };
  handleClickOpenpersonal = (e) => {
    this.setState({ open: true });
    axios.get(`http://api.tvmaze.com/shows/` + e.target.value)
      .then((response) => {
        this.setState({ film: response.data });
      })
      .catch((err) => {

      });
  };
  personalFunction= () =>{
    this.setState({ url: 'http://api.tvmaze.com/search/people?q=' });
  };
 homeFunction= () =>{
    this.setState({ url: 'http://api.tvmaze.com/search/shows?q=' });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  personal = (classes) => (
      <div>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell align="right">Image</TableCell>
              <TableCell>Name (URL)</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Birthday</TableCell>
              <TableCell align="right">Country</TableCell>
      
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.personal.map((row) => {
              return (
                <TableRow >
                  
                  {row.person.image ? <TableCell component="th" scope="row"><img src={row.person.image.medium} height="70px" width="60px"/> </TableCell>:
                  <TableCell component="th" scope="row">
                 <img height="70px" width="60px" src="data:image/png;base64,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" />
</TableCell>}
                <TableCell align="right">   <a target="_blank" href={row.person.url}>{row.person.name}</a></TableCell>
      
                  <TableCell align="right">{row.person.gender}</TableCell>
                  <TableCell align="right">{row.person.birthday} </TableCell>

                 {row.person.country ? <TableCell align="right">{row.person.country.name}</TableCell>:<TableCell align="right">Not Found</TableCell>}

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
        )
  Home = (classes) => (
    <div>
    <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell>Name (URL)</TableCell>
        <TableCell align="right">Type (lng)</TableCell>
        <TableCell align="right">Site</TableCell>
        <TableCell align="right">Status</TableCell>
        <TableCell align="right">Show</TableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      {this.state.tvmazes.map((row) => {
        return (
          <TableRow >
            <TableCell component="th" scope="row">
              <a target="_blank" href={row.show.url}>{row.show.name}</a></TableCell>

            <TableCell align="right">{row.show.type}({row.show.language})</TableCell>
            <TableCell align="right"><a target="_blank" href={row.show.officialSite}>{row.show.name}</a> </TableCell>
            <TableCell align="right">{row.show.status}</TableCell>
            <TableCell>      <Button variant="contained" onClick={this.handleClickOpen} value={row.show.id}
              color="primary" className={classes.button}>
              Show
</Button></TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
  <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                DETILS
              </Typography>

            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              {this.state.film.image ? <img src={this.state.film.image.medium} /> : <img src="data:image/png;base64,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" />}
              <ListItemText primary="Name" secondary={this.state.film.name} />
              {this.state.film.network ? <ListItemText primary="Country" secondary={this.state.film.network.country.name} /> : <ListItemText primary="Country" secondary="Dont Know" />}
              {this.state.film.rating ? <ListItemText primary="Rating" secondary={this.state.film.rating.average} /> : <ListItemText primary="Rating" secondary="0" />}
              {this.state.film.schedule ? <ListItemText primary="Day" secondary={this.state.film.schedule.days} /> : <ListItemText primary="Day" secondary="day" />}
              {this.state.film.schedule ? <ListItemText primary="Time" secondary={this.state.film.schedule.time} /> : <ListItemText primary="Time" secondary="00:00 " />}



            </ListItem>
            <Divider />

          </List>
        </Dialog>
 </div>
  )

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickM}
            >
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>        </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >

            </Menu>

            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              KIJAMII TASK          </Typography>

            <ul className="nav navbar-nav">
              <li onClick={this.homeFunction} ><Link to="/Home">Home</Link></li>
            </ul>
            <ul className="nav navbar-nav">
              <li onClick={this.personalFunction}><Link to="/personal">personal</Link></li>
            </ul>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search…"
                onChange={this.handleClick}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>


        <Route path="/Home" component={this.Home}/>
        <Route path="/personal" component={this.personal}/>


      </div>


    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);


