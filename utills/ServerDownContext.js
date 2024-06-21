"use client"
import React, { createContext, useState, useContext, useEffect } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import Logo from "public/images/icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";


const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [openModal, setOpenModal] = useState(localStorage.getItem("serverDown"))

    const router = useRouter()

    const showModal = (message) => {
        setOpenModal(true);
    };

    useEffect(() => {
        localStorage.removeItem("serverDown");
        window.dispatchEvent(new Event("localeUpdated"));
    
        const handleLocaleUpdated = () => {
            if(localStorage.getItem("serverDown") === "true"){
                setOpenModal(true);
            }
            else{
                setOpenModal(false);
            }
        };
    
        window.addEventListener('localeUpdated', handleLocaleUpdated);
    
        return () => {
          window.removeEventListener('localeUpdated', handleLocaleUpdated);
        };
      }, []);
    
    const handleClose = () => {
        setOpenModal(false);
        localStorage.removeItem("serverDown")
        window.dispatchEvent(new Event("localeUpdated"));
    };

    return (
        <ModalContext.Provider value={showModal}>
            {children}
            <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
                open={openModal} onClose={handleClose}>
                <Box sx={{ display: 'flex', padding: '20px', width: '350px', gap: '25px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', borderBottom: '1px solid rgba(0,0,0,0.2)', pb: 1, width: '100%' }}>
                        <Image
                            priority
                            height={25}
                            width={25}
                            src={Logo}
                            style={{ margin: "2.5px" }}
                            alt="acrebytes"
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#000",
                                fontSize: "1rem",
                                fontWeight: 600,
                                lineHeight: 1,
                                textTransform: "uppercase",
                                alignSelf: "center",
                            }}
                        >ACREBYTES</Typography>
                    </Box>
                    <Typography variant="h3">Error</Typography>
                    <Typography sx={{ textAlign: 'center' }}>Service is temporary unavailable!</Typography>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Button onClick={()=> window.location.reload()} variant="contained">Refresh</Button>
                    </Box>
                </Box>
            </Dialog>
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

export const showModal = () => {
    localStorage.setItem("serverDown", true)
    window.dispatchEvent(new Event("localeUpdated"));
}

