package com.sbcamping.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@SequenceGenerator(name = "NOTICE_BOARD_SEQ_GEN", // 시퀀스 제너레이터 이름
            sequenceName = "NOTICE_BOARD_SEQ", // 시퀀스 이름
            initialValue = 1, //시작값
            allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "Notice_Board") // 실제 DB 테이블 명
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_BOARD_SEQ_GEN")
    //Long = scale    String,Char = length
    @Column(name = "nboard_Id", nullable = false, columnDefinition = "NUMBER(10,0)")          // 공지사항 글 번호
    private Long nBoardId;

    @Column(name = "nboard_Title", nullable = false, length = 50)       // 공지사항 글 제목
    private String nBoardTitle;

    @Column(name = "nboard_Content", nullable = false, length = 1000)   // 공지사항 글 내용
    private String nBoardContent;

    @Column(name = "nboard_Date", nullable = false) // 작성일
    private LocalDateTime nBoardDate;

    @Column(name = "nboard_Views", nullable = false, columnDefinition = "NUMBER(10,0)")       // 조회수
    private Long nBoardViews;

    public void changeNBoardTitle(String nBoardTitle) { //공지 제목 수정 메서드
        this.nBoardTitle = nBoardTitle;
    }

    public void changeNBoardContent(String nBoardContent) { //공지 내용 수정 메서드
        this.nBoardContent = nBoardContent;
    }




}
