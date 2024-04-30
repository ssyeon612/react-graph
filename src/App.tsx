import "./styles.css";
import * as React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { layouts } from "./layouts";
import { generateGraph } from "./generateGraph";
import cytoscape, { Stylesheet } from "cytoscape";

function getDefaultStylesheet() {
  return [{ selector: "node", style: { label: "data(label)" } }];
}

export default function App() {
  const cyRef = React.useRef<cytoscape.Core | undefined>();
  const [elements, setElements] = React.useState(() => generateGraph(8));
  const [layout, setLayout] = React.useState(layouts.grid);
  const [stylesheet, setStylesheet] = React.useState<Stylesheet[]>(getDefaultStylesheet);
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td className="c">
              <select
                size={Object.keys(layouts).length}
                onChange={(e) => {
                  setLayout({ ...layouts[e.target.value] });
                }}
              >
                {Object.keys(layouts).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <CytoscapeComponent
                elements={elements}
                style={{
                  width: "800px",
                  height: "500px",
                  border: "1px solid black",
                }}
                layout={layout}
                stylesheet={stylesheet}
                cy={(cy) => (cyRef.current = cy)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// https://codesandbox.io/p/sandbox/cytoscape-layout-tests-mdbv4o?file=%2Fsrc%2Flayouts.tsx%3A4%2C18
