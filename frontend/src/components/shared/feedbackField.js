import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const FeedbackField = (props) => {
  const response = props.response;

  if (response == null) return;

  switch (response.status) {
    case 201:
      return (
        <Box marginBottom={2}>
          <Alert severity="success">User has been created</Alert>
        </Box>
      );
    case 422:
      return (
        <Box marginBottom={2}>
          <Alert severity="error">Some fields are missing</Alert>
        </Box>
      );
    case 401:
      return (
        <Box marginBottom={2}>
          <Alert severity="error">Invalid credentials</Alert>
        </Box>
      );
    default:
      return (
        <Box marginBottom={2}>
          <Alert severity="error">{response.data.error}</Alert>
        </Box>
      );
  }
};
