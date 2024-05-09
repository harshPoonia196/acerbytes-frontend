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
function MyNotes() {
  const router = useRouter();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [list, setList] = useState({ rows: [], notesCount: 0 });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [searchTerm, setSearchTerm] = useState("");
  const [alignment, setAlignment] = useState('All');
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, alignment])

  function performSearch() {
    getList()
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  },

    { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    },

    getList = async () => {
      try {
        const { data: { data: { data = [], notesCount = 0 } } } = await getNotes({ search: searchTerm, alignment })
        setList({ rows: data, notesCount })
      } catch (error) {
        showToaterMessages(error.message, "error");
      }
    },

    handleOpenUpdatePopup = (isEdit = false, editData = null) => {
      setEditData(editData)
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
        showToaterMessages(ToasterMessages.NOTE_DELETED_SUCCESS, "success");
        getList()
      } catch (error) {
        showToaterMessages(error.message, "error");
      }
    }



  return (
    <>
      <CustomConsultantBreadScrumbs text="My notes" />
      <InfoBox
        dataList={[{ label: 'Notes', value: list?.notesCount ?? 0 }]}
        label={'My Notes'}
        button={<CustomButton
          variant="contained"
          size="small"
          onClick={() => handleOpenUpdatePopup()}
          ButtonText={"Add notes"}
        />}
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
        {/* <Card sx={{ mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            aria-label="Platform"
            sx={{ display: "flex" }}
          >
            <ToggleButton
              size="small"
              value="all"
              sx={{ flex: 1, border: "none" }}
              onClick={() => {
                router.push(listOfPages.consultantMyLeads);
              }}
            >
              All (10 static)
            </ToggleButton>
            <ToggleButton
              size="small"
              value="notes"
              sx={{ flex: 1, border: "none" }}
            >
              Notes (10 static)
            </ToggleButton>
          </ToggleButtonGroup>
        </Card> */}
        <MyLeadsStatus list={list.rows} searchTerm={searchTerm}
          handleSearch={handleSearch} alignment={alignment} handleChange={handleChange} handleOpenUpdatePopup={handleOpenUpdatePopup} onNoteDelete={onNoteDelete} />
      </Container>
    </>
  );
}

export default MyNotes;
