import React from 'react';
import { connect } from 'react-redux';
import { putChangeStatus, deleteNote } from '../redux/reducers/noteReducer';
import { Button } from 'reactstrap';

const Note = (props) => {
  return (
      <div className="row" key={props.Phrase}>
        <h3 style={{textDecoration: props.isComplete ? "line-through" : "none"}}>{props.Phrase}</h3>
        <div className="btn-group" role="group" aria-label="">
          <Button type="button" onClick={() => {
            props.putChangeStatus(props.Obj, props.isComplete)}} className="btn">{props.isComplete ? "Undo" : "Complete" }</Button>
          <Button type="button" onClick={() => props.deleteNote(props.Obj.slug)} className="btn">Delete</Button>
        </div>
      </div>
  );
};

const mapDispatch = {putChangeStatus, deleteNote};
export default connect(null, mapDispatch)(Note);