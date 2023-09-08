package com.aws.spring_study.repository;

import com.aws.spring_study.dto.ModifyUserReqDto;
import com.aws.spring_study.dto.RegisterUserReqDto;
import com.aws.spring_study.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMappers {
    public Integer saveUser(RegisterUserReqDto registerUserReqDto);
    public List<User> getUserListAll();
    public Integer updateUser(ModifyUserReqDto modifyUserReqDto);
    public Integer deleteUser(Integer userId);

}
