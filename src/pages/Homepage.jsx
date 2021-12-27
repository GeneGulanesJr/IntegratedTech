import {
    Badge,
    chakra,
    Code,
    Heading,
    List,
    ListItem,
    OrderedList, Stack,
    Text
} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import {collection, getDocs, serverTimestamp,doc,onSnapshot,} from "firebase/firestore";

import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {db} from "../utils/init-firebase";
import TempModal from "./TargetClientList/tempModal";
import WorkModal from "./TargetClientList/WorkModal";



export default function Homepage() {

    const [targetClient, data] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const usersCollectionRef = collection(db, "patientInfo");
        onSnapshot(usersCollectionRef, (snapshot) => {
            let userData = []
            snapshot.docs.forEach(doc => {
                userData.push({ ...doc.data(), id: doc.id })
            })
            data(userData)
        })

    };







  const { currentUser } = useAuth()
  return (
    <Layout>



      <Heading>
     Animal Bite

        <Badge
          fontWeight='black'
          fontSize='4xl'
          mx={2}
          px={2}
          colorScheme='green'
        >
          Dashboard
        </Badge>
      </Heading>


        <Table variant="striped" >
            <Thead>
                <Tr>
                    <Th>Last Name</Th>
                    <Th>First Name</Th>
                    <Th>Middle Name</Th>
                    <Th>Age</Th>
                    <Th>Sex</Th>
                    <Th>Status</Th>
                    <Th>Schedule</Th>

                </Tr>
            </Thead>
            <Tbody>
                {targetClient.map((works) => {
                    return (
                        <Tr key={works.id}>
                            <Td> {works.last}</Td>
                            <Td>{works.first}</Td>
                            <Td>{works.middle} </Td>
                            <Td>{works.age} </Td>
                            <Td>{works.sex}</Td>
                            <Td>{works.status}</Td>
                            <Td>{works.schedule}</Td>
                        </Tr>

                    );
                })}
            </Tbody>
        </Table>





    </Layout>
  )
}
