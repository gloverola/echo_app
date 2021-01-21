import React,{useState, useEffect} from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import styled from 'styled-components'

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
    }, [ dispatch, currentId ] );
    
    return (
      <Container>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <Posts setCurrentId={setCurrentId} />
      </Container>
    );
}

export default Home

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  padding: 60px 30%;
  margin: 0 auto;
  width: 100vw;
  border: 1px solid #ddd;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 60px 2%;
    overflow: hidden;
  }
`;
