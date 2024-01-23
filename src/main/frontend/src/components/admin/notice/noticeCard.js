import React from 'react';
import { Badge, Card, CardText } from 'react-bootstrap';

const NoticeCard = (props) => {

    const {title, content, type} = props.notice;

    return (
        <div>
            <Card style={ {height: '10rem', width: '17rem'}}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <CardText>
                        {content}
                    </CardText>
                    <CardText>
                        {type === "NOTICE" ?
                            <Badge bg='primary'>Notice</Badge> :
                                <Badge bg='success'>Alarm</Badge>}
                        <button className='btn bnt-sm btn-success'>상세</button>
                    </CardText>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NoticeCard;