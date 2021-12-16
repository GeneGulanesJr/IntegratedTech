//Temporary Modal To Create Client Information
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel, FormControl, FormLabel, Input, FormErrorMessage, NumberInput, NumberInputField, toast, Spacer,
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import React, {useEffect, useState} from 'react'
import {collection, getDocs, query, where, doc, getDoc, addDoc,updateDoc} from "firebase/firestore";
import {db} from "../../utils/init-firebase";
import {Field, Form, Formik} from "formik";
import AnimalDetail from "./AnimalDetail";
import Immunization from "./Immunization";








export default function WorkModal({works}) {
    const [ setData,setNewData] = useState(works);
console.log(works.id,"this is the id")



    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button   onClick={() => { onOpen()}} >Update Details</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update User Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    <AnimalDetail works={works}/>


                    <Immunization  works= {works}/>


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}