import React, { useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import { useState } from "react";

export default function GlobitsRadioCustom(props) {
  const { onChange, value, name, selectedValue } = props;

  return (
    <div>
      <Radio
        checked={selectedValue == value}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        name={name}
      />
    </div>
  );
}
