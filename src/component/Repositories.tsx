import React, { useEffect, useState } from "react";

import {
  TextField,
  TablePagination,
  Container,
  Typography,
  List,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import useRepositories from "hook/useRepositories";
import RepositoriesNode from "./RepositoriesNode";

const Repositories = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pages: 0,
    rowsPerPage: 10,
  });

  const { repositories, totalCount } = useRepositories(
    search,
    pagination.pages + 1,
    pagination.rowsPerPage,
    1000
  );

  useEffect(() => {
    console.log(repositories);
  }, [repositories]);

  return (
    <Container>
      <Typography
        variant="h1"
        sx={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.01562em",
          textAlign: "center",
          margin: "20px 0px",
        }}
      >
        Github repository screener
      </Typography>
      <TextField
        sx={{ margin: "20px 0px" }}
        fullWidth
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        placeholder="Search your repository here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {repositories.length > 0 && (
        <>
          <List>
            {repositories.map((repository) => (
              <RepositoriesNode key={repository.id} repository={repository} />
            ))}
          </List>
          <TablePagination
            count={totalCount}
            page={pagination.pages}
            onPageChange={(e, page) =>
              setPagination({ ...pagination, pages: page })
            }
            rowsPerPage={pagination.rowsPerPage}
            onRowsPerPageChange={(e) => {
              setPagination({ pages: 0, rowsPerPage: +e.target.value });
            }}
          />
        </>
      )}
    </Container>
  );
};

export default Repositories;
