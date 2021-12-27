import {
    Flex,
    Spacer,
    Stack,
    Button,
    Heading,
    Center,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react'
import { Layout } from '../../components/Layout'
import React, {useEffect, useState} from 'react'
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "../../utils/init-firebase";
import TempModal from "./tempModal";
import WorkModal from "./WorkModal";
import Create from "./Create";
import Immunization from "./Immunization";

export default function TargetClientList() {
    const [targetClient, setTargetClient] = useState([]);

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
            setTargetClient(userData)
        })

    };




  return (
    <Layout>
        
        <Flex>
            <Heading>Target Client List</Heading>
            <Spacer/>
            <Create/>
        
        </Flex>
        <Center py={6}>
            <Table variant="striped" >
                <Thead>
                    <Tr>
                        <Th>Client Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {targetClient.map((works) => {
                        return (
                            <Tr key={works.id}>
                                <Td>{works.first} {works.middle} {works.last}</Td>
                                <Td>
                                    <Stack direction="row" spacing={1}>
                                        <TempModal  works= {works}/>
                                    </Stack>
                                </Td>
                                <Td>
                                    <Stack direction="row" spacing={1}>
                                    <WorkModal  works= {works}/>

                                </Stack>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Center>
  </Layout>
  )
}
