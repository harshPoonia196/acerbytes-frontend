import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <a href="/details">Redirect to details page</a>
      <Typography variant="h1">Typography test</Typography>
      <Typography variant="h2">Typography test</Typography>
      <Typography variant="h3">Typography test</Typography>
      <Typography variant="h4">Typography test</Typography>
      <Typography variant="h5">Typography test</Typography>
      <Typography variant="h6">Typography test</Typography>
      <Typography variant="subtitle1">Typography test</Typography>
      <Typography variant="subtitle2">Typography test</Typography>
      <Typography variant="body1">Typography test</Typography>
      <Typography variant="body2">Typography test</Typography>
      <Typography variant="button" display="block">
        Typography test
      </Typography>
      <Typography variant="caption" display="block">
        Typography test
      </Typography>
      <Typography variant="overline" display="block">
        Typography test
      </Typography>
    </main>
  );
}
