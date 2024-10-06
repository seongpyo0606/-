import '../../css/menu.css';
import { Link } from "react-router-dom";

var div2 = document.getElementsByClassName("menubutton");

function handleClick(event) {
    if (event.target.classList.contains("clicked")) {
        event.target.classList.remove("clicked");
    } else {
        for (var i = 0; i < div2.length; i++) {
            div2[i].classList.remove("clicked");
        }
        event.target.classList.add("clicked");
    }
}

function init() {
    for (var i = 0; i < div2.length; i++) {
        div2[i].addEventListener("click", handleClick);
    }
}

init();

const CommunityMenu = () => {
    return (
        <>
            <div id='menubuttonwrap'>
                <Link to={'/notice'} className='menubutton'>공지사항</Link>
                <Link to={'/qna'} className='menubutton'>문의게시판</Link>
                <Link to={'/campers'} className='menubutton'>캠퍼게시판</Link>
                <Link to={'/reviews'} className='menubutton'>리뷰게시판</Link>
            </div>
        </>
    );
}

export default CommunityMenu;
