import React, { useEffect, useState } from 'react';
import { getCommentList, postCommentAdd, updateComment, deleteComment } from '../../api/camperApi'; // 필요한 API 함수 가져오기
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function CommentComponent() {
    const [serverData, setServerData] = useState([]); // 댓글 목록 상태
    const [commentContent, setCommentContent] = useState(""); // 댓글 입력 상태
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
    const [editingCommentContent, setEditingCommentContent] = useState(""); // 수정할 댓글 내용
    const { cBoardId } = useParams(); // URL에서 cBoardId 가져오기

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        const data = await getCommentList(cBoardId);
        console.log('가져온 댓글 데이터:', data); // 데이터 확인
        setServerData(data);
    };

    useEffect(() => {
        fetchComments(); // 컴포넌트가 마운트될 때 댓글 목록 가져오기
    }, [cBoardId]);

    const handleChange = (e) => {
        setCommentContent(e.target.value); // 댓글 내용 상태 업데이트
    };

    const handleClickAdd = async (e) => {
        e.preventDefault(); // 기본 동작 방지

        const formData = new FormData();
        formData.append("cCommentContent", commentContent);
        formData.append("memberID", "87"); // 임시 멤버 ID

        try {
            const response = await postCommentAdd(cBoardId, formData); // 댓글 추가 API 호출
            if (response && response.RESULT) {
                console.log('댓글 등록 성공');
                setCommentContent(""); // 입력 필드 초기화
                fetchComments(); // 댓글 목록 갱신
            } else {
                console.error('댓글 등록 실패:', response);
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleEditChange = (e) => {
        setEditingCommentContent(e.target.value); // 수정할 댓글 내용 상태 업데이트
    };

    const handleClickEdit = (commentId, content) => {
        setEditingCommentId(commentId); // 수정할 댓글 ID 설정
        setEditingCommentContent(content); // 수정할 댓글 내용 설정
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("cCommentContent", editingCommentContent);

            const response = await updateComment(editingCommentId, formData, cBoardId);
            console.log('응답 데이터:', response); // 확인
            if (response && response.RESULT) {
                console.log('댓글 수정 성공');
                setEditingCommentId(null);
                setEditingCommentContent("");
                fetchComments(); // 데이터 확인을 위해 댓글 목록 갱신
            } else {
                console.error('댓글 수정 실패:', response);
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const handleClickDelete = async (commentId) => {
        try {
            const response = await deleteComment(commentId, cBoardId);
            if (response && response.RESULT) {
                console.log('댓글 삭제 성공');
                fetchComments();
            } else {
                console.error('댓글 삭제 실패:', response);
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <div>
            {/* 댓글 목록 렌더링 */}
            <div>
                {serverData.length > 0 ? (
                    serverData.map(comment => (
                        <div key={comment.ccommentID} className="text-gray-700 p-5 m-10 border border-gray-300 rounded-lg">
                            <p>작성자 : {comment.member.memberName}</p>
                            {editingCommentId === comment.ccommentID ? (
                                <form onSubmit={handleSubmitEdit}>
                                    <input
                                        type="text"
                                        value={editingCommentContent}
                                        onChange={handleEditChange}
                                    />
                                    <Button type="submit">수정 완료</Button>
                                    <Button type="button" onClick={() => setEditingCommentId(null)}>취소</Button>
                                </form>
                            ) : (
                                <>
                                    <p>{comment.ccommentContent}</p>
                                    <p>{new Date(comment.ccommentDate).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false,
                                    })}</p>
                                    <Button onClick={() => handleClickEdit(comment.ccommentID, comment.ccommentContent)}>수정</Button>
                                    <Button onClick={() => handleClickDelete(comment.ccommentID)}>삭제</Button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
                <hr />
                {/* 댓글 입력 폼 */}
                <div>
                    <input
                        type="text"
                        value={commentContent}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요"
                        required
                    />
                    <Button onClick={handleClickAdd}>댓글 등록</Button>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default CommentComponent;
