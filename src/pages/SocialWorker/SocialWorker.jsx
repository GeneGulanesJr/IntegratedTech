import {
    Flex,
    Spacer,
    Stack,
    Heading,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react'


import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from '../../utils/init-firebase'
import Create from "./Create";
import Update from "./Update";
import {Layout} from "../../components/Layout";
export default function SocialWorker() {

    const [socialWork, setSocialWork] = useState([]);


    useEffect(() => {

        const getSocialWork = async () => {
            const usersCollectionRef = collection(db, "users");
            const data = await getDocs(usersCollectionRef);
            setSocialWork(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getSocialWork();
    }, []);




    return (


        <Layout>
            <Flex>
                <Heading>Social Worker</Heading>
                <Spacer/>

                <Create/>
            </Flex>
            <Table variant='striped'>

                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {socialWork.map((works) => {

                        return (

                            <Tr key={works.id}>
                                <Td>{works.displayName}</Td>
                                <Td>
                                    <Stack direction="row" spacing={1}>
                                   <Update works= {works}/>

                                    </Stack>
                                </Td>
                            </Tr>



                        );

                    })}
                </Tbody>
            </Table>
        </Layout>

    )
}