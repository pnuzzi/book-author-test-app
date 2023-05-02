import { observer } from "mobx-react";
import * as React from "react";

import styled from "styled-components";

interface Props {}

export const Error404 = observer(function (props: Props) {
  return (
    <div>
      <h1>404 Error</h1>
    </div>
  );
});
