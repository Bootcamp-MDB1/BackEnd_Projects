import React from "react";
import { useEffect, useState } from 'react';
import firebaseApp from '../config/firebaseConfig'
import {collection, getFirestore} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import Header from "../components/Header";
import {Container, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
// import cafe1 from "../images/laxbw-prime-1715-hor-wide.webp";
// import cafe2 from "../images/maras-restaurant-interior-1.jpg";
// import cafe3 from "../images/La-Colombe-Restaurant_Andrea-van-der-Spuy_2018_La-Colombe-183.webp"

const Home = () => {
  const auth = getAuth(firebaseApp)
  const [value, loading, error] = useCollection(
      collection(getFirestore(firebaseApp), 'Resto'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    ); 
  
    useEffect(() => {
      console.log(value);
    }, [value])

  return (
      <div>
      <Header/>
     <h1 className="bg-dark mt-5 m-auto w-50">Welcome back, User !</h1>
      </div>
  );
}

export default Home