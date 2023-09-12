import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <a href="/details">Redirect to details page</a>
      <br />
      <a href="/brokers">Redirect to brokers page</a>
      <br />
      <a href="/property-list">Redirect to property list page</a>
      <Typography variant="h1">h1</Typography>
      <Typography variant="h2">h2</Typography>
      <Typography variant="h3">h3</Typography>
      <Typography variant="h4">h4</Typography>
      <Typography variant="h5">h5</Typography>
      <Typography variant="h6">h6</Typography>
      <Typography variant="subtitle1">subtitle1</Typography>
      <Typography variant="subtitle2">subtitle2</Typography>
      <Typography variant="body1">body1</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography variant="button" display="block">
        button
      </Typography>
      <Typography variant="caption" display="block">
        caption
      </Typography>
      <Typography variant="overline" display="block">
        overline
      </Typography>
    </main>
  );
}
