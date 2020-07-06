import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./Blocks.css";
import base64url from "base64url";
import React, { useEffect } from "react";
import { useTransition, animated } from "react-spring";
const PREFETCH_COUNT = 4;

export default function Blocks(props) {
  const { blocks } = props;
  useEffect(() => {
    props.blockActions.fetchAndSubscribeToBlocks(PREFETCH_COUNT);
  }, []);
  let height = 50;
  const transitions = useTransition(
    blocks.map((data, i) => ({ ...data, height, y: i * height })),
    (d) => d.number,
    {
      from: { position: "absolute", height: 50, width: "100%", opacity: 0 },

      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    }
  );

  return (
    <div>
      <h1>Latest Blocks</h1>
      <Table>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Block Winner</th>
          </tr>
        </thead>
        <tbody className="sliding-table">
          {transitions.map(({ item: block, props: { y, ...rest }, key }, index) => (
            <animated.tr
              key={key}
              style={{
                zIndex: props.blocks.length - index,
                transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
                ...rest,
              }}
            >
              <td className="block-number">
                <div>
                  <Link to={`/blocks/${base64url(block.hash)}`}>
                    {block.number}
                  </Link>
                </div>
              </td>
              <td className="block-winner">
                <div>
                  <Link to={`/addresses/${base64url(block.winner)}`}>
                    {base64url(block.winner)}
                  </Link>
                </div>
              </td>
            </animated.tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import React, { Component } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { Table } from "reactstrap";
// import "./Blocks.css";
// import base64url from "base64url";
// const PREFETCH_COUNT = 4;
//
// export default class Blocks extends Component {
//   constructor(props) {
//     super(props);
//     this.props.blockActions.fetchAndSubscribeToBlocks(PREFETCH_COUNT);
//     this.state = {
//       rendered: false,
//     };
//   }
//
//   componentDidMount = () => {
//     this.setState({
//       ...this.state,
//       rendered: true,
//     });
//   };
//
//   render() {
//     return (
//       <div>
//         <h1>Latest Blocks</h1>
//         <Table>
//           <thead>
//             <tr>
//               <th>Block Number</th>
//               <th>Forged By</th>
//             </tr>
//           </thead>
//           {this.blocks()}
//         </Table>
//       </div>
//     );
//   }
//
//   blocks() {
//     if(!this.props.blocks) {
//     return <></>
//     }
//     console.log(this.props.blocks.map((block) => block.number))
//     return (
//       <TransitionGroup
//         enter={this.props.blocks.length > 3}
//         component="tbody"
//       >
//         {this.props.blocks.map((block) => (
//           <CSSTransition key={block.number} timeout={500} classNames="fade">
//             <tr>
//               <td className="block-number">
//                 <div>
//                   <Link to={`/blocks/${base64url(block.hash)}`}>
//                     {block.number}
//                   </Link>
//                 </div>
//               </td>
//               <td>
//                 <div>
//                   <Link to={`/addresses/${base64url(block.winner)}`}>
//                     {block.winner.toString("base64")}
//                   </Link>
//                 </div>
//               </td>
//             </tr>
//           </CSSTransition>
//         ))}
//       </TransitionGroup>
//     );
//   }
// }
