import { Box, TextField } from "@mui/material";

const SectionForm = (sections, type, handleChange) => sections
    .map(section => (
    <Box key={`${type}-section-${section.id}`}>
      <TextField
        label="Name"
        variant="outlined"
        onChange={(event) => { handleChange(event, `${type}Sections`, section.id) }}
        value={section.name !== null ? section.name : ''}
        placeholder="Enter section name..."
      />
    </Box>
  ))

  export default SectionForm;