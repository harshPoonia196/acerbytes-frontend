import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Container,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { useRouter } from "next/navigation";
import { getBrokersList } from "api/Admin.api";
import { debounce } from "lodash";
import {
  DEBOUNCE_TIMER, SORTING
} from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import RowStructure from "./ManageColumnRowStructure";
import EnhancedTableHead from "./EnhancedManageConsultant";

function ManageConsultantTable({user}) {
  const router = useRouter();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [consultantList, setConsultantList] = useState({ rows: [], totalCount: 0 });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getList()
  }, [rowsPerPage, page])

  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm])

  const { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    };

  const getList = async () => {
    try {
      const { data: { data: { data = [], totalCount = 0 } }, status } = await getBrokersList(rowsPerPage, page, searchTerm)
      setConsultantList({ rows: data, totalCount })
    } catch (error) {
      showToaterMessages(error.message, "error");
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === SORTING.asc;
    setOrder(isAsc ? SORTING.desc : SORTING.asc);
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function performSearch() {
    getList()
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };


  return (
    <>
      <InfoBox
        dataList={[{ label: 'Consultants', value: consultantList.totalCount }]}
      />

      <Container>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={searchTerm}
            onChange={handleSearch}
          />
        </Card>

        {!!consultantList.rows.length ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {consultantList.rows.map((row) => (
                  <RowStructure row={row} router={router} user={user}/>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                overflow: "hidden",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={consultantList.totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <NoDataCard title={"No data found"} />
        )}
      </Container>
    </>
  );
}

export default ManageConsultantTable;
