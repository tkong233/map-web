import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';


const Container = styled.div`
   margin-bottom: 10px;
`;

class PlanItem extends React.Component {
    state = {
        inTrip: true,
    
    }

    handleDelete = (e) => {
        this.setState({inTrip: false});
        console.log(this.props.data.id + "delete clicked");       
        setTimeout(() => {this.props.deletePointsFromPlan(this.props.data.id)}, 300)
    }

    handleMouseDown = () => {
        this.props.setDragging(true);
    }

    render() {
        const { data, setDragging, editing } = this.props;
        const { inTrip } = this.state;
        return (
            <Draggable
                draggableId={data.id}
                index={this.props.index}
                isDragDisabled={!editing}
            >
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        >
                    {
                        <div id={`planItem${data.id}`}
                        onMouseDown={this.handleMouseDown} onMouseUp={()=> {setDragging(false)}}
                        className={"plan-item"} style={{height: inTrip? "104px":"0", transition: "0.3s", visibility: inTrip ? "visible":"hidden"}}>
                        <img src={data.imgURL} alt=" " height="80" width="80" />
                        <div className='plan-item-description'>{data.description}</div>
                        <Button style={{visibility: editing? "visible":"hidden"}} onMouseDown={(e) => {e.stopPropagation()}} shape="circle" size="small" type="danger" className="add-to-trip-button" onClick={this.handleDelete}><FontAwesomeIcon icon={faMinus} /></Button>
                    </div>} 
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default PlanItem;