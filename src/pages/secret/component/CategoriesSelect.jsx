
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

function CategoriesSelect({ allCategories, edited, setEdited, errors, formatMessage }) {
  return (
    <Autocomplete
      multiple
      options={allCategories}
      value={edited.categories || []}
      onChange={(event, newValue) =>
        setEdited({ ...edited, categories: newValue })
      }
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={formatMessage({ id: 'categories' })}
          error={!!errors.categories}
          helperText={errors.categories}
        />
      )}
    />
  );
}

export default CategoriesSelect;