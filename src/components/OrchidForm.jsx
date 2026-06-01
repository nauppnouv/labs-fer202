import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box, TextField, Button, Typography, MenuItem, Stack, CircularProgress,
} from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(2, "At least 2 characters"),
  origin: Yup.string().required("Origin is required"),
  color: Yup.string().required("Color is required"),
  category: Yup.string().required("Category is required"),
  rating: Yup.number().min(1, "Min 1").max(5, "Max 5").required("Rating is required"),
  numberOfLike: Yup.number().min(0, "Can't be negative").required("Likes is required"),
  image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  isSpecial: Yup.boolean(),
  isNatural: Yup.boolean(),
  description: Yup.string(),
});

const colors = ["pink", "yellow", "blue", "white", "purple", "red", "orange", "green", "brown", "black"];
const categories = ["Cattleya", "Dendrobium", "Phalaenopsis", "Cymbidium"];
const ratings = [1, 2, 3, 4, 5];

function OrchidForm({ initialValues, onSubmit, loading }) {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      origin: "",
      color: "",
      category: "",
      rating: 3,
      numberOfLike: 0,
      image: "",
      isSpecial: false,
      isNatural: false,
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      if (!initialValues) resetForm();
    },
    enableReinitialize: true,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {initialValues ? "✏️ Edit Orchid" : "➕ Add New Orchid"}
      </Typography>

      <Stack spacing={2.5} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Name" name="name" size="small"
            value={formik.values.name} onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField fullWidth label="Origin" name="origin" size="small"
            value={formik.values.origin} onChange={formik.handleChange}
            error={formik.touched.origin && !!formik.errors.origin}
            helperText={formik.touched.origin && formik.errors.origin}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField select fullWidth label="Color" name="color" size="small"
            value={formik.values.color} onChange={formik.handleChange}
            error={formik.touched.color && !!formik.errors.color}
            helperText={formik.touched.color && formik.errors.color}
          >
            {colors.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField select fullWidth label="Category" name="category" size="small"
            value={formik.values.category} onChange={formik.handleChange}
            error={formik.touched.category && !!formik.errors.category}
            helperText={formik.touched.category && formik.errors.category}
          >
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField select fullWidth label="Rating" name="rating" size="small"
            value={formik.values.rating} onChange={formik.handleChange}
            error={formik.touched.rating && !!formik.errors.rating}
            helperText={formik.touched.rating && formik.errors.rating}
          >
            {ratings.map((r) => <MenuItem key={r} value={r}>{r} ★</MenuItem>)}
          </TextField>
          <TextField fullWidth label="Likes" name="numberOfLike" type="number" size="small"
            value={formik.values.numberOfLike} onChange={formik.handleChange}
            error={formik.touched.numberOfLike && !!formik.errors.numberOfLike}
            helperText={formik.touched.numberOfLike && formik.errors.numberOfLike}
          />
        </Stack>

        <TextField fullWidth label="Image URL" name="image" size="small"
          value={formik.values.image} onChange={formik.handleChange}
          error={formik.touched.image && !!formik.errors.image}
          helperText={formik.touched.image && formik.errors.image}
        />

        <TextField fullWidth label="Description" name="description" size="small" multiline rows={3}
          value={formik.values.description} onChange={formik.handleChange}
        />

        <Stack direction="row" spacing={3}>
          <label>
            <input type="checkbox" name="isSpecial" checked={formik.values.isSpecial}
              onChange={formik.handleChange} /> ✦ Special
          </label>
          <label>
            <input type="checkbox" name="isNatural" checked={formik.values.isNatural}
              onChange={formik.handleChange} /> 🌿 Natural
          </label>
        </Stack>

        <Button type="submit" variant="contained" disabled={loading} sx={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          fontWeight: 600, textTransform: "none", borderRadius: 2, py: 1.2,
        }}>
          {loading ? <CircularProgress size={24} /> : initialValues ? "Update Orchid" : "Add Orchid"}
        </Button>
      </Stack>
    </Box>
  );
}

export default OrchidForm;
