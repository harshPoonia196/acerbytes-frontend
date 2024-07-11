import React, { useRef } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  Tooltip,
  Fade,
} from "@mui/material";

import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import { useState } from "react";
import colors from "styles/theme/colors";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadMarketingImage from "Components/Admin/Property/Modal/UploadMarketingImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ImageCard({ isEdit, errors, form, handleChange }) {
  const imageDoc = `image at least 200x200 pixels, Image aspect ratio of 1:1, file size under 300 KB`;

  const { tagLine, description, image, metaDescription, logoImage } = form.marketing;
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const handleOpenUploadPopup = () => {
    setIsUploadPopupOpen(true);
  };

  const handleCloseUploadPopup = () => {
    setIsUploadPopupOpen(false);
  };

  const [selectedImage, setImage] = useState("");
  const fileInputRef = useRef(null);
  const fileInputLogoRef = useRef(null);

  const handleImageSelect = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    handleOpenUploadPopup();
  };

  const handleImageRemove = () => {
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleCloseUploadPopup();
  };

  return (
    <Grid item xs={12} id="marketing">
      <UploadMarketingImage
        open={isUploadPopupOpen}
        image={selectedImage}
        setImage={setImage}
        onClose={handleCloseUploadPopup}
        handleClose={handleCloseUploadPopup}
        changeImage={handleImageSelect}
        handleChange={handleChange}
        removeImage={handleImageRemove}
      />
      <Card>
        <Box sx={{ display: "flex", p: 2, py: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
          >
            Marketing
          </Typography>
        </Box>
        <Divider />
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            {image && (
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The Property image"
                src={image}
              />
            )}
            <Tooltip
              title={imageDoc}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Card sx={{ display: "flex", p: 2 }}>
                <Typography sx={{ flex: 1, alignSelf: "center" }}>
                  Upload
                </Typography>

                <>
                  <input
                    id="contained-button-file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/x-png,image/gif,image/jpeg"
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<AttachFileIcon />}
                      >
                        Banner Image
                      </Button>
                    </label>
                  </div>
                </>
              </Card>
            </Tooltip>
          </Grid>
          <NewInputFieldStructure
            isRequired={true}
            label="Tag line"
            variant="outlined"
            isEdit={isEdit}
            isFull
            error={errors?.["marketing.tagLine"]}
            value={tagLine}
            handleChange={(e) => handleChange(e, "marketing", "tagLine")}
          />
          <NewInputFieldStructure
            isRequired={true}
            label="Description"
            variant="outlined"
            isEdit={isEdit}
            multiline
            rows={2}
            isFull
            error={errors?.["marketing.description"]}
            value={description}
            handleChange={(e) => handleChange(e, "marketing", "description")}
          />
          <Grid item xs={12} sm={12}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
              >
                Meta Description
              </Typography>
            </Box>
            <Box>
              <ReactQuill
                theme="snow"
                value={decodeURIComponent(metaDescription)}
                onChange={(data) => {
                  handleChange(
                    { target: { value: data } },
                    "marketing",
                    "metaDescription"
                  );
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {logoImage && (
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The Property image"
                src={logoImage}
              />
            )}
            <Tooltip
              title={imageDoc}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Card sx={{ display: "flex", p: 2 }}>
                <Typography sx={{ flex: 1, alignSelf: "center" }}>
                  Upload
                </Typography>

                <>
                  <input
                    id="contained-button-file"
                    type="file"
                    ref={fileInputLogoRef}
                    onChange={handleImageSelect}
                    accept="image/x-png,image/gif,image/jpeg"
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<AttachFileIcon />}
                      >
                        Logo Image
                      </Button>
                    </label>
                  </div>
                </>
              </Card>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default React.memo(ImageCard);
