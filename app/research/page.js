import {
  Accordion,
  AccordionSummary,
  Typography,
  Button,
  AccordionDetails,
  Grid,
  Container,
  Card,
  Rating,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import colors from "styles/theme/colors";

function Research() {
  return (
    <Container maxWidth="evmd">
      <Accordion>
        <AccordionSummary
          sx={{ minHeight: "48px !important" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="body1"
            sx={{ flex: 1, alignSelf: "center", fontWeight: 700 }}
          >
            Godrej woods, Sector 13, Noida
          </Typography>
          <Box sx={{ alignSelf: "center" }}>
            <Card
              sx={{
                width: "fit-content",
                backgroundColor: colors?.BLACK,
                borderRadius: "4px !important",
                m: 0,
                ml: "auto !important",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  width: "fit-content",
                  color: "white",
                  p: 0.5,
                  px: 1,
                  cursor: "pointer",
                }}
              >
                43
              </Typography>
            </Card>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 !important",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  sx={{ minHeight: "48px !important" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: 500 }}
                  >
                    Location
                  </Typography>
                  <Card
                    sx={{
                      width: "fit-content",
                      backgroundColor: "#000",
                      borderRadius: "4px !important",
                      m: 0,
                      ml: "auto !important",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        width: "fit-content",
                        color: "white",
                        p: 0.5,
                        px: 1,
                      }}
                    >
                      43
                    </Typography>
                  </Card>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "0 !important",
                  }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <Card sx={{ p: 2, py: 1, display: "flex" }}>
                        <Typography
                          variant="caption"
                          sx={{ flex: 1, alignSelf: "center" }}
                        >
                          Location 1
                        </Typography>
                        <Rating
                          name="read-only"
                          size="small"
                          value={4}
                          readOnly
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card sx={{ p: 2, py: 1, display: "flex" }}>
                        <Typography
                          variant="caption"
                          sx={{ flex: 1, alignSelf: "center" }}
                        >
                          Location 1
                        </Typography>
                        <Rating
                          name="read-only"
                          size="small"
                          value={4}
                          readOnly
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card sx={{ p: 2, py: 1, display: "flex" }}>
                        <Typography
                          variant="caption"
                          sx={{ flex: 1, alignSelf: "center" }}
                        >
                          Location 1
                        </Typography>
                        <Rating
                          name="read-only"
                          size="small"
                          value={4}
                          readOnly
                        />
                      </Card>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  sx={{ minHeight: "48px !important" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: 500 }}
                  >
                    Value for money
                  </Typography>
                  <Card
                    sx={{
                      width: "fit-content",
                      backgroundColor: "#000",
                      borderRadius: "4px !important",
                      m: 0,
                      ml: "auto !important",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        width: "fit-content",
                        color: "white",
                        p: 0.5,
                        px: 1,
                      }}
                    >
                      43
                    </Typography>
                  </Card>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "0 !important",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  sx={{ minHeight: "48px !important" }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: 500 }}
                  >
                    Builder
                  </Typography>
                  <Card
                    sx={{
                      width: "fit-content",
                      backgroundColor: "#000",
                      borderRadius: "4px !important",
                      m: 0,
                      ml: "auto !important",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        width: "fit-content",
                        color: "white",
                        p: 0.5,
                        px: 1,
                      }}
                    >
                      43
                    </Typography>
                  </Card>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "0 !important",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Research;
