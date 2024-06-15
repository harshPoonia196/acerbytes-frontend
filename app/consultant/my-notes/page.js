"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Grid,
} from "@mui/material";
import UpdateLeadStatus from "Components/Consultant/ConsultantLeads/Modal/UpdateLeadStatus";
import MyLeadsStatus from "Components/Consultant/ConsultantLeads/MyLeadsStatus";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useSnackbar } from "utills/SnackbarContext";
import { deleteNote, getNotes } from "api/Broker.api";
import { DEBOUNCE_TIMER, NOTES_TYPE, ToasterMessages } from "utills/Constants";
import { debounce } from "lodash";
import NoteSubscription from "./NoteSubscription";
import AddIcon from "@mui/icons-material/Add";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

function MyNotes() {
  const router = useRouter();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [list, setList] = useState({
    rows: [],
    notesCount: 0,
    showSubscribeButton: false,
    needSubscribe: false,
  });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [searchTerm, setSearchTerm] = useState("");
  const [alignment, setAlignment] = useState("All");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [consultantsDialog, setConsultantsDialog] = useState(false);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, alignment]);

  function performSearch() {
    getList();
  }

  const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    },
    { openSnackbar } = useSnackbar(),
    showTostMessages = (message, severity) => {
      openSnackbar(message, severity);
    },
    getList = async () => {
      try {
        const {
          data: {
            data: {
              data = [],
              notesCount = 0,
              showSubscribeButton = false,
              needSubscribe = false,
            },
          },
        } = await getNotes({ search: searchTerm, alignment });
        setList({ rows: data, notesCount, showSubscribeButton, needSubscribe });
      } catch (error) {
        showTostMessages(error.message, "error");
      }
    },
    handleOpenUpdatePopup = (isEdit = false, editData = null) => {
      setEditData(editData);
      setIsEdit(isEdit);
      setTimeout(() => {
        setOpenUpdatePopup(true);
      });
    },
    handleCloseUpdatePopup = () => {
      setOpenUpdatePopup(false);
    },
    handleSearch = (event) => {
      const term = event.target.value.toLowerCase();
      setSearchTerm(term);
    },
    onNoteDelete = async (id) => {
      try {
        const res = await deleteNote(id);
        showTostMessages(ToasterMessages.NOTE_DELETED_SUCCESS, "success");
        getList();
      } catch (error) {
        showTostMessages(error.message, "error");
      }
    },
    handleCloseConsultantDetails = () => {
      setConsultantsDialog(false);
    };

  return (
    <>
      <CustomConsultantBreadScrumbs text="My notes" />
      <InfoBox
        dataList={[{ label: "Notes", value: list?.notesCount ?? 0 }]}
        label={"My Notes"}
        button={
          <div style={{ display: "flex", gap: "10px" }}>
            {!list.showSubscribeButton && (
              <CustomButton
                startIcon={<SubscriptionsIcon fontSize="small" />}
                variant="contained"
                size="small"
                onClick={() => {
                  setConsultantsDialog(true);
                }}
                ButtonText={"Subscribe"}
              />
            )}

            {!list?.needSubscribe && (
              <CustomButton
                startIcon={<AddIcon />}
                variant="contained"
                size="small"
                onClick={() => handleOpenUpdatePopup()}
                ButtonText={"Add Notes"}
              />
            )}
          </div>
        }
      />
      <Container>
        <UpdateLeadStatus
          isEdit={isEdit}
          editData={editData}
          open={openUpdatePopup}
          handleClose={handleCloseUpdatePopup}
          getList={getList}
          setIsEdit={setIsEdit}
        />
        <NoteSubscription
          open={consultantsDialog}
          handleClose={handleCloseConsultantDetails}
          getList={getList}
        />
        <MyLeadsStatus
          list={list}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          alignment={alignment}
          handleChange={handleChange}
          handleOpenUpdatePopup={handleOpenUpdatePopup}
          onNoteDelete={onNoteDelete}
        />
      </Container>
    </>
  );
}

export default MyNotes;
