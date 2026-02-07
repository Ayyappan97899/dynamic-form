import type { FC } from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Pagination,
  Stack,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { User } from "../types";

interface AppUserListProps {
  users: User[];
  itemsPerPage?: number;
  onDelete?: (id?: string) => void;
  onEdit?: (user: User) => void;
  loading?: boolean;
}

const AppUserList: FC<AppUserListProps> = ({
  users,
  itemsPerPage = 6,
  onDelete,
  onEdit,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {users.length > 0 ? (
        <>
          <Stack spacing={{ xs: 1.5, sm: 2 }}>
            {currentUsers.map((user) => (
              <Card
                key={user.id}
                sx={{
                  boxShadow: 1,
                  "&:hover": { boxShadow: 3 },
                  transition: "all 0.2s",
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    gap={{ xs: 1, sm: 2 }}
                  >
                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.95rem", sm: "1.1rem" },
                          wordBreak: "break-word",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        <strong>Phone:</strong>{" "}
                        <a
                          href={`tel:${user.phone}`}
                          style={{ color: "inherit" }}
                        >
                          {user.phone}
                        </a>
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          mt: 0.25,
                          display: "block",
                          wordBreak: "break-word",
                        }}
                      >
                        <strong>Email:</strong>{" "}
                        <a
                          href={`mailto:${user.email}`}
                          style={{ color: "inherit" }}
                        >
                          {user.email}
                        </a>
                      </Typography>
                    </Box>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                      <Button
                        size={isMobile ? "small" : "medium"}
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => onEdit?.(user)}
                        fullWidth={isMobile}
                        variant="outlined"
                      >
                        {isMobile ? "Edit" : "Edit"}
                      </Button>
                      <Button
                        size={isMobile ? "small" : "medium"}
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete?.(user.id)}
                        fullWidth={isMobile}
                        variant="outlined"
                      >
                        {isMobile ? "Delete" : "Delete"}
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                overflow: "auto",
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
          No users found
        </Typography>
      )}
    </Box>
  );
};

export default AppUserList;
