import * as React from "react";

type Props = {
  name: string | undefined;
  value: string | undefined;
  textarea: boolean;
};

const VisualOutput = ({ name, value, textarea }: Props): JSX.Element => (
  <div className="field has-addons">
    <div className="control">
      <a className="button is-static">{name}</a>
    </div>
    <div className="control is-expanded">
      {value ? (
        <textarea className="input" readOnly={true} value={value || ""} />
      ) : (
        <div className="box" />
      )}
    </div>
  </div>
);

export default VisualOutput;
