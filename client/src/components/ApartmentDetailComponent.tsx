import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import {CharListComponent} from './CharListComponent';

import { RootState } from '../store';
import { ChangeApartmentDescription, GetApartmentByIdAction } from './../actions/apartmentActions';

import styled from 'styled-components';


const TopContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ApartmentProfile = styled(Card)`
  flex-basis: 360px;
  padding: 10px;
`;
const BottomContainer = styled(Box)`

`;

const ApartmentPictureWrapper = styled(Card)`
  padding: 10px;
  display: flex;
  flex:1;
`;


const ApartmentWrapper = styled(Box)`
display: flex;
padding-top: 1rem;
`;

const LeftContainer = styled(Box)`
  flex: 1;
`;
const SubWayContainer = styled(Box)`
flex-basis: 350px;
padding: 10px;
`;



export const ApartmentDetailComponent = () => {
  const { apartment, error } = useSelector((state: RootState) => state.apartmentDetail);

  const { apartmentId } = useParams<{ apartmentId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [curApartmentDescription, setCurApartmentDescription] = useState<any>(apartment?.description);  
  
  const handleChangeDescription=()=>{
    if(!apartment){
      return;
    }
    dispatch(ChangeApartmentDescription({id: apartment.id, description: curApartmentDescription}));
  }
  const goToCharsPanel=()=>{
    history.push('/chars-panel');
  }
  useEffect(() => {
    dispatch(GetApartmentByIdAction(+apartmentId));
  }, [dispatch, apartmentId])

  if (error) {
    return <Alert severity='error'>{error.message}</Alert>
  }
  if (!apartment) {
    return null;
  }
  return (
    <div>
      <ApartmentWrapper>
        <LeftContainer >
          <TopContainer>
            <ApartmentProfile>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} gutterBottom>
                Квартира #{apartment.id}
              </Typography>
              <Box style={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>Название:&nbsp;</Typography>
                <Typography> {apartment.name}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom >Описание:</Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  sx={{ width: '100%' }}
                  value={curApartmentDescription}
                  onChange={(e)=>setCurApartmentDescription(e.target.value)}
                  defaultValue={apartment.description}
                  onBlur={()=>{
                    if(apartment.description === curApartmentDescription){
                      return;
                    }
                    let needChange: boolean = window.confirm('Изменить описание ?');
                    if(!needChange ){
                      return;
                    }
                    handleChangeDescription();
                  }}
                />
              </Box>
              <Box style={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>Цена в обычные дни: &nbsp;</Typography>
                <Typography>{apartment.price}</Typography>
              </Box>
            </ApartmentProfile>
            <ApartmentPictureWrapper>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>Фотографии</Typography>
              {/* TODO: список фотографий */}
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </ApartmentPictureWrapper>
          </TopContainer>
          <BottomContainer>
            {/* Характеристики */}
            <Card>
              <CardContent>
                <Box style={{display:'flex',alignItems:'center', gap:'1rem', marginBottom:'10px'}}>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                  Характеристики
                </Typography>
                <Box>
                <Button onClick={(e)=>{
                  goToCharsPanel();
                }} color="secondary" variant="outlined">Перейти к админке характеристик</Button>
                </Box>
                </Box>
                <Divider style={{ marginBottom: '1rem' }} />
                <CharListComponent chars={apartment.chars}/>
              </CardContent>
            </Card>
          </BottomContainer>
        </LeftContainer>
        <SubWayContainer>
          <Typography>Ближайшие метро</Typography>
          <Box>

          </Box>
        </SubWayContainer>
      </ApartmentWrapper>
    </div>
  );
}

/**
 * 
 */