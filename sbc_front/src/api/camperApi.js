import axios from "axios";
//서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';

export const prefix = `${API_SERVER_HOST}/api/campers`;

//상세페이지
export const getOne = async (cBoardId) => {
    const res = await axios.get(`${prefix}/${cBoardId}`);
    return res.data;
};

//목록페이지
export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });
    return res.data;
};

// 등록
export const postAdd = async (formData) => {
    try {
        const res = await axios.post(`${prefix}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // 파일 업로드를 위한 헤더 설정
            }
        });

        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Error posting campers:", error); // 에러 메시지 출력
        throw error; // 에러를 호출하는 곳에서 처리할 수 있게 던집니다.
    }
};


//삭제
export const deleteOne = async (cBoardId) => {
    const res = await axios.delete(`${prefix}/${cBoardId}`);
    return res.data;
};

// 수정
// API 호출을 위한 putOne 함수
export const putOne = async (cBoardId, camperObj) => {
    try {
        const res = await axios.put(`${prefix}/${cBoardId}`, camperObj, {
            headers: {
                'Content-Type': 'application/json'  // Content-Type 설정
            }
        });
        return res.data; // 응답 데이터 반환
    } catch (error) {
        console.error('수정 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
};
// api/camperApi.js 회원정보 가져오기
export const getMemberById = async (memberId) => {
    const response = await fetch(`/api/members/${memberId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch member data');
    }
    return await response.json();
};
// postCommentAdd : 댓글 등록
export const postCommentAdd = async (qbID, qcomment) => {
    const res = await axios.post(`${prefix}/${qbID}/comments/`, qcomment);

    console.log(res.data);
    return res.data;
}
// 댓글 수정
export const updateComment = async (qcommentID, qcomment, qbID) => {
    const res = await axios.put(`${prefix}/${qbID}/comments/${qcommentID}`, qcomment);
    return res.data;
};

// 댓글 삭제
export const deleteComment = async (qcommentID, qbID) => {
    const res = await axios.delete(`${prefix}/${qbID}/comments/${qcommentID}`)
    return res.data;
}

// getCommentList : 해당 게시글의 댓글 목록 가져오기
export const getCommentList = async (qbID) => {
    try {
        const res = await axios.get(`${prefix}/${qbID}/comments/list`);
        const count = res.data ? Object.keys(res.data).length : 0; // 데이터가 있는 경우만 카운트
        console.log(res.data);
        console.log(`댓글 갯수 : ${count}`);
        return res.data;
    } catch (error) {
        console.error('댓글 리스트 가져오기 중 오류 발생:', error);
        return []; // 오류 발생 시 빈 배열 반환
    }
};



