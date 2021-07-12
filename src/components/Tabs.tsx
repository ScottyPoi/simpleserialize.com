import React from "react";
import Serialize from "./Serialize";
import Visualize from "./Visualize";

type Props = Record<string, unknown>;

type State = {
  serializeModeOn: boolean;
  visualizeModeOn: boolean;
};

export default class Tabs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      serializeModeOn: true,
      visualizeModeOn: false,
    };
  }

  showSerialize(): void {
    this.setState({serializeModeOn: true, visualizeModeOn: false});
  }

  showDeserialize(): void {
    this.setState({serializeModeOn: false, visualizeModeOn: false});
  }

  showVisualize(): void {
    this.setState({serializeModeOn: false, visualizeModeOn: true});
  }

  render(): JSX.Element {
    const {serializeModeOn, visualizeModeOn} = this.state;
    return (
      <>
        <div className="tabs is-centered">
          <ul>
            <li
              className={serializeModeOn ? "is-active" : "is-inactive"}
              onClick={() => this.showSerialize()}
            >
              <a>Serialize</a>
            </li>
            <li
              className={
                serializeModeOn
                  ? "is-inactive"
                  : visualizeModeOn
                    ? "is-inactive"
                    : "is-active"
              }
              onClick={() => this.showDeserialize()}
            >
              <a>Deserialize</a>
            </li>
            <li
              className={visualizeModeOn ? "is-active" : "is-inactive"}
              onClick={() => this.showVisualize()}
            >
              <a>Visualize</a>
            </li>
          </ul>
        </div>
        {visualizeModeOn ? (
          <Visualize visualizeModeOn={true} />
        ) : (
          <Serialize serializeModeOn={serializeModeOn} />
        )}
      </>
    );
  }
}
