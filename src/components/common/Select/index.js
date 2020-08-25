import React from 'react';
import PropTypes from 'prop-types';

import {
  FormControl, InputLabel, MenuItem, Select as MuiSelect,
} from '@material-ui/core';

const Select = ({
  name, id, value, options, onChange, label,
}) => (
  <FormControl margin="normal" fullWidth>
    <InputLabel htmlFor="license-type">{label}</InputLabel>
    <MuiSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{
        name,
        id,
      }}
    >
      {
        options.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
      }
    </MuiSelect>
  </FormControl>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
