import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as GoogleIcon } from "./google-icon.svg";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CoffeeCard = (props) => {
  const classes = useStyles();
  const bullet = <span className={classes.bullet}>•</span>;
  const { avatarSrc, imgSrc, title, subtitle, description } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <IconButton>
              <GoogleIcon width="24px" height="24px"/>
          </IconButton>
        }
        action={
          <IconButton aria-label="Settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bullet}nev{bullet}o{bullet}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          "a benevolent smile"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CoffeeCard;
