import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </div>
  );
}

export default Loading;
