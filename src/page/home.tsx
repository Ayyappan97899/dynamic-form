import type { FC } from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppUserList from "../components/AppUserList";
import AppUserForm from "../components/AppUserForm";
import {
  useUsers,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from "../hooks/useUsers";
import type { User } from "../types";

const Home: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openUserForm, setOpenUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { data: users = [], isLoading } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const handleSaveUser = async (user: User) => {
    if (editingUser && user.id) {
      await updateMutation.mutateAsync({
        id: String(user.id),
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
        },
      });
      setEditingUser(null);
    } else {
      await createMutation.mutateAsync({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      });
    }
    setOpenUserForm(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setOpenUserForm(true);
  };

  const handleCloseForm = () => {
    setOpenUserForm(false);
    setEditingUser(null);
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            User Mgmt
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => setOpenUserForm(true)}
            variant="outlined"
            sx={{
              borderColor: "rgba(255,255,255,0.2)",
              fontSize: isMobile ? "0.75rem" : "0.875rem",
              px: isMobile ? 1 : 2,
            }}
          >
            {isMobile ? "Add" : "Add User"}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Stack spacing={{ xs: 2, sm: 3 }}>
          {/* Header Section */}
          <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              gap={{ xs: 1, sm: 2 }}
            >
              <Box>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{ fontWeight: 700 }}
                >
                  Users
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  Manage user details
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* User List Section */}
          <Paper elevation={0} sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
              }}
            >
              User list ({users.length})
            </Typography>
            {isLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={isMobile ? 40 : 60} />
              </Box>
            ) : (
              <AppUserList
                users={users}
                itemsPerPage={isMobile ? 3 : 6}
                onEdit={handleEditUser}
                onDelete={(id) => id && deleteMutation.mutate(String(id))}
              />
            )}
          </Paper>
        </Stack>
      </Container>

      {/* User Form Modal */}
      <AppUserForm
        open={openUserForm}
        onClose={handleCloseForm}
        onSave={handleSaveUser}
        initialValues={editingUser || undefined}
      />
    </>
  );
};

export default Home;
