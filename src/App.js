import React from "react";
import { Card } from "@salesforce/design-system-react";
import { Link } from "react-router-dom";

function App() {
  return (
    <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
      <ul>
        <li>
          <Link to="/article">Article</Link>
        </li>
      </ul>
    </Card>
  );
}

export default App;
