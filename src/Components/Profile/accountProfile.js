import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

export default function AccountProfile(props) {
  const { values } = props;

  const { firstName, lastName, email, phone, state, country } = values;

  const user = {
    avatar: "assignment/src/Components/Profile/shubham.jpeg",
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 94,
              mb: 9,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h4">
            {firstName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${state} ${country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            IST
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {phone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions></CardActions>
    </Card>
  );
}
