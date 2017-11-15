import React, {Component} from 'react';
import {connect} from 'react-redux';
import Note from './note';

class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="wrapper style2 special flow">
        <header className="major">
          <h2>All notes</h2>
        </header>
        {
          this.props.notes && this.props.notes.map((note) => {
            if (!note)
              return <div></div>
            return (
              <li key={note.phrase}>
                <Note Obj={note} isComplete={note.metafields[0].value} Phrase={note.phrase} />
              </li>
            )
          })
        }
      </section>
    );
  }
};

const mapState = ({notes}) => ({notes});
export default connect(mapState)(List);