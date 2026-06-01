import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { fetchOrchids, addOrchid, editOrchid, removeOrchid, selectAllOrchids, selectOrchidStatus } from "../store/orchidSlice";
import { selectAuth } from "../store/authSlice";
import ListOfOrchids from "../data/ListOfOrchids";
import OrchidForm from "../components/OrchidForm";
import GoogleLogin from "../components/GoogleLogin";

function ManagePage() {
  const dispatch = useDispatch();
  const orchids = useSelector(selectAllOrchids);
  const status = useSelector(selectOrchidStatus);
  const { isLoggedIn } = useSelector(selectAuth);
  const [showForm, setShowForm] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrchids()).catch(() => {});
    }
  }, [dispatch, isLoggedIn]);

  // Use local data as fallback when API has no data
  const displayOrchids = orchids.length > 0 ? orchids : ListOfOrchids;

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      await dispatch(addOrchid(values)).unwrap();
      setShowForm(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
    setLoading(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      await dispatch(editOrchid({ id: editingOrchid.id, data: values })).unwrap();
      setEditingOrchid(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this orchid?")) {
      try {
        await dispatch(removeOrchid(id)).unwrap();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          🔒 Orchid Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please login with Google to manage orchids
        </Typography>
        <GoogleLogin />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h4" fontWeight={800}>📋 Manage Orchids</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setShowForm(true); setEditingOrchid(null); }}
            sx={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              fontWeight: 600, textTransform: "none", borderRadius: 2,
            }}
          >
            Add Orchid
          </Button>
        </Box>
      </Box>

      {status === "failed" && (
        <Alert severity="info" sx={{ mb: 2 }}>
          ⚡ API not available — showing local data. CRUD changes won't be saved to the server.
        </Alert>
      )}

      {status === "loading" && (
        <Alert severity="info" sx={{ mb: 2 }}>Loading orchids from API...</Alert>
      )}

      {/* Form section */}
      {(showForm || editingOrchid) && (
        <Paper elevation={0} sx={{ p: 3, mb: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
          <OrchidForm
            initialValues={editingOrchid}
            onSubmit={editingOrchid ? handleEdit : handleAdd}
            loading={loading}
          />
          <Button onClick={() => { setShowForm(false); setEditingOrchid(null); }}
            sx={{ mt: 1, color: "text.secondary" }}>
            Cancel
          </Button>
        </Paper>
      )}

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Origin</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tags</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrchids.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No orchids found. Add one to get started!
                </TableCell>
              </TableRow>
            ) : (
              displayOrchids.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>
                    <Box component="img" src={o.image} alt={o.name}
                      sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{o.name}</TableCell>
                  <TableCell>{o.origin}</TableCell>
                  <TableCell>{o.category}</TableCell>
                  <TableCell>{"★".repeat(Math.min(o.rating, 5)) + "☆".repeat(Math.max(5 - o.rating, 0))}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {o.isSpecial && <Chip label="✦" size="small" color="warning" sx={{ minWidth: 28 }} />}
                      {o.isNatural && <Chip label="🌿" size="small" color="success" sx={{ minWidth: 28 }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => setEditingOrchid(o)} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(o.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ManagePage;
