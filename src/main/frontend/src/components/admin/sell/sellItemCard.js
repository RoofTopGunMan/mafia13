import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SellItemCard = (props) => {

    const {id, name, type, price, state, attachment ,createdAt} = props.item;

    const navigate = useNavigate();

    // 시간을 계산하는 기능 추가 예정
    

    const deleteItem = () => {
        if(!window.confirm("이 아이템을 삭제하시겠습니까?")) return;

        fetch("http://localhost:8093/admin/sellMng/" + id, {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => {
            if(data === "ok") {
                alert("아이템이 정상적으로 삭제되었습니다.");
                window.location.replace('/admin/sellMng');
            } else alert("아이템을 삭제하지 못했습니다.");
        });
    };

    return (
        <div>
            <Card className='sellCard'>
                {/* 데이터에서 이미지 받아와야함 */}
                <Card.Img variant='top' src={attachment}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{price} GM</Card.Text>
                    <Badge bg="danger">
                        {/* 생성된 날짜로부터 2일이 안지났으면 NEW를 표시해야함 */}
                        {/* 아래 코딩 수정 필요함 */}
                        {createdAt <= "" ? "NEW" : ""}
                    </Badge><br/>
                    <Badge className='mx-1'>
                        {state === 0 ? "상품아이템" : "인게임아이템"}
                    </Badge>
                    <Badge>
                        {type === "OUTLINE" ? "테두리" : type === "HEAD" ? "머리" : type === "BODY" ? "의상류" : "망토"}
                    </Badge>
                    {/* Link의 경로 설정해야함 */}
                    <Button className='sellButton' onClick={() => navigate("/admin/sellMng/" + id)}>상세</Button>

                    <Button className='sellButton' variant='danger' onClick={deleteItem}>삭제</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SellItemCard;