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
  CardMedia,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { SvgIcon } from "@material-ui/core";

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
  const { avatarUrl, imageUrl, title, price, description } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar src={avatarUrl}/>
        }
        action={
          <IconButton aria-label="Settings">
            <ShareIcon />
          </IconButton>
        }
        title={title}
        subheader={price}
      />
      <CardMedia style={{ height: "150px" }} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy Now</Button>
        <Button size="small">Offer</Button>
      </CardActions>
    </Card>
  );
};

export default CoffeeCard;
