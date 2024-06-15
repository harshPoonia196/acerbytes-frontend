import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Container,
  Card,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { useRouter } from "next/navigation";
import { getBrokerCityList, getBrokersList } from "api/Admin.api";
import { debounce } from "lodash";
import { DEBOUNCE_TIMER, SORTING } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import RowStructure from "./ManageColumnRowStructure";
import EnhancedTableHead from "./EnhancedManageConsultant";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import SelectTextFields from "Components/CommonLayouts/SelectTextFields";

function ManageConsultantTable({ user }) {
  const router = useRouter();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [consultantList, setConsultantList] = useState({
    rows: [],
    totalCount: 0,
  });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [city, setCity] = useState("all");

  useEffect(() => {
    getList();
  }, [rowsPerPage, page, city]);

  useEffect(() => {
    if (initialMount) {
      brokerCityList();
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const { openSnackbar } = useSnackbar(),
    showTostMessages = (message, severity) => {
      openSnackbar(message, severity);
    };

  const getList = async () => {
    try {
      const {
        data: {
          data: { data = [], totalCount = 0 },
        },
        status,
      } = await getBrokersList(rowsPerPage, page, searchTerm, city);
      setConsultantList({ rows: data, totalCount });
    } catch (error) {
      showTostMessages(error.message, "error");
    }
  };

  const brokerCityList = async () => {
    try {
      const {
          data: {
            data: { data = [] },
          },
          status,
        } = await getBrokerCityList(),
        cities = [{ label: "All", value: "all" }];
      for (let i = 0; i < data.length; i++) {
        const city_data = { label: data[i], value: data[i] };
        cities.push(city_data);
      }
      setCitiesOptions(cities);
    } catch (error) {
      showTostMessages(error.message, "error");
    }
  };

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
    getList();
  }

  const handleSearch = (event) => {
      const term = event.target.value.toLowerCase();
      setPage(0);
      setSearchTerm(term);
    },
    handleCityChange = (event) => {
      setPage(0);
      setCity(event.target.value);
    };

  return (
    <>
      <InfoBox
        dataList={[{ label: "Consultants", value: consultantList.totalCount }]}
      />

      <Container>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Card>
              <CustomSearchInput value={searchTerm} onChange={handleSearch} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <SelectTextFields
              sx={{ border: "none" }}
              // isEdit={true}
              label="Select City"
              name={"city"}
              value={city}
              handleChange={(e) => handleCityChange(e)}
              list={citiesOptions}
            />
          </Grid>
        </Grid>

        {!!consultantList.rows.length ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {consultantList.rows.map((row) => (
                  <RowStructure row={row} router={router} user={user} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                overflow: "hidden",
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
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
