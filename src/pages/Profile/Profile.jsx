import {
    Container,
    Heading,
    Box,
    Center,
    Text,
    Flex,
    Stack,
    useColorModeValue, Table, Thead, Tr, Th, Tbody, Td
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { Layout } from '../../components/Layout'
 import { useAuth } from '../../contexts/AuthContext'
import { collection, query, where,getDocs,onSnapshot } from "firebase/firestore";
import { db } from '../../utils/init-firebase'

import Update from './Update'
import TempModal from "../TargetClientList/tempModal";
import WorkModal from "../TargetClientList/WorkModal";

export default function Profile() {
   const { currentUser } = useAuth()
   const [data,setData]= useState([])

    useEffect(async () => {
        const userData=[]
        const q = query(collection(db, "patientInfo"), where("email", "==", currentUser.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            userData.push(doc.data())
        });
        setData(userData)
    }, []);






  return (
    <Layout>
      <Heading>User Profile</Heading>
      <Container maxW='container.lg' overflowX='auto' py={4}>
        <Center py={12}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'md'}
        overflow={'hidden'}
        boxShadow={'lg'}>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            </Heading>
          </Stack>
            <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Email</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
              {currentUser.email}
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Last Login</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                  {currentUser.metadata.lastSignInTime}
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>Date Account Created</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
              {currentUser.metadata.creationTime}
              </Text>
            </Stack>
          </Stack>


          <Stack direction={'row'} justify={'center'} spacing={6}>

              {data.map(item => (
                  <Flex align={'center'}>

                      <Update id={item}> </Update>
                  </Flex>
              ))}


          </Stack>
        </Box>
      </Box>
    </Center>
      </Container>
        <Container maxW='container.lg' overflowX='auto' py={4}>
            <Center py={12}>
                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded={'md'}
                    overflow={'hidden'}
                    boxShadow={'lg'}>
                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            </Heading>
                        </Stack>
                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Box p={3}>
                                    <h1> Patient Info</h1>
                                    <Center py={6}>

                                                {data.map((works) => {
                                                    return (
                                                        <Table variant="striped" >
                                                            <Thead>
                                                                <Tr>
                                                                    <Th>Info</Th>
                                                                    <Th>Details</Th>
                                                                </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                <Tr>
                                                                    <Td>First Name</Td>
                                                                    <Td>{works.first}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Middle Name</Td>
                                                                    <Td>{works.middle}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Last Name</Td>
                                                                    <Td>{works.last}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Age</Td>
                                                                    <Td>{works.age}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Sex</Td>
                                                                    <Td>{works.sex}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Ownership</Td>
                                                                    <Td>{works.ownership}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Animal</Td>
                                                                    <Td>{works.animal}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Mode of Transmission</Td>
                                                                    <Td>{works.transmission}</Td>

                                                                </Tr>
                                                                <Tr>
                                                                    <Td>Date of Transmission</Td>
                                                                    <Td>{works.dateTrans}</Td>

                                                                </Tr>




                                                            </Tbody>
                                                        </Table>

                                                    );
                                                })}

                                    </Center>
                                </Box>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Box p={3}>
                                    <h1> Location Course & Treatment</h1>
                                    <Center py={6}>

                                        {data.map((works) => {
                                            return (
                                                <Table variant="striped" >
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Info</Th>
                                                            <Th>Details</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>Area of Transmission</Td>
                                                            <Td>{works.first}</Td>

                                                        </Tr>
                                                        <Tr>
                                                            <Td>Location of Transmission</Td>
                                                            <Td>{works.middle}</Td>

                                                        </Tr>

                                                        <Tr>
                                                            <Td>Status of Patient</Td>
                                                            <Td>{works.middle}</Td>

                                                        </Tr>
                                                        <Tr>
                                                            <Td>Course of Treatment</Td>
                                                            <Td>{works.middle}</Td>

                                                        </Tr>







                                                    </Tbody>
                                                </Table>

                                            );
                                        })}

                                    </Center>
                                </Box>

                            </Stack>

                        </Stack>



                    </Box>
                </Box>
            </Center>
        </Container>


    </Layout>
  )
}
