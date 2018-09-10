import React from "react";

import TextPage from "../src/components/text-page";
import privacyPolicy from "../src/data/privacy-policy";

export default function Privacy(props) {
  return (
    <TextPage title="Privacy Policy">
      {privacyPolicy("2018/03/10", "NicheTester", "nichetester.com").map(
        para => (
          <div>
            <h3>{para.heading}</h3>
            <p>{para.text}</p>
          </div>
        )
      )}
    </TextPage>
  );
}
