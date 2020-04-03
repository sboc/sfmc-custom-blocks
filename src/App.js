import React from "react";
import { Card } from "@salesforce/design-system-react";

function App() {
  return (
    <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
      <ul>
        <li>
          <a href="/article">Article</a>
        </li>
      </ul>
    </Card>
  );
}

export default App;
