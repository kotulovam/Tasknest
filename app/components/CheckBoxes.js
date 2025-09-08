import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

export default function CheckBoxes({ checked, onChange }) {
  return (
    <Checkbox
      checked={!!checked}
      onClick={(e) => e.stopPropagation()}
      onChange={onChange}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="16"
            height="16"
            rx="4"
            ry="4"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      }
      checkedIcon={<CheckIcon sx={{ color: '#9966CC' }} />}
    />
  );
};

