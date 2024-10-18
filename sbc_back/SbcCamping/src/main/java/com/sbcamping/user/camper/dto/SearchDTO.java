package com.sbcamping.user.camper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {
    private String keyword;
    private String type;
    private int page;
    private int size;
}
